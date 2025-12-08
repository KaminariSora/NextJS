"use client"

import { useState, useEffect, useRef } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPaperPlane, faCopy, faEllipsis, faImage } from "@fortawesome/free-solid-svg-icons";
import './chat.css'
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import DOMPurify from "dompurify";

// const LOCAL_WEBHOOK_URL = "https://76c45653f311.ngrok-free.app/webhook/ReactChat";
const LOCAL_WEBHOOK_URL = "http://localhost:5678/webhook-test/chat-input";
const STORAGE_KEY = "market_chat_conversations_v1";

const MODELS = [
    { id: "gemini 1.5-flash", label: "Gemini 1.5-flash" },
    { id: "gemini 1.5-pro", label: "Gemini 1.5-pro" },
    { id: "gemini 2.5-pro", label: "Gemini 2.5-pro" },
];

const makeId = () =>
    Date.now().toString() + Math.random().toString(16).slice(2);

// 💡 NEW: ฟังก์ชันสำหรับแปลง URL รูปภาพในข้อความธรรมดาให้เป็น Markdown Image Syntax
const convertUrlsToMarkdown = (text) => {
    // 💡 แก้ไข Regex: ลบ $ ออกเพื่อให้จับคู่ URL ที่ไม่ได้อยู่จบสตริง
    // และเพิ่ม \n\n หน้า URL เพื่อให้ ReactMarkdown ขึ้นบรรทัดใหม่และ render เป็น Block element
    // Regex: ค้นหา URL ที่ลงท้ายด้วยนามสกุลรูปภาพ
    const imageRegex = /(https?:\/\/[^\s]+?\.(jpe?g|png|gif|webp|svg|bmp))(\s*)/gi;

    let result = text;
    
    // แปลง URL รูปภาพเป็น Markdown Image
    // เราใช้ replaceAll เพื่อให้มั่นใจว่าครอบคลุมการค้นหาทั้งหมด (แม้ว่า .replace กับ flag g จะทำงานคล้ายกัน)
    // การเพิ่ม \n\n จะช่วยแยกรูปภาพออกจากข้อความด้านบน
    result = result.replace(imageRegex, (match, url, spacing) => {
        // Alt Text ง่ายๆ
        return `\n\n![Image](${url})${spacing}`; 
    });

    return result;
};

export default function Chat() {
    // 💡 HYDRATION FIX: ตั้งค่าเริ่มต้นเป็น []
    const [imageFile, setImageFile] = useState(null);
    const [isMounted, setIsMounted] = useState(false); // 💡 NEW: State เพื่อจัดการ Hydration

    // 💡 HYDRATION FIX: กำหนดค่าเริ่มต้นเป็น [] เพื่อให้เซิร์ฟเวอร์เรนเดอร์เนื้อหาที่ว่างเปล่า (หรือ Loading)
    const [conversations, setConversations] = useState([]);

    // 💡 HYDRATION FIX: โหลดข้อมูลจริงจาก Local Storage ใน useEffect
    useEffect(() => {
        try {
            const raw = localStorage.getItem(STORAGE_KEY);
            let initialConversations = [
                {
                    id: makeId(),
                    title: "New chat",
                    messages: [{ id: makeId(), role: "bot", text: "Hello. Can I help you?" }],
                },
            ];

            if (raw) {
                const parsed = JSON.parse(raw);
                if (Array.isArray(parsed) && parsed.length) {
                    initialConversations = parsed;
                }
            }

            setConversations(initialConversations);
        } catch (e) {
            console.warn("Cannot load conversations:", e);
        }

        setIsMounted(true); // ตั้งค่าเป็น true เมื่อโหลดข้อมูลฝั่ง Client เสร็จสิ้น
    }, []);

    const [activeId, setActiveId] = useState("c1");
    const activeConversation = conversations.find((c) => c.id === activeId);

    const [model, setModel] = useState(MODELS[2].id);
    const [userMessage, setUserMessage] = useState("");
    const [status, setStatus] = useState("idle");
    const [error, setError] = useState("");
    const [clearComfirm, setClearConfirm] = useState(false);
    const [openFormId, setOpenFormId] = useState(null);
    const chatBodyRef = useRef(null);
    const historyButtonRef = useRef(null)
    const fileInputRef = useRef(null);
    const [editingId, setEditingId] = useState(null);
    const [draftTitle, setDraftTitle] = useState("");

    // 💡 HYDRATION FIX: รัน Scroll และ Local Storage Persist เมื่อ Mounted แล้วเท่านั้น
    useEffect(() => {
        if (!isMounted) return;
        const el = chatBodyRef.current;
        if (el) el.scrollTop = el.scrollHeight;
    }, [conversations, isMounted]);

    useEffect(() => {
        if (!isMounted) return;
        try {
            localStorage.setItem(STORAGE_KEY, JSON.stringify(conversations));
        } catch (e) {
            console.warn("Cannot persist conversations:", e);
        }
    }, [conversations, isMounted]);

    // ... (ส่วน openClearHistoryWindow, handleConfirmClearHistory, useEffect handleClickOutside เหมือนเดิม)
    const openClearHistoryWindow = () => {
        setClearConfirm(true);
    };

    const handleConfirmClearHistory = () => {
        setConversations((prev) =>
            prev.map((conv) => {
                if (conv.id !== activeId) return conv;
                return {
                    ...conv,
                    messages: [
                        { id: makeId(), role: "bot", text: "Hello. Can I help you?" },
                    ],
                };
            })
        );
        setClearConfirm(false);
    };

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (historyButtonRef.current && !historyButtonRef.current.contains(event.target)) {
                setOpenFormId(null);
            }
        };
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();
        const text = userMessage.trim();
        const hasImage = !!imageFile;

        if ((!text && !hasImage) || status === "loading" || !activeConversation) return;

        setStatus("loading");
        setError("");
        setUserMessage("");

        const file = imageFile;

        setImageFile(null);
        if (fileInputRef.current) {
            fileInputRef.current.value = "";
        }

        const loadingId = makeId();
        const current = conversations.find((c) => c.id === activeId);
        let sessionId = current?.sessionId;
        if (!sessionId) {
            sessionId = "s" + makeId();
            setConversations((prev) =>
                prev.map((c) => (c.id === activeId ? { ...c, sessionId } : c))
            );
        }

        let imagePreviewUrl = null;
        if (hasImage && file) {
            try {
                imagePreviewUrl = await new Promise((resolve, reject) => {
                    const reader = new FileReader();
                    reader.onloadend = () => resolve(reader.result);
                    reader.onerror = reject;
                    reader.readAsDataURL(file);
                });
            } catch (error) {
                console.error("Error reading file:", error);
            }
        }

        setConversations((prev) =>
            prev.map((conv) => {
                if (conv.id !== activeId) return conv;
                const isFirstUserMsg = conv.messages.every((m) => m.role !== "user");
                return {
                    ...conv,
                    title: isFirstUserMsg
                        ? (text || "Photo").slice(0, 40) + ((text?.length > 40) ? "..." : "")
                        : conv.title,
                    messages: [
                        ...conv.messages,
                        { id: Date.now() - 1, role: "user", text, imageUrl: imagePreviewUrl },
                        { id: loadingId, role: "bot", text: `thinking with ${model}...` },
                    ],
                };
            })
        );

        const formData = new FormData();
        formData.append("text", text);
        formData.append("model", model);
        formData.append("sessionId", sessionId);
        if (hasImage && file) {
            formData.append("image", file, file.name);
        }

        try {
            const r = await fetch(LOCAL_WEBHOOK_URL, {
                method: "POST",
                body: formData,
            });

            const ctype = r.headers.get("content-type") || "";
            const data = ctype.includes("application/json")
                ? await r.json()
                : { message: await r.text() };
            if (!r.ok) throw new Error(data?.message || `HTTP ${r.status}`);

            const reply = data?.message ?? data?.answer ?? data?.output ?? JSON.stringify(data);

            setConversations((prev) =>
                prev.map((conv) =>
                    conv.id === activeId
                        ? {
                            ...conv,
                            messages: conv.messages.map((m) =>
                                m.id === loadingId ? { ...m, text: String(reply) } : m
                            ),
                        }
                        : conv
                )
            );
            setStatus("success");
        } catch (err) {
            const msg = err?.message || "Unknown error";
            setError(msg);
            setConversations((prev) =>
                prev.map((conv) =>
                    conv.id === activeId
                        ? {
                            ...conv,
                            messages: conv.messages.map((m) =>
                                m.id === loadingId ? { ...m, text: `ขอโทษนะ มีปัญหา: ${msg}` } : m
                            ),
                        }
                        : conv
                )
            );
            setStatus("error");
        }
    };

    const convertUrlsToMarkdown = (text) => {
        const imageRegex = /(https?:\/\/[^\s]+?\.(jpe?g|png|gif|webp|svg|bmp))\s*$/i;

        let result = text;
        result = result.replace(imageRegex, (match, url) => {
            return `![Image](${url})`;
        });

        return result;
    };

    const enhance = (md = "") => {
        let result = md.replace(/\*\*มติ:\*\*/g, "**มติ:**");
        result = convertUrlsToMarkdown(result);
        return result;
    }

    const sanitize = (md = "") => DOMPurify.sanitize(md);
    const sanitizeTitle = (t) => {
        const s = (t ?? "").trim();
        return s.length ? (s.length > 60 ? s.slice(0, 60) + "…" : s) : "new chat";
    };

    const createNewChat = () => {
        const newChat = {
            id: "c" + makeId(),
            sessionId: "s" + makeId(),
            title: "new chat",
            messages: [{ id: makeId(), role: "bot", text: "Hello. Can I help you?" }],
        };
        setConversations((prev) => [newChat, ...prev]);
        setActiveId(newChat.id);
    };

    const startRename = (id, currentTitle = "") => {
        setEditingId(id);
        setDraftTitle(currentTitle);
        setOpenFormId(null);
    };

    const saveRename = () => {
        setConversations(prev =>
            prev.map(c => (c.id === editingId ? { ...c, title: sanitizeTitle(draftTitle) } : c))
        );
        setEditingId(null);
    };

    const cancelRename = () => {
        setEditingId(null);
        setDraftTitle("");
    };

    if (!isMounted) {
        return (
            <div className="content-container">
                <div className="loading-overlay">Loading chat history...</div>
            </div>
        );
    }

    return (
        <div className="content-container">
            <div className="content-header">
                <div className="header-name">
                    <h1>Market chat</h1>
                    <p>Internship Project</p>
                </div>
                <div className="header-button">
                    <select
                        className="border rounded px-2 py-1 header-select"
                        value={model}
                        onChange={(e) => setModel(e.target.value)}
                        title="Choose model to answer."
                    >
                        {MODELS.map((m) => (
                            <option key={m.id} value={m.id}>
                                {m.label}
                            </option>
                        ))}
                    </select>
                    <button
                        className="clear-btn"
                        onClick={openClearHistoryWindow}
                        disabled={status === "loading"}
                    >
                        Clear History
                    </button>
                </div>
            </div>

            <div className="main-container">
                <div className="history-box">
                    <button className="new-chat-btn" onClick={createNewChat}>
                        + New Chat
                    </button>
                    <ul className="history-list">
                        {conversations.map((conv) => (
                            <li
                                key={conv.id}
                                className={conv.id === activeId ? "active selected" : ""}
                                onClick={() => setActiveId(conv.id)}
                            >
                                {editingId === conv.id ? (
                                    <input
                                        className="rename-input"
                                        value={draftTitle}
                                        autoFocus
                                        onClick={(e) => e.stopPropagation()}
                                        onChange={(e) => setDraftTitle(e.target.value)}
                                        onBlur={saveRename}
                                        onKeyDown={(e) => {
                                            if (e.key === "Enter") saveRename();
                                            if (e.key === "Escape") cancelRename();
                                        }}
                                        placeholder="ตั้งชื่อแชท…"
                                    />
                                ) : (
                                    <span>{conv.title}</span>
                                )}

                                <button
                                    className="selection-btn"
                                    onClick={(e) => {
                                        e.stopPropagation();
                                        setOpenFormId(prev => (prev === conv.id ? null : conv.id));
                                    }}
                                    title="More actions"
                                >
                                    <FontAwesomeIcon icon={faEllipsis} />
                                </button>

                                {openFormId === conv.id && (
                                    <div
                                        ref={historyButtonRef}
                                        className="selectionForm"
                                        onClick={(e) => e.stopPropagation()}
                                    >
                                        <ul>
                                            <li onClick={() => startRename(conv.id, conv.title)}>Rename</li>
                                            <li
                                                onClick={() => {
                                                    setConversations(prev => prev.filter(c => c.id !== conv.id));
                                                    if (conv.id === activeId) {
                                                        // เลือกแชทถัดไป ถ้ามีหลายแชท
                                                        const next = conversations.find(c => c.id !== conv.id);
                                                        if (next) setActiveId(next.id);
                                                    }
                                                    setOpenFormId(null);
                                                }}
                                            >
                                                Delete Chat
                                            </li>
                                            <li onClick={() => setOpenFormId(null)}>Cancel</li>
                                        </ul>
                                    </div>
                                )}
                            </li>
                        ))}
                    </ul>
                </div>

                <div className="chat-body" ref={chatBodyRef}>
                    <div className="chat-history-zone">
                        {activeConversation?.messages.map((m) => (
                            <div
                                key={m.id}
                                className={`message ${m.role === "user" ? "user-message" : "bot-message"
                                    }`}
                            >
                                <div className="message-body">
                                    {/* แสดงรูปภาพที่แนบมากับข้อความของผู้ใช้ (Base64 URL) */}
                                    {m.imageUrl && (
                                        <img
                                            src={m.imageUrl}
                                            alt="uploaded"
                                            className="message-image-preview"
                                        />
                                    )}
                                    <ReactMarkdown
                                        remarkPlugins={[remarkGfm]}
                                        components={{
                                            p: ({ children, className }) => (
                                                <p className={`message-text ${className ?? ""}`}>
                                                    {children}
                                                </p>
                                            ),
                                            strong: ({ children, className }) => (
                                                <strong
                                                    className={`font-semibold ${className ?? ""}`}
                                                >
                                                    {children}
                                                </strong>
                                            ),
                                            ol: ({ children, className }) => (
                                                <ol
                                                    className={`list-decimal ml-6 my-2 ${className ?? ""}`}
                                                >
                                                    {children}
                                                </ol>
                                            ),
                                            ul: ({ children, className }) => (
                                                <ul
                                                    className={`list-disc ml-6 my-2 ${className ?? ""}`}
                                                >
                                                    {children}
                                                </ul>
                                            ),
                                            li: ({ children, className }) => (
                                                <li className={`my-1 ${className ?? ""}`}>
                                                    {children}
                                                </li>
                                            ),
                                            code: ({ inline, children, className }) =>
                                                inline ? (
                                                    <code className={`px-1 rounded bg-gray-100 inline-code ${className ?? ""}`}>{children}</code>
                                                ) : (
                                                    <pre className="p-3 rounded bg-gray-100 overflow-auto message-pre">
                                                        <code className={className}>{children}</code>
                                                    </pre>
                                                ),
                                            blockquote: ({ children, className }) => (
                                                <blockquote
                                                    className={`border-l-4 pl-3 text-gray-700 italic ${className ?? ""}`}
                                                >
                                                    {children}
                                                </blockquote>
                                            ),
                                        }}
                                    >
                                        {/* 💡 ข้อความบอทจะผ่าน enhance ซึ่งมีการแปลง URL รูปภาพ */}
                                        {sanitize(enhance(m.text))}
                                    </ReactMarkdown>
                                </div>

                                <button
                                    className={`message-button ${m.role === "user" ? "user" : "bot"
                                        }`}
                                    onClick={() => navigator.clipboard.writeText(m.text ?? "")}
                                    title="คัดลอกข้อความ"
                                >
                                    <FontAwesomeIcon icon={faCopy} size="lg" />
                                </button>
                            </div>
                        ))}
                    </div>
                    <div className="chat-footer">
                        <form className="chat-form" onSubmit={handleSubmit}>
                            <label
                                htmlFor="file-upload"
                                className={`attach-btn ${status === "loading" ? "disabled" : ""}`}
                                title="แนบรูปภาพ"
                            >
                                <FontAwesomeIcon icon={faImage} size="lg" />
                            </label>
                            <input
                                id="file-upload"
                                type="file"
                                accept="image/*"
                                onChange={(e) => setImageFile(e.target.files?.[0] || null)}
                                disabled={status === "loading"}
                                style={{ display: "none" }}
                                ref={fileInputRef}
                            />

                            {/* 💡 แสดงชื่อไฟล์ที่เลือก */}
                            {imageFile && (
                                <div className="file-info">
                                    {imageFile.name}
                                    <button
                                        type="button"
                                        onClick={() => {
                                            setImageFile(null);
                                            if (fileInputRef.current) {
                                                fileInputRef.current.value = "";   // เคลียร์ input ด้วย
                                            }
                                        }}
                                        title="ลบรูปภาพที่แนบ"
                                    >
                                        &times;
                                    </button>

                                </div>
                            )}
                            <input
                                type="text"
                                placeholder={
                                    status === "loading"
                                        ? "Please wait for response..."
                                        : "Enter your question here."
                                }
                                className="message-input"
                                value={userMessage}
                                onChange={(e) => setUserMessage(e.target.value)}
                                required={!imageFile}
                                disabled={status === "loading"}
                            />
                            <button
                                type="submit"
                                disabled={status === "loading" || (!userMessage.trim() && !imageFile)}
                                aria-label="Send"
                            >
                                <FontAwesomeIcon icon={faPaperPlane} size="lg" />
                            </button>
                        </form>
                        {status === "error" && <div className="chat-error">{error}</div>}
                    </div>
                </div>

            </div>

            {clearComfirm && (
                <div className="confirm-window">
                    <h1>Are you sure? </h1>
                    <div>
                        <button onClick={handleConfirmClearHistory}>Yes</button>
                        <button onClick={() => setClearConfirm(false)}>Cancel</button>
                    </div>
                </div>
            )}


        </div>
    );
};