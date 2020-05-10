import React, {Component} from 'react';
import './Users.css';

class Users extends Component {

    constructor(props) {
        super(props);
        this.state = {
            isLoading: true
        };
    }

    render() {
        return <div className="main">
            Users
        </div>
    }
}

export default Users;
