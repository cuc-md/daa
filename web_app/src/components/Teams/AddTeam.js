import React, {Component} from 'react';
import toaster from 'toasted-notes';
import {PopupboxManager} from 'react-popupbox';
import '../Utils/Toaster/Toaster.css';
import '../Utils/Form/Form.css';

class AddTeam extends Component {

    constructor(props) {
        super(props);
        this.state = {
            name: '',
            captain: '',
            phone: '',
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
        fetch('/api/v1/teams', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(this.state)
        }).then(response => {
            if (!response.ok) {
                toaster.notify("Error", {
                    duration: 3000,
                    position: "bottom"
                });
            } else {
                toaster.notify("Team was successfully added", {
                    duration: 3000,
                    position: "bottom"
                });
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
                    Add team
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

export default AddTeam;
