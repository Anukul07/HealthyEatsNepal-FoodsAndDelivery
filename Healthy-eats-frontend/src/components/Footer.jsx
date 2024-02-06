import React from 'react'
import '../styles/Footer.css'
function Footer(){
    const copyright = String.fromCodePoint(0x00A9);
    const year = '2024';
    const companyName = 'Healthy eats pvt ltd';
    return(
        <div className="Footer-bar">
            <div className='footer-left'>
                <h3>{`${copyright} ${year} ${companyName}`}</h3>
            </div>
            <div className='footer-right'>
                <p className='footer-paragraph'>Follow us on socials</p>
                <img className="icons-social-1" src="src/assets/footer-images/social.png"/>
                <img className="icons-social-2" src="src/assets/footer-images/twitter.png"/>
            </div>
        </div>
    )
};
export default Footer