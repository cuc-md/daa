import React from 'react';
import {ReactComponent as LogoIcon} from '../../../../assets/icons/logo/logo.svg';
import {openSignInPopUpBox, openRegisterPopUpBox} from '../../../Utils/PopUpBox/PopUpBox';
import '../../../Utils/PopUpBox/PopUpBox.css';
import '../Navbar.css';

const SignedOutLinks = () => {
    return (
        <div className="navbar">
            <div className="divNavbarLogo">
                <LogoIcon className="navbarLogo"/>
            </div>
            <div className="navbarLinks">
                <div className="divNavbar" tabIndex={1} onClick={openSignInPopUpBox}>
                    Sign In
                </div>
                <div className="divNavbar" tabIndex={2} onClick={openRegisterPopUpBox}>
                    Register
                </div>
            </div>
        </div>
    );
};

export default SignedOutLinks;
