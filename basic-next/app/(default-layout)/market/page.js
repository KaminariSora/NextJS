import Pagination from "./pagination"
import "./market.css"
import ProfileBar from "@/app/components/ui/profileBar"
import ItemList from "@/app/components/ui/itemList"
import ClientMarket from "./cliientMarket"
// import { useState } from "react"

async function getData() {
    const response = await fetch("http://localhost:3000/product/getData", {
        method: "GET",
        cache: "no-store",
    })
    const json = await response.json()
    return json.data
}

export default async function TestPage({ searchParams: searchParamsPromise }) {
    // const [active, setActive] = useState(false)

    // ✅ ต้อง await ก่อน
    const searchParams = await searchParamsPromise

    const pageParam = Number(searchParams.page ?? 1)
    const page = Number.isNaN(pageParam) || pageParam < 1 ? 1 : pageParam

    const limit = 12
    const datas = await getData()

    const totalItems = datas.length
    const totalPages = Math.max(Math.ceil(totalItems / limit), 1)

    const currentPage = Math.min(page, totalPages)

    const startIndex = (currentPage - 1) * limit
    const currentItems = datas.slice(startIndex, startIndex + limit)

    console.log("Current page:", currentPage, "startIndex:", startIndex)

    return (
        <div className="market-body">
            <ProfileBar />
            <ClientMarket items={currentItems}/>
            <br />
            <Pagination currentPage={currentPage} totalPages={totalPages} />

            <button className="chatbot-btn" onClick={handleChatbotPopup}>
                <ChatIcon />
            </button>
            {/* {isChatOpen && <AiModule />} */}
        </div>

    )
}



