import React, {Component} from 'react';
import './Users.css';

class User extends Component {

    constructor(props) {
        super(props);
        this.state = {
            isLoading: true
        };
    }

    render() {
        return <div className="main">
            User
        </div>
    }
}

export default User;
