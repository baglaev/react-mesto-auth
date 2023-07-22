import React from 'react';
import logoHeader from '../images/logo_header.svg';

function Header() {
    return(
        <header className="header">
            <img src={logoHeader} alt="логотип Mesto" className="header__logo"/>
        </header>
    );
}

export default Header;