import React, {Component} from 'react';
import {connect} from 'react-redux';
import Avatar from 'react-avatar';
import {UncontrolledCollapse} from 'reactstrap';
import LoaderSpinner from '../Utils/LoaderSpinner/LoaderSpinner';
import {
    openEditUserPopUpBox,
    openDeleteUserPopUpBox,
    openUserAddRolesPopUpBox,
    openUserRemoveRolesPopUpBox
} from '../Utils/PopUpBox/PopUpBox';
import addIcon from '../../assets/icons/base/add.svg';
import removeIcon from '../../assets/icons/base/remove.svg';
import editIcon from '../../assets/icons/base/edit.svg';
import deleteIcon from '../../assets/icons/base/delete.svg';
import arrow_up from '../../assets/icons/base/arrow_up.svg';
import arrow_down from '../../assets/icons/base/arrow_down.svg';
import './Users.css';

class User extends Component {

    constructor(props) {
        super(props);
        this.state = {
            userRoles: {},
            isLoading: true,
            isOpen: false
        };
        this.changeCollapseState = this.changeCollapseState.bind(this);
        this.onEntering = this.onEntering.bind(this);
    }

    onEntering() {
        fetch('/api/v1/users/' + this.props.userId + '/roles', {
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
            .then(data => this.setState({userRoles: data, isLoading: false}))
            .catch(error => console.log(error));
    }

    changeCollapseState() {
        this.setState({isOpen: !this.state.isOpen})
    }

    getArrow(isOpen) {
        return isOpen ? arrow_up : arrow_down;
    }

    render() {
        const {userRoles, isLoading, isOpen} = this.state;

        return <div className="usersTableRow" key={this.props.keyItem}>
            <div className="divUsersTableRow">
                <div className="userNumber">
                    {this.props.keyItem + 1}
                </div>
                <div className="userName">
                    <Avatar name={this.props.user.name}
                            size="30" round="30" className="userAvatarInfo"
                            color="#9be8e2"/>
                    {this.props.user.name}
                </div>
                <div className="userEmail">
                    {this.props.user.email}
                </div>
                <div className="userEdit">
                    <img src={editIcon}
                         className="userIcon" alt=""
                         title="edit"
                         onClick={() => openEditUserPopUpBox(this.props.userId, this.props.user)}/>
                </div>
                <div className="userDelete">
                    <img src={deleteIcon}
                         className="userIcon" alt=""
                         title="delete"
                         onClick={() => {
                             openDeleteUserPopUpBox(this.props.userId, this.props.user.name)
                         }}/>
                </div>
                <div className="userArrow">
                    <img src={this.getArrow(isOpen)}
                         className="userIcon" alt=""
                         onClick={this.changeCollapseState}
                         id={this.props.divItemId}/>
                </div>
            </div>

            <UncontrolledCollapse toggler={this.props.divItemIdToggler}
                                  onEntering={this.onEntering}>
                {isLoading ?
                    <div className="center"><LoaderSpinner/></div> :
                    <div className="divUserDetails">
                        <div className="usersTableHead">
                            <div className="userNumber"/>
                            <div className="userRoles">
                                Roles
                            </div>
                            <div className="userRolesActions"/>
                            <div className="userRolesActions"/>
                        </div>
                        <div className="usersDescriptionTableRow">
                            <div className="divUsersTableRow">
                                <div className="userNumber"/>
                                <div className="userRoles">
                                    {userRoles.data.roles.length === 0 ?
                                        "No roles" : userRoles.data.roles.map(role => {
                                            return <>{role}<br/></>;
                                        })}
                                </div>
                                <div className="userRolesActions">
                                    <img src={addIcon}
                                         className="userRoleIcon" alt=""
                                         title="add roles"
                                         onClick={() => openUserAddRolesPopUpBox(
                                             this.props.userId, userRoles.data.roles)}/>
                                </div>
                                <div className="userRolesActions">
                                    <img src={removeIcon}
                                         className="userRoleIcon" alt=""
                                         title="remove roles"
                                         onClick={() => openUserRemoveRolesPopUpBox(this.props.userId, userRoles.data.roles)}/>
                                </div>
                            </div>
                        </div>
                    </div>
                }
            </UncontrolledCollapse>
        </div>
    }
}

const mapStateToProps = (state) => {
    return {
        token: state.token
    }
};

export default connect(mapStateToProps, null)(User);
