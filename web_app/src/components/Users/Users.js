import React, {Component} from 'react';
import {connect} from 'react-redux';
import LoaderSpinner from '../Utils/LoaderSpinner/LoaderSpinner';
import rolesIcon from '../../assets/icons/base/role.svg';
import editIcon from '../../assets/icons/base/edit.svg';
import deleteIcon from '../../assets/icons/base/delete.svg';
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
        })
            .then(response => response.json())
            .then(data => this.setState({users: data, isLoading: false}))
    }

    render() {
        const {users, isLoading} = this.state;

        if (isLoading) {
            return <div className="main center"><LoaderSpinner/></div>;
        }

        let usersList = users.data.users.map((user, i) => {
            return <div className="usersTableRow" key={i}>
                <div className="divUsersTableRow">
                    <div className="teamNumber">
                        {i + 1}
                    </div>
                    <div className="userName">
                        {user.name}
                    </div>
                    <div className="userEmail">
                        {user.email}
                    </div>
                    <div className="userRoles">
                        {/*{user.roles.map(role => {*/}
                        {/*    role*/}
                        {/*})*/}
                        {/*}*/}
                    </div>
                    <div className="userRolesEdit">
                        <img src={rolesIcon}
                             className="userIcon" alt=""
                             onClick={() => console.log("ROLES")}/>
                    </div>
                    <div className="userEdit">
                        <img src={editIcon}
                             className="userIcon" alt=""
                             onClick={() => console.log("EDIT")}/>
                    </div>
                    <div className="userDelete">
                        <img src={deleteIcon}
                             className="userIcon" alt=""
                             onClick={() => console.log("DELETE")}/>
                    </div>
                </div>
            </div>
        });

        return <div className="main">
            <div>
                <div className="usersTableHead">
                    <div className="userNumber"/>
                    <div className="userName">
                        Team
                    </div>
                    <div className="userEmail">
                        Email
                    </div>
                    <div className="userRoles">
                        Roles
                    </div>
                    <div className="userRolesEdit"/>
                    <div className="userEdit"/>
                    <div className="userDelete"/>
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
