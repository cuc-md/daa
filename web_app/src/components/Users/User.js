import React, {Component} from 'react';
import {connect} from 'react-redux';
import Avatar from 'react-avatar';
import {UncontrolledCollapse} from 'reactstrap';
import LoaderSpinner from '../Utils/LoaderSpinner/LoaderSpinner';
import {
    openEditUserPopUpBox,
    openDeleteUserPopUpBox,
    openUserRolesPopUpBox
} from '../Utils/PopUpBox/PopUpBox';
import rolesIcon from '../../assets/icons/base/role.svg';
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
    }

    componentDidMount() {
        fetch('/api/v1/users/' + this.props.userId + '/roles', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': this.props.token
            }
        })
            .then(response => response.json())
            .then(data => this.setState({userRoles: data, isLoading: false}))
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
                         onClick={() => openEditUserPopUpBox(this.props.userId, this.props.user)}/>
                </div>
                <div className="userDelete">
                    <img src={deleteIcon}
                         className="userIcon" alt=""
                         onClick={() => {
                             openDeleteUserPopUpBox(this.props.userId, this.props.user.name);

                         }}/>
                </div>
                <div className="userArrow">
                    <img src={this.getArrow(isOpen)}
                         className="userIcon" alt=""
                         onClick={this.changeCollapseState}
                         id={this.props.divItemId}/>
                </div>
            </div>

            <UncontrolledCollapse toggler={this.props.divItemIdToggler}>
                {isLoading ?
                    <div className="center"><LoaderSpinner/></div> :
                    <div className="divUserDetails">
                        <div className="usersTableHead">
                            <div className="userNumber"/>
                            <div className="userRoles">
                                Roles
                            </div>
                            <div className="userEmpty"/>
                        </div>
                        <div className="usersDescriptionTableRow">
                            <div className="divUsersTableRow">
                                <div className="userNumber"/>
                                <div className="userRoles">
                                    {userRoles.data.roles.length === 0 ?
                                        "No roles"
                                        :
                                        userRoles.data.roles.map(role => {
                                            return <>{role}<br/></>;
                                        })}
                                </div>
                                <div className="userRolesActions">
                                    <img src={rolesIcon}
                                         className="userIcon" alt=""
                                         onClick={() => openUserRolesPopUpBox(this.props.userId, this.props.user)}/>
                                </div>
                                <div className="userEmpty"/>
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
