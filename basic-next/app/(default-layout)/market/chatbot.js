"use client";

import { useState } from "react";
import AiModule from "@/app/components/ui/AiModule";
import ChatIcon from "@/app/components/icons/chatIcon";
import "../../components/ui/AiModule.css";
import "./market.css";

export default function ChatbotToggle() {
  const [isChatOpen, setChatOpen] = useState(false);

  const handleChatbotPopup = () => {
    setChatOpen((prev) => !prev);
  };

  return (
    <>
      <button className="chatbot-btn" onClick={handleChatbotPopup}>
        <ChatIcon />
      </button>
      {isChatOpen && <AiModule />}
    </>
  );
}
