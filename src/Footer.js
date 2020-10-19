import React from 'react';
import { FaGithubSquare, FaInstagramSquare,  FaLinkedin } from "react-icons/fa";

const Footer = ({ height, pageOffset, startHeight }) => (
    <div className="footer" style={{ height}}>
        <div className="footer__content" style={{top: `${startHeight + 2*height/5}px`, transform: `translateY(${pageOffset}px)translateX(-50%)`}}>
            <h3 className="footer__heading">Get in touch!</h3>
            <a className="footer__email" href = "mailto: howdy@jonathan.co.nz">howdy@jonathan.co.nz</a>
            <div className="footer__socials">
                <a href="https://github.com/jonathancarr" target="_blank" rel="noopener noreferrer">
                    <FaGithubSquare className="footer__social footer__social--github"/>
                </a>
                <a href="https://www.instagram.com/spaced_out_jon" target="_blank" rel="noopener noreferrer">
                    <FaInstagramSquare className="footer__social footer__social--instagram"/>
                </a>
                <a href="https://www.linkedin.com/in/jonathan-carr-1a7793117/" target="_blank" rel="noopener noreferrer">
                    <FaLinkedin className="footer__social footer__social--linkedin"/>
                </a>
            </div>
        </div>
    </div>
)

export default Footer;