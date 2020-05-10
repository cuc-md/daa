import React, {Component} from 'react';
import {PopupboxManager} from 'react-popupbox';

class DeleteEvent extends Component {
    render() {
        return <div className="divForm">
            <h3 className="formText">Are you sure you want to delete {this.props.eventName}?</h3>
            <br/>
            <div className="center">
                <button className="choiceButton cancelButton textFontStyle16"
                        onClick={PopupboxManager.close}>
                    Cancel
                </button>
                <button className="choiceButton okButton textFontStyle16"
                        onClick={() => {
                            console.log("DELETE EVENT");
                            PopupboxManager.close();
                        }}>
                    OK
                </button>
            </div>
        </div>
    }
}

export default DeleteEvent;
