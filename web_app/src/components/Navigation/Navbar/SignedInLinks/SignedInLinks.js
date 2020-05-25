import React, {Component} from 'react';
import Avatar from 'react-avatar';
import {connect} from 'react-redux';
import {meFetch as meFetchFunction} from '../../../../store/actions/userActions';
import {openSignOutPopUpBox, openEditUserPopUpBox} from '../../../Utils/PopUpBox/PopUpBox';
import {ReactComponent as LogoIcon} from '../../../../assets/icons/logo/logo.svg';
import {ReactComponent as ExitIcon} from '../../../../assets/icons/navbar/exit.svg';
import '../Navbar.css';

class SignedInLinks extends Component {

    componentDidMount() {
        if (this.props.token !== null) {
            this.props.meFetch(this.props.token);
        }
    }

    render() {
        return (
            <div className="navbar">
                <div className="divNavbarLogo">
                    <LogoIcon className="navbarLogo"/>
                </div>
                {this.props.user !== undefined ?
                    <div className="divNavbarProfile">
                        <Avatar name={this.props.user.name}
                                size="45" round="4px"
                                color="#ffb41f"
                                className="userAvatarNavbar"/>
                        <div className="divNavbarUserInfo"
                             onClick={() => openEditUserPopUpBox(this.props.user.id, this.props.user)}>
                            <div>{this.props.user.name}</div>
                            <div>{this.props.user.email}</div>
                        </div>
                        <ExitIcon className="navbarExitIcon"
                                  onClick={openSignOutPopUpBox}/>
                    </div> : null
                }
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        user: state.user
    }
};

const mapDispatchToProps = (dispatch) => {
    return {
        meFetch: (token) => dispatch(meFetchFunction(token)),
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(SignedInLinks);
