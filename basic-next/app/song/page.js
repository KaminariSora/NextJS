"use client"

import Link from 'next/link';
import { useState } from "react";
import './song.css'
import Header from "../components/ui/header";
import GridMotion from '../components/particles/GridMotion';
import Particles from '../components/particles/Particles';
import BlurText from '../components/particles/Blurtext';
import ShinyText from '../components/particles/Shinytext';
import YoutubeIcon from '../Components/icons/youtube';
import YoutubeMusic from '../Components/icons/youtubeMusic';

const Song = () => {
    const [youtubeHover, setYoutubeHover] = useState(false);
    const [youtubeMusicHover, setYoutubeMusicHover] = useState(false);
    const items = [
        'https://i.ytimg.com/vi/ECm0lLTjZxQ/maxresdefault.jpg',
        // <div key='jsx-item-1'>Songs</div>,
        'https://i.ytimg.com/vi/-zmjGfkJZXY/maxresdefault.jpg',
        'https://i.ytimg.com/vi/EPc82dGZwCQ/hqdefault.jpg',
        // <div key='jsx-item-2'>Songs</div>,
        'https://i.ytimg.com/vi/7tL_wFbmDuk/hqdefault.jpg',
        // <div key='jsx-item-2'>Songs</div>,
        'https://i.ytimg.com/vi/liRcAL50Zlg/hq720.jpg?sqp=-oaymwEhCK4FEIIDSFryq4qpAxMIARUAAAAAGAElAADIQj0AgKJD&rs=AOn4CLAaDexctr8SABRHSBZdRb_k0ZHy2Q',
        'https://i.ytimg.com/vi/-fxIAm8dozk/hqdefault.jpg',
        // <div key='jsx-item-2'>Songs</div>,
        'https://i.ytimg.com/vi/ECm0lLTjZxQ/maxresdefault.jpg',
        // <div key='jsx-item-2'>Songs</div>,
        'https://i.ytimg.com/vi/PLVN1En9ndw/maxresdefault.jpg',
        'https://i.ytimg.com/vi/-wpS87yLcYw/hqdefault.jpg',
        // <div key='jsx-item-2'>Pixela Unofficial</div>,
        'https://i.ytimg.com/vi/Ezkr0QZk3jo/hqdefault.jpg',
        // <div key='jsx-item-3'>Songs</div>,
        'https://i.ytimg.com/vi/Ie7Qbc56ioc/maxresdefault.jpg',
        'https://i.ytimg.com/vi/zBUISpkq2hU/hqdefault.jpg',
        // <div key='jsx-item-2'>Songs</div>,
        'https://i.ytimg.com/vi/oHyzK0cV5ks/hqdefault.jpg',
        // <div key='jsx-item-4'>Songs</div>,
        'https://i.ytimg.com/vi/hyqwD2llbdw/hq720.jpg?sqp=-oaymwEhCK4FEIIDSFryq4qpAxMIARUAAAAAGAElAADIQj0AgKJD&rs=AOn4CLAdqHruxwi-9rtxndoG0ylMq37dJQ',
        'https://i.ytimg.com/vi/61HWSZztq0k/hqdefault.jpg',
        'https://i.ytimg.com/vi/mn8pK0IClyk/hq720.jpg?sqp=-oaymwEhCK4FEIIDSFryq4qpAxMIARUAAAAAGAElAADIQj0AgKJD&rs=AOn4CLC3L_LC4pLCliAFIrOWbvnz-SJB6A',
        'https://i.ytimg.com/vi/YECdcxMi6vw/hqdefault.jpg',
        'https://i.ytimg.com/vi/8iRhLNswNBE/hqdefault.jpg',
        'https://i.ytimg.com/vi/uynmyvsWe-U/hq720.jpg?sqp=-oaymwEhCK4FEIIDSFryq4qpAxMIARUAAAAAGAElAADIQj0AgKJD&rs=AOn4CLCJj4TMjGuQS4A46jb-Tifc8GyA5g',
        'https://i.ytimg.com/vi/wifvnNM8FpY/hq720.jpg?sqp=-oaymwEhCK4FEIIDSFryq4qpAxMIARUAAAAAGAElAADIQj0AgKJD&rs=AOn4CLDN58pj0nAGIZzMlMYvL_FugTGJvg',
        'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS9alzWmUe7nwcN2lU9p1s0CIUpybPFmKje6Q&s',
        'https://i.ytimg.com/vi/8rnTRmG83Qw/maxresdefault.jpg',
        'https://i.ytimg.com/vi/ceIx2Mo5rWI/hq720.jpg?sqp=-oaymwEhCK4FEIIDSFryq4qpAxMIARUAAAAAGAElAADIQj0AgKJD&rs=AOn4CLAbOks6Sa2Ow0SETHlazHmRGHFIaQ',
        'https://i.ytimg.com/vi/jRD_ckgOFU8/hqdefault.jpg',
        'https://i.ytimg.com/vi/OBaPdA0Ayg4/hqdefault.jpg',
        'https://i.ytimg.com/vi/1SdmhmBklMA/hq720.jpg?sqp=-oaymwEhCK4FEIIDSFryq4qpAxMIARUAAAAAGAElAADIQj0AgKJD&rs=AOn4CLBvoXtTXPj9QSzvLjqtA70PLBC0ZQ',
        'https://i.ytimg.com/vi/M_FvJtDTvg4/hqdefault.jpg'
    ];
    return (
        <div style={{ position: 'relative', width: '100%', height: '100vh', overflow: 'hidden' }}>
            <Particles
                particleColors={['#ffffff', '#ffffff']}
                particleCount={200}
                particleSpread={10}
                speed={0.1}
                particleBaseSize={100}
                moveParticlesOnHover={true}
                alphaParticles={false}
                disableRotation={false}
            />
            <GridMotion items={items} />
            <Header />
            <div className="overlay-container">
                <div className='overlay-content'>
                    <BlurText
                        text="Songs"
                        delay={150}
                        animateBy="words"
                        direction="top"
                        className="text-5xl mb-8 song-text quicksand"
                    />
                    <div className="break-point"></div>
                    <ShinyText text="Listen via streaming platforms" disabled={false} speed={3} className='custom-class' />
                    <div className="break-point"></div>
                    <div className="via-container">
                        <Link className="via-item"
                            target="_blank"
                            href="https://www.youtube.com/@PixelaOfficial"
                            onMouseEnter={() => setYoutubeHover(true)}
                            onMouseLeave={() => setYoutubeHover(false)}>
                            <div className="via-icon">
                                <YoutubeIcon shake={youtubeHover} />
                            </div>
                            <div className="via-box">
                                <ShinyText text="Youtube" disabled={false} speed={3} className='via-text' />
                            </div>
                        </Link>
                        <Link className="via-item"
                            target="_blank"
                            href="https://music.youtube.com/channel/UCanc6lW8Ump8xrIFpvf5Ufw?si=oiqJWAwnsroE3kQq"
                            onMouseEnter={() => setYoutubeMusicHover(true)}
                            onMouseLeave={() => setYoutubeMusicHover(false)}>
                            <div className="via-icon">
                                <YoutubeMusic shake={youtubeMusicHover} />
                            </div>
                            <div className="via-box">
                                <ShinyText text="Youtube Music" disabled={false} speed={3} className='via-text' />
                            </div>
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Song