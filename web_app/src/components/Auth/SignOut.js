import React from 'react';
import {connect} from 'react-redux';
import {PopupboxManager} from 'react-popupbox';
import {signOutUser} from '../../store/actions/authActions';
import '../Utils/Form/Form.css';
import '../Utils/Button/Button.css';

const SignOut = (props) => {
    return <div className="divForm">
        <h3 className="formText">Are you sure you want to sign out?</h3>
        <br/>
        <div className="center">
            <button className="choiceButton cancelButton textFontStyle16"
                    onClick={PopupboxManager.close}>
                Cancel
            </button>
            <button className="choiceButton okButton textFontStyle16"
                    onClick={() => {
                        props.signOutUser();
                        localStorage.removeItem("token");
                        PopupboxManager.close();
                    }}>
                OK
            </button>
        </div>
    </div>
};

const mapDispatchToProps = (dispatch) => {
    return {
        signOutUser: () => dispatch(signOutUser()),
    }
};

export default connect(null, mapDispatchToProps)(SignOut);
