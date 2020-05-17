import React from 'react';
import {connect} from 'react-redux';
import {Redirect} from 'react-router-dom';
import Users from './Users';

const UsersRedux = (props) => {
    return props.token === null ? <Redirect to='/'/> : <Users token={props.token}/>
};

const mapStateToProps = (state) => {
    return {
        token: state.token
    }
};

export default connect(mapStateToProps)(UsersRedux);
