"use client";

import { useState } from "react";
import ProfileBar from "@/app/components/ui/profileBar";
import ItemList from "@/app/components/ui/itemList";
import "./market.css";
import "@/app/components/ui/AiModule.css";
import AiModule from "@/app/components/ui/AiModule";
import ChatIcon from "@/app/components/icons/chatIcon";
import Pagination from "./pagination";

const ITEMS_PER_PAGE = 12;

const allItems = [
  { src: "../Market/Debirun_5.png", text: "Debirun 1st Anniversary", price: "142.00" },
  { src: "../Market/Debby.png", text: "Debby", price: "142.00" },
  { src: "../Market/Crying_Debirun.png", text: "Debirun crying with Dustirion", price: "142.00" },
  { src: "../Market/Debirun_4.png", text: "Debirun in Goodnote6", price: "142.00" },
  { src: "../Market/Debirun_identityV.png", text: "Debirun in Identity V", price: "142.00" },
  { src: "../Market/DebbyInMagma.png", text: "Debby is real in Magma", price: "142.00" },
  { src: "../Market/DebirunNight.png", text: "Debirun with Sora monster", price: "142.00" },
  { src: "../Market/Debirun_2.jpg", text: "Debirun with sword", price: "142.00" },
  { src: "../Market/WE_anniversary.png", text: "World end 1st anniversary", price: "142.00" },
  { src: "../Market/Debirun_1.jpg", text: "Debirun 1st Anniversary", price: "142.00" },
  { src: "../Market/Cat_debirun.png", text: "Cat", price: "142.00" },
  { src: "../Market/Sora.png", text: "KaminariSora by Debirun", price: "1000.00" },
  { src: "../Market/Sora.png", text: "KaminariSora by Debirun", price: "1000.00" },
  { src: "../Market/Cat_debirun.png", text: "Cat", price: "142.00" },
  { src: "../Market/Debirun_1.jpg", text: "Debirun 1st Anniversary", price: "142.00" },
  { src: "../Market/WE_anniversary.png", text: "World end 1st anniversary", price: "142.00" },
];

export default function Market() {
  const [currentPage, setCurrentPage] = useState(1);
  const [isChatOpen, setChatOpen] = useState(false);

  const totalPages = Math.ceil(allItems.length / ITEMS_PER_PAGE);

  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const currentItems = allItems.slice(startIndex, startIndex + ITEMS_PER_PAGE);

  const goToPage = (page) => {
    if (page < 1 || page > totalPages) return;
    setCurrentPage(page);
  };

  const handleChatbotPopup = () => {
    setChatOpen((prev) => !prev);
  };

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
      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={goToPage}
      />

      <button className="chatbot-btn" onClick={handleChatbotPopup}>
        <ChatIcon />
      </button>
      {isChatOpen && <AiModule />}
    </div>
  );
}
