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
                            <li className="listItem"><a to="/Home" className='quicksand navLink'>Home</a></li>
                            <li className="listItem"><a to="/Member" className='quicksand navLink'>Member</a></li>
                            <li className="listItem"><a to="/Song" className='quicksand navLink'>Song</a></li>
                            <li className="listItem"><a to="/Market" className='quicksand navLink'>Market</a></li>
                            <li className="listItem"><a to="/Company" className='quicksand navLink'>Company</a></li>
                            <li className="listItem"><a to="/Contact" className='quicksand navLink'>Contact</a></li>
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