import React from 'react';
import {connect} from 'react-redux';
import SignedInLinks from './SignedInLinks/SignedInLinks';
import SignedOutLinks from './SignedOutLinks/SignedOutLinks';
import './Navbar.css';

const Navbar = (props) => {
    return JSON.stringify(props.user) !== '{}' ?
        <SignedInLinks currentUser={props.user}/> :
        <SignedOutLinks/>;
};

const mapStateToProps = (state) => {
    return {
        user: state.user
    }
};

export default connect(mapStateToProps)(Navbar);
