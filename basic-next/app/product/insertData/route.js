import { upsertProduct } from "@/app/(no-nav-layout)/admin/insertSingleData";

export async function POST(request) { 
    let productData;

    try {
        productData = await request.json(); 
    } catch (e) {
        return Response.json(
            { message: "Invalid JSON body provided." }, 
            { status: 400 }
        );
    }

    if (!productData || !productData.name || !productData.description) {
        return Response.json(
            { message: "Missing required product data (name or description)." }, 
            { status: 400 }
        );
    }

    try {
        const result = await upsertProduct(productData);
        return Response.json(result, { status: 200 });

    } catch (error) {
        console.error("Server Logic Error:", error);

        return Response.json({
            message: 'Failed to process product data on server.',
            error: error.message
        }, { status: 500 });
    }
}