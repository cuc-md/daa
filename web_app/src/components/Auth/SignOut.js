import React from 'react';
import {connect} from 'react-redux';
import {PopupboxManager} from 'react-popupbox';
import {signOutUser} from '../../store/actions/authActions';

const SignOut = (props) => {
    return <div>
        <p className="center textFontStyle18">Are you sure you want to sign out?</p>
        <div className="center">
            <button className="choiceButton cancelButton textFontStyle16"
                    onClick={PopupboxManager.close}>
                Cancel
            </button>
            <button className="choiceButton okButton textFontStyle16"
                    onClick={() => {
                        props.signOutUser();
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
