import React, {Component} from 'react';
import {PopupboxManager} from 'react-popupbox';
import toaster from 'toasted-notes';

class DeleteTeam extends Component {

    deleteTeam() {
        fetch('/api/v1/teams/' + this.props.teamId, {
            method: 'DELETE'
        }).then(response => {
            if (!response.ok) {
                toaster.notify("Error", {
                    duration: 3000,
                    position: "bottom"
                });
            } else {
                toaster.notify("Team was successfully deleted", {
                    duration: 3000,
                    position: "bottom"
                });
                PopupboxManager.close();
                return response.json();
            }
        })
    };

    render() {
        return <div className="divForm">
            <h3 className="formText">Are you sure you want to delete {this.props.teamName}?</h3>
            <br/>
            <div className="center">
                <button className="choiceButton cancelButton textFontStyle16"
                        onClick={PopupboxManager.close}>
                    Cancel
                </button>
                <button className="choiceButton okButton textFontStyle16"
                        onClick={() => {
                            this.deleteTeam();
                            PopupboxManager.close();
                        }}>
                    OK
                </button>
            </div>
        </div>
    }
}

export default DeleteTeam;
