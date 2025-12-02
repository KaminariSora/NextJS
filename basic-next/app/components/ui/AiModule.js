import { useState, useEffect, useRef } from "react";

export default function AiModule() {
    const [message, setMessage] = useState("");
    const [messages, setMessages] = useState([]);
    const chatBodyRef = useRef(null);

    const sendMessage = () => {
        if (!message.trim()) return;

        setMessages(prev => [...prev, { role: "user", text: message }]);
        setMessage("");
    };

    useEffect(() => {
        const el = chatBodyRef.current;
        if (el) el.scrollTop = el.scrollHeight;
    }, [message]);

    return (
        <div className="chat-container">
            <div className="chat-header">Chat Page</div>

            <div className="message-body" ref={chatBodyRef}>
                {messages.map((m, i) => (
                    <div key={i} className={`message ${m.role}`}>
                        {m.text}
                    </div>
                ))}
            </div>

            <div className="chat-input-area">
                <input
                    type="text"
                    value={message}
                    placeholder="Type a message..."
                    onChange={(e) => setMessage(e.target.value)}
                    onKeyDown={(e) => e.key === "Enter" && sendMessage()}
                />
                <button onClick={sendMessage}>Send</button>
            </div>
        </div>
    );
}