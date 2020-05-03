import React from 'react';
import {connect} from 'react-redux';
import SignedInLinks from './SignedInLinks/SignedInLinks';
import SignedOutLinks from './SignedOutLinks/SignedOutLinks';
import './Navbar.css';

const Navbar = (props) => {
    return JSON.stringify(props.currentUser) !== '{}' ?
        <SignedInLinks currentUser={props.currentUser}/> :
        <SignedOutLinks/>;
};

const mapStateToProps = (state) => {
    return {
        currentUser: state.currentUser
    }
};

export default connect(mapStateToProps)(Navbar);
