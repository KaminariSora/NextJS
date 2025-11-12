"use client"

import { useState } from "react"

export default function Navbar() {
  const [visibleSection, setVisibleSection] = useState("chat")
  
  return (
    <div className='page'>
      <div className="home-container">
        <div className="section" id='section-1'>
          <div className='logo'>
            <img src='./image/Logo.png' alt='Logo' />
            <div>
              <label>ติดบัคหรอ</label>
              <label>ลองยกมือไหว้ยัง</label>
            </div>
          </div>
          <br />
          <ul>
            <li
              className={visibleSection === 'chat' ? 'selected' : ''}
              onClick={() => setVisibleSection('chat')}
            >
              AI chat
            </li>
            <li
              className={visibleSection === 'fullTextSeacrh' ? 'selected' : ''}
              onClick={() => setVisibleSection('fullTextSeacrh')}
            >
              Full Text Search
            </li>
            <li
              className={visibleSection === 'ocr' ? 'selected' : ''}
              onClick={() => setVisibleSection('ocr')}
            >
              OCR
            </li>
          </ul>
        </div>
      </div>
    </div>
  )
}