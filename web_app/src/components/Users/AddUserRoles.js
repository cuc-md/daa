import React, {Component} from 'react';
import toaster from 'toasted-notes';
import {connect} from 'react-redux';
import {PopupboxManager} from 'react-popupbox';
import {
    checkUserManageClubsRole,
    checkUserManageEventsRole,
    checkUserManageUsersRole
} from '../Utils/Helpers/UserHelper';
import '../Utils/Toaster/Toaster.css';
import '../Utils/Form/Form.css';

class AddUserRoles extends Component {

    constructor(props) {
        super(props);
        this.state = {
            manage_events: checkUserManageEventsRole(this.props.userRoles),
            manage_clubs: checkUserManageClubsRole(this.props.userRoles),
            manage_users: checkUserManageUsersRole(this.props.userRoles)
        };
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChange(e) {
        this.setState({[e.target.name]: e.target.value});
    };

    handleSubmit(e) {
        let userRolesToAdd = [];
        if (this.state.manage_events && !checkUserManageEventsRole(this.props.userRoles)) {
            userRolesToAdd.push("manage_events")
        }
        if (this.state.manage_clubs && !checkUserManageClubsRole(this.props.userRoles)) {
            userRolesToAdd.push("manage_clubs")
        }
        if (this.state.manage_users && !checkUserManageUsersRole(this.props.userRoles)) {
            userRolesToAdd.push("manage_users")
        }

        e.preventDefault();
        fetch('/api/v1/users/' + this.props.userId + '/roles', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': this.props.token
            },
            body: JSON.stringify({roles: userRolesToAdd})
        }).then(response => {
            if (!response.ok) {
                toaster.notify("Error", {
                    duration: 3000,
                    position: "bottom"
                });
            } else {
                toaster.notify("Roles were successfully added", {
                    duration: 3000,
                    position: "bottom"
                });
                window.location = "/users";
                PopupboxManager.close();
                return response.json();
            }
        })
    };

    render() {
        return <div>
            <form className="form"
                  onSubmit={this.handleSubmit}>
                <h3 className="formText">
                    Add roles
                </h3>
                <br/>
                <label>
                    <input
                        type="checkbox"
                        name="manage_events"
                        checked={this.state.manage_events}
                        onChange={(e) => {
                            this.handleChange({
                                target: {
                                    name: e.target.name,
                                    value: e.target.checked,
                                },
                            });
                        }}
                    />
                    manage_events
                </label>
                <br/>
                <label>
                    <input
                        type="checkbox"
                        name="manage_clubs"
                        checked={this.state.manage_clubs}
                        onChange={(e) => {
                            this.handleChange({
                                target: {
                                    name: e.target.name,
                                    value: e.target.checked,
                                },
                            });
                        }}
                    />
                    manage_clubs
                </label>
                <br/>
                <label>
                    <input
                        type="checkbox"
                        name="manage_users"
                        checked={this.state.manage_users}
                        onChange={(e) => {
                            this.handleChange({
                                target: {
                                    name: e.target.name,
                                    value: e.target.checked,
                                },
                            });
                        }}
                    />
                    manage_users
                </label>
                <br/>
                <input type='submit' className="formButton textFontStyle16"/>
            </form>
        </div>
    }
}

const mapStateToProps = (state) => {
    return {
        token: state.token
    }
};

export default connect(mapStateToProps, null)(AddUserRoles);
