import React, {Component} from 'react';
import {connect} from 'react-redux';
import {signOutUser} from '../../../../store/actions/authActions';
import {ReactComponent as LogoIcon} from '../../../../assets/icons/logo/logo.svg';
import '../Navbar.css';

class SignedInLinks extends Component {
    constructor(props) {
        super(props);
        this.state = {
            popupVisible: false
        };
        this.handleClick = this.handleClick.bind(this);
        this.handleOutsideClick = this.handleOutsideClick.bind(this);
        this.logOut = this.logOut.bind(this);
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

    logOut(e) {
        e.preventDefault();
        // Remove the token from localStorage
        localStorage.removeItem("token");
        // Remove the user object from the Redux store
        this.props.signOutUser();
    };


    render() {
        console.log(this.props.currentUser);
        return (
            <div className="navbar">
                <div className="divNavbarLogo">
                    <LogoIcon className="navbarLogo"/>
                </div>
                <button onClick={this.logOut}>Sign Out</button>
            </div>
        );
    }
}

const mapDispatchToProps = dispatch => ({
    signOutUser: () => dispatch(signOutUser())
});

export default connect(null, mapDispatchToProps)(SignedInLinks);
