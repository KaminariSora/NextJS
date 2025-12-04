"use client"

import './navBar.css'
import { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faXmark, faBars } from '@fortawesome/free-solid-svg-icons';

const Header = () => {
    const [showMenu, setShowMenu] = useState(false);
    const ToggleMenu = () => {
        setShowMenu(!showMenu);
        console.log('click')
    }
    return(
        <header className="header">
                <a href='/' className='logo'><img src='./Images/Pixela.png' alt='Pixela'></img></a>
                <nav className="nav container">
                    {/* NavMenu */}
                    <div className={`navMenu ${showMenu ? 'showMenu' : ''}`}>
                        <ul className="navList" type="none">
                            <li className="listItem"><a href="/" className='quicksand navLink'>Home</a></li>
                            {/* <li className="listItem"><a href="/member" className='quicksand navLink'>Member</a></li> */}
                            <li className="listItem"><a href="/song" className='quicksand navLink'>Song</a></li>
                            <li className="listItem"><a href="/market" className='quicksand navLink'>Market</a></li>
                            {/* <li className="listItem"><a href="/company" className='quicksand navLink'>Company</a></li> */}
                            {/* <li className="listItem"><a href="/contact" className='quicksand navLink'>Contact</a></li> */}
                        </ul>
                        <div className="navClose" onClick={ToggleMenu}>
                            <FontAwesomeIcon icon={faXmark} />
                        </div>
                    </div>
                </nav>
                <div className="nav_action">
                    <div className="navToggle" onClick={ToggleMenu}>
                        <FontAwesomeIcon icon={faBars} />
                    </div>
                </div>
            </header>
    )
}

export default Header