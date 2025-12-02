import './footer.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faYoutube, faXTwitter, faFacebook } from '@fortawesome/free-brands-svg-icons';

const Footer = () => {
    return (
        <footer className='footer'>
                <div className='footer-container'>
                    <h1 className='quicksand' id='contact'>Contact Us</h1>
                    <h4 className='quicksand' id='name'>Pixela Official Co., Ltd.<strong></strong></h4>
                    <h6 className='quicksand' id='location'>5 Soi Vibhavadi Rangsit 16/20 Vibhavadi Rangsit Road Ratchadaphisek Subdistrict, Din Daeng District, Bangkok 10400</h6>
                </div>
                <div className='footer-container'>
                    <h4 className='quicksand' id='email'><strong>Email</strong> : info@pixela.me</h4>
                    <h4 className='quicksand'><strong>Tel</strong> : 0xx-xxx-xxxx</h4>
                </div>
                <div className='footer-container'>
                    <h1 className='quicksand' id='contact'>Meet Us At</h1>
                    <ul>
                        <li>
                            <a href='https://www.youtube.com/@PixelaOfficial' target='_blank'>
                                <FontAwesomeIcon icon={faYoutube} />: Youtube <span className='light-weight-text'>(@PixelaOfficial)</span>
                            </a>
                        </li>
                        <li>
                            <a href='https://x.com/PixelaProject' target='_blank'>
                                <FontAwesomeIcon icon={faXTwitter} />: X(Twitter) <span className='light-weight-text'>(@PixelaProject)</span>
                            </a>
                        </li>

                        <li>
                            <a href='https://www.facebook.com/pixelaproject' target='_blank'>
                                <FontAwesomeIcon icon={faFacebook} />: Facebook <span className='light-weight-text'>(/pixelaproject)</span>
                            </a>
                        </li>
                    </ul>
                </div>
            </footer>
    )
}

export default Footer