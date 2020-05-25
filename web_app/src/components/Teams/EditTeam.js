import React, {Component} from 'react';
import {connect} from 'react-redux';
import toaster from 'toasted-notes';
import {PopupboxManager} from 'react-popupbox';
import '../Utils/Toaster/Toaster.css';
import '../Utils/Form/Form.css';

class EditTeam extends Component {

    constructor(props) {
        super(props);
        this.state = {
            name: this.props.team.name,
            captain: this.props.team.captain,
            phone: this.props.team.phone,
        };
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChange(e) {
        this.setState({[e.target.name]: e.target.value});
    };

    handleSubmit(e) {
        e.preventDefault();
        fetch('/api/v1/teams/' + this.props.teamId, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': this.props.token
            },
            body: JSON.stringify(this.state)
        }).then(response => {
            if (!response.ok) {
                toaster.notify("Error", {
                    duration: 3000,
                    position: "bottom"
                });
            } else {
                toaster.notify("Team was successfully edited", {
                    duration: 3000,
                    position: "bottom"
                });
                window.location = "/teams";
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
                    Edit team
                </h3>
                <br/>
                <input
                    type="name"
                    name="name"
                    placeholder="Team name"
                    value={this.state.name}
                    onChange={this.handleChange}
                    required
                />
                <input
                    type="name"
                    name="captain"
                    placeholder="Captain"
                    value={this.state.captain}
                    onChange={this.handleChange}
                    required
                />
                <input
                    type="tel"
                    name="phone"
                    placeholder="Phone"
                    pattern="^\+?\d{0,13}"
                    value={this.state.phone}
                    onChange={this.handleChange}
                    required
                />
                <input type='submit'
                       className="formButton textFontStyle16"/>
            </form>
        </div>
    }
}

const mapStateToProps = (state) => {
    return {
        token: state.token
    }
};

export default connect(mapStateToProps, null)(EditTeam);
