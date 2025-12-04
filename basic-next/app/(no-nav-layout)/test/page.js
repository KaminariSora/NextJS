import Pagination from "./pagination"
import ItemList from "@/app/components/ui/itemList"
import "./test.css"

async function getData() {
    const response = await fetch("http://localhost:3000/product/getData", {
        method: "GET",
        cache: "no-store",
    })
    const json = await response.json()
    return json.data
}

export default async function TestPage({ searchParams: searchParamsPromise }) {
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

            <div className="market-container">
                <h1 className="mitr-regular" id="market-heading">
                    สินค้าทั้งหมด(แค่ตัวอย่างไม่ได้ขายจริง)
                </h1>

                <div className="market-list">
                    {currentItems.map((item, index) => (
                        <ItemList key={index} {...item} />
                    ))}
                </div>
            </div>

            <br />

            {/* ส่ง state + handler เข้า Pagination */}
            <Pagination currentPage={currentPage} totalPages={totalPages} />

            {/* <button className="chatbot-btn" onClick={handleChatbotPopup}>
                <ChatIcon />
            </button> */}
            {/* {isChatOpen && <AiModule />} */}
        </div>

    )
}





