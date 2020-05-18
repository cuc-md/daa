import React, {Component} from 'react';
import {connect} from 'react-redux';
import {PopupboxManager} from 'react-popupbox';
import toaster from 'toasted-notes';

class DeleteClub extends Component {

    deleteClub() {
        fetch('/api/v1/clubs/' + this.props.clubId, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': this.props.token
            },
        }).then(response => {
            if (!response.ok) {
                toaster.notify("Error", {
                    duration: 3000,
                    position: "bottom"
                });
            } else {
                toaster.notify("Club was successfully deleted", {
                    duration: 3000,
                    position: "bottom"
                });
                window.location = "/clubs";
                PopupboxManager.close();
                return response.json();
            }
        })
    };

    render() {
        return <div className="divForm">
            <h3 className="formText">Are you sure you want to delete {this.props.clubName}?</h3>
            <br/>
            <div className="center">
                <button className="choiceButton cancelButton textFontStyle16"
                        onClick={PopupboxManager.close}>
                    Cancel
                </button>
                <button className="choiceButton okButton textFontStyle16"
                        onClick={() => {
                            this.deleteClub();
                            PopupboxManager.close();
                        }}>
                    OK
                </button>
            </div>
        </div>
    }
}

const mapStateToProps = (state) => {
    return {
        token: state.token
    }
};

export default connect(mapStateToProps, null)(DeleteClub);
