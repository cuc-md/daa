import React from 'react';
import {connect} from 'react-redux';
import SignedInLinks from './SignedInLinks/SignedInLinks';
import SignedOutLinks from './SignedOutLinks/SignedOutLinks';
import './Navbar.css';

const Navbar = (props) => {
    return JSON.stringify(props.token) !== '{}' ?
        <SignedInLinks token={props.token}/> :
        <SignedOutLinks/>;
};

const mapStateToProps = (state) => {
    return {
        token: state.token
    }
};

export default connect(mapStateToProps)(Navbar);
