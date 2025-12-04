// ในไฟล์ Route Handler ของคุณ เช่น app/api/products/route.js หรือ route.ts
// สมมติว่า upsertProduct ถูก Import เข้ามาแล้ว
import { upsertProduct } from "@/app/(no-nav-layout)/admin/insertSingleData";

// ฟังก์ชัน POST ต้องรับ 'request' object เข้ามาเป็น Argument
export async function POST(request) { 
    let productData;

    try {
        // 1. อ่าน Body ของ Request โดยใช้ .json()
        productData = await request.json(); 
    } catch (e) {
        // จัดการเมื่อ Body ไม่ใช่ JSON ที่ถูกต้อง
        return Response.json(
            { message: "Invalid JSON body provided." }, 
            { status: 400 }
        );
    }

    // 2. ตรวจสอบข้อมูลที่จำเป็น
    if (!productData || !productData.name || !productData.description) {
        // ส่ง Response กลับไปโดยใช้ Response.json()
        return Response.json(
            { message: "Missing required product data (name or description)." }, 
            { status: 400 }
        );
    }

    try {
        // 3. เรียกใช้ Logic Server (เช่น upsertProduct)
        const result = await upsertProduct(productData);

        // 4. ส่ง Success Response กลับไป
        return Response.json(result, { status: 200 });

    } catch (error) {
        console.error("Server Logic Error:", error);

        // 5. ส่ง Error Response กลับไป (ต้องใช้ Response.json())
        return Response.json({
            message: 'Failed to process product data on server.',
            error: error.message
        }, { status: 500 });
    }
}