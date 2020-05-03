import React from 'react';
import {NavLink} from 'react-router-dom';
import {ReactComponent as LogoIcon} from '../../../../assets/icons/logo/logo.svg';
import '../Navbar.css';

const SignedOutLinks = () => {
    return (
        <div className="navbar">
            <div className="divNavbarLogo">
                <LogoIcon className="navbarLogo"/>
            </div>
            <div className="divNavbar">
                <NavLink exact activeClassName="active" className="" to='/sign_in'>
                    Sign In
                </NavLink>
            </div>
            <div className="divNavbar">
                <NavLink exact activeClassName="active" className="" to='/sign_up'>
                    Sign Up
                </NavLink>
            </div>
        </div>
    );
};

export default SignedOutLinks;
