import React, {Component} from 'react';
import {ReactComponent as LogoIcon} from '../../../assets/icons/logo/logo.svg';
import './Navbar.css';

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
            <div className="navbar">
                <div className="divNavbarLogo">
                    <LogoIcon className="navbarLogo"/>
                </div>
            </div>
        );
    }
}

export default Navbar;
