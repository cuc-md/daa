import React, {Component} from 'react';
import {Image} from 'react-bootstrap';
import {NavLink, Link} from 'react-router-dom';
import {ReactComponent as LogoIcon} from '../../../assets/icons/logo/logo.svg';
import './Navbar.css';
import {ReactComponent as ClubIcon} from "../../../assets/icons/sidebar/club.svg";

class Navbar extends Component {

    constructor(props) {
        super(props);
        this.state = {
            popupVisible: false
        };
        this.handleClick = this.handleClick.bind(this);
        this.handleOutsideClick = this.handleOutsideClick.bind(this);
    }

    handleClick() {
        if (!this.state.popupVisible) {
            document.addEventListener('click', this.handleOutsideClick, false);
        } else {
            document.removeEventListener('click', this.handleOutsideClick, false);
        }

        this.setState(prevState => ({
            popupVisible: !prevState.popupVisible,
        }));
    }

    handleOutsideClick(e) {
        if (this.node !== null && this.node.contains(e.target)) {
            return;
        }
        this.handleClick();
    }

    render() {
        return (
            <ul className="navbar">
                <div className="divNavbarLogo">
                    <LogoIcon className="navbarLogo"/>
                </div>
            </ul>
        );
    }
}

export default Navbar;
