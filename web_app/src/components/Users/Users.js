import React, {Component} from 'react';
import {connect} from 'react-redux';
import LoaderSpinner from '../Utils/LoaderSpinner/LoaderSpinner';
import User from './User';
import './Users.css';

class Users extends Component {

    constructor(props) {
        super(props);
        this.state = {
            users: {},
            isLoading: true
        };
    }

    componentDidMount() {
        fetch('/api/v1/users', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': this.props.token
            }
        }).then(response => {
            if (response.ok) {
                return response.json()
            } else {
                console.log("Response status " + response.status);
                return Promise.reject('Error')
            }
        })
            .then(data => this.setState({users: data, isLoading: false}))
            .catch(error => console.log(error));
    }

    render() {
        const {users, isLoading} = this.state;

        if (isLoading) {
            return <div className="main center"><LoaderSpinner/></div>;
        }

        let usersList = users.data.users.map((user, i) => {
            let divItemId = "id" + i;
            let divItemIdToggler = "#" + divItemId;

            return <User keyItem={i}
                         divItemId={divItemId}
                         divItemIdToggler={divItemIdToggler}
                         userId={user.id}
                         user={user}/>
        });

        return <div className="main">
            <div>
                <div className="usersTableHead">
                    <div className="userNumber"/>
                    <div className="userName">
                        Name
                    </div>
                    <div className="userEmail">
                        Email
                    </div>
                    <div className="userEdit"/>
                    <div className="userDelete"/>
                    <div className="userArrow"/>
                </div>
                {usersList}
            </div>
        </div>
    }
}

const mapStateToProps = (state) => {
    return {
        token: state.token
    }
};

export default connect(mapStateToProps, null)(Users);
