"use client"

import ItemList from "@/app/components/ui/itemList"
import { useState } from "react"

export default function ClientMarket({items}) {

    return (
        <div className="market-container">
            <h1 className="mitr-regular" id="market-heading">
                สินค้าทั้งหมด(แค่ตัวอย่างไม่ได้ขายจริง)
            </h1>

            <div className="market-list">
                {items.map((item, index) => (
                    <ItemList key={item._id ?? index}
                        src={item.image ?? item.src}
                        alt={item.name ?? "No picture"}
                        text={item.name}
                        price={item.price} />
                ))}
            </div>
        </div>
    )
}