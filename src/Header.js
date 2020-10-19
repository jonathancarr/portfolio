import React from 'react';
import Rocket from './Rocket';

const Header = ({ height, pageOffset, startHeight }) => (
    <div className="header" style={{height}}>
        <div className="header__content" style={{top: `${startHeight}px`, transform: `translateY(${pageOffset}px)translateX(-50%)`}}>
            <h1>Jonathan Carr</h1>
            <p>I create websites to justify my true passion – buying domain names</p>
        </div>
    </div>
)

export default Header;