import React, {Component} from 'react';
import Avatar from 'react-avatar';
import {openSignOutPopUpBox} from '../../../Utils/PopUpBox/PopUpBox';
import {ReactComponent as LogoIcon} from '../../../../assets/icons/logo/logo.svg';
import {ReactComponent as ExitIcon} from '../../../../assets/icons/navbar/exit.svg';
import '../Navbar.css';

class SignedInLinks extends Component {
    constructor(props) {
        super(props);
        this.state = {
            meInfo: {
                "data": {
                    "user": {
                        "id": 1,
                        "name": "name surname",
                        "email": "email@email.com",
                        "roles": ["manage_events", "manage_clubs"]
                    }
                }
            },
            isLoading: true
        };
    }

    // componentDidMount() {
    //     fetch('/api/v1/users/me', {
    //         method: 'GET',
    //         headers: {
    //             'Content-Type': 'application/json'
    //         }
    //     })
    //         .then(response => response.json())
    //         .then(data => this.setState({meInfo: data, isLoading: false}))
    // }

    render() {
        const {meInfo} = this.state;

        return (
            <div className="navbar">
                <div className="divNavbarLogo">
                    <LogoIcon className="navbarLogo"/>
                </div>
                <div className="divNavbarProfile">
                    <Avatar name={meInfo.data.user.name}
                            size="45" round="4px"
                            className="userAvatarNavbar"/>
                    <div className="divNavbarUserInfo">
                        <div>{meInfo.data.user.name}</div>
                        <div>{meInfo.data.user.email}</div>
                    </div>
                    <ExitIcon className="navbarExitIcon"
                              onClick={openSignOutPopUpBox}/>
                </div>
            </div>
        );
    }
}

export default SignedInLinks;
