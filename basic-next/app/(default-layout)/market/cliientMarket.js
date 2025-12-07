"use client"

import ItemList from "@/app/components/ui/itemList"
import { useState } from "react"

export default function ClientMarket({items}) {
    const [active, setActive] = useState(false)

    return (
        <div className="market-container">
            <h1 className="mitr-regular" id="market-heading">
                สินค้าทั้งหมด(แค่ตัวอย่างไม่ได้ขายจริง)
            </h1>

            <div className="market-list">
                {items.map((item, index) => (
                    <ItemList key={item._id ?? index}
                        src={item.image ?? item.src}      // ปรับตามชื่อ field ที่มีใน DB
                        alt={item.name ?? "No picture"}   // ใช้ name เป็น alt ชั่วคราว
                        text={item.name}                  // ชื่อสินค้าที่เคยใช้ตอน render ปกติ
                        price={item.price} />
                ))}
            </div>
        </div>
    )
}