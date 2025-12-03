"use client"

import { useState } from 'react';
import './profileBar.css'
import UserIcons from "../icons/userIcon";
import SearchIcon from "../icons/searchIcon";
import ShoppingBagIcon from "../icons/shoppingBagIcon";

const ProfileBar = () => {
    const [openDropdown, setOpenDropdown] = useState({
        products: false,
        collections: false,
        talents: false
    });

    const toggleDropdown = (name) => {
        setOpenDropdown(prevState => ({
            ...prevState,
            [name]: !prevState[name],
        }));
    };

    return (
        <div className="profileBar">
            <div className="profileBar-container">
                <ul className="profile-NavList" id="navList" type="none">
                    <li className="nav-item">
                        <p
                            className='quicksand navLink'
                            onClick={() => { console.log('all products') }}
                        >
                            All product </p>
                    </li>
                    <li className="nav-item">
                        <p
                            className='quicksand navLink'
                            onClick={() => toggleDropdown('collections')}
                        >
                            All collection </p>

                        {openDropdown.collections && (
                            <ul className="dropdown-menu">
                                <li><a href="#" className='dropdown-link'>Realistic / Figurative</a></li>
                                <li><a href="#" className='dropdown-link'>Portrait</a></li>
                                <li><a href="#" className='dropdown-link'>Still Life</a></li>
                                <li><a href="#" className='dropdown-link'>Landscape / Cityscape</a></li>
                                <li><a href="#" className='dropdown-link'>Abstract</a></li>
                                <li><a href="#" className='dropdown-link'>Anime/Manga Style</a></li>
                                <li><a href="#" className='dropdown-link'>Cartoon/Comic Style</a></li>
                                <li><a href="#" className='dropdown-link'>Impressionism</a></li>
                            </ul>
                        )}
                    </li>

                    <li className="nav-item">
                        <p
                            className='quicksand navLink'
                            onClick={() => toggleDropdown('talents')}
                        >
                             </p>

                        {/* {openDropdown.talents && (
                            <ul className="dropdown-menu">
                                <li><a href="#" className='dropdown-link'>Category 1</a></li>
                                <li><a href="#" className='dropdown-link'>Category 2</a></li>
                                <li><a href="#" className='dropdown-link'>View All</a></li>
                            </ul>
                        )} */}
                    </li>

                </ul>
                <ul className="profile-NavList" id="profileBar" type="none">
                    <li className=""><a href="#" className='quicksand navLink'><SearchIcon /></a></li>
                    <li className=""><a href="/Login" className='quicksand navLink'><UserIcons /></a></li>
                    <li className=""><a href="#" className='quicksand navLink'><ShoppingBagIcon /></a></li>
                </ul>
            </div>
        </div>
    );
}

export default ProfileBar;