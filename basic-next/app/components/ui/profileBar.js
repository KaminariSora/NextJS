// import { Link } from "react-router-dom";
import './profileBar.css'
import UserIcons from "../icons/userIcon";
import SearchIcon from "../icons/searchIcon";
import ShoppingBagIcon from "../icons/shoppingBagIcon";

const ProfileBar = () => {
    return (
        <div className="profileBar">
            <div className="profileBar-container">
                <ul className="profile-NavList" id="navList" type="none">
                    <li className=""><a to="#" className='quicksand navLink'>All product</a></li>
                    <li className=""><a to="#" className='quicksand navLink'>All collection</a></li>
                    <li className=""><a to="#" className='quicksand navLink'>Talents</a></li>
                </ul>
                <ul className="profile-NavList" id="profileBar" type="none">
                    <li className=""><a to="#" className='quicksand navLink'><SearchIcon /></a></li>
                    <li className=""><a to="/Login" className='quicksand navLink'><UserIcons /></a></li>
                    <li className=""><a to="#" className='quicksand navLink'><ShoppingBagIcon /></a></li>
                </ul>
            </div>
        </div>
    );
}

export default ProfileBar