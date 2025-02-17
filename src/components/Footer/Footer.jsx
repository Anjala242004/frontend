import React from 'react'
import './Footer.css'
import { assets } from '../../assets/assets'
const Footer = () => {
  return (
    <div className='footer' id='footer'>
        <div className="footer-content">
            <div className="footer-content-left">
                <img className="logo-img" src={assets.logo} alt=""/>
                <p>Hungrio is a vibrant restaurant celebrating the versatility of tomatoes. Located in the heart of the city, we offer 
                a menu brimming with fresh, locally sourced tomato-based dishes—from savory soups and salads to creative small plates 
                and desserts.</p>
                <div className="footer-social-icons">
                    <img src={assets.facebook_icon} alt=""/>
                    <img src={assets.twitter_icon}  alt=""/>
                    <img src={assets.linkedin_icon} alt=""/>
                </div>
            </div>
            <div className="footer-content-center">
                <h2>COMPANY</h2>
                <ul>
                    <li>Home</li>
                    <li>About us</li>
                    <li> Delivery</li>
                    <li>Privacy policy</li>
                </ul>
            </div>
            <div className="footer-content-right">
                <h2>GET IN TOUCH</h2>
                <ul>
                    <li>+1-556-856-2211</li>
                    <li>contact@hungrio.com</li>
                </ul>
            </div>
        </div>
        <hr/>
        <p className="footer-copyright">
            copyright 2024 @ Hungrio.com - All Right Reserved
        </p>
    </div>
  )
}

export default Footer
