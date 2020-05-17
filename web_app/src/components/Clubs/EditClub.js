import React, {Component} from 'react';
import toaster from 'toasted-notes';
import DatePicker from "react-datepicker";
import {PopupboxManager} from 'react-popupbox';
import 'react-datepicker/dist/react-datepicker.css';
import '../Utils/Toaster/Toaster.css';
import '../Utils/Form/Form.css';

class EditClub extends Component {

    constructor(props) {
        super(props);
        this.state = {
            name: this.props.club.name,
            city: this.props.club.city,
            founded_on: new Date(this.props.club.founded_on),
            description: this.props.club.description,
            representative: this.props.club.contacts.representative,
            phone: this.props.club.contacts.phone,
            email: this.props.club.contacts.email,
        };
        this.handleChange = this.handleChange.bind(this);
        this.handleDateChange = this.handleDateChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChange(e) {
        this.setState({[e.target.name]: e.target.value});
    };

    handleDateChange(date) {
        this.setState({founded_on: date});
    };

    handleSubmit(e) {
        e.preventDefault();
        fetch('/api/v1/clubs/' + this.props.clubId, {
            method: 'PUT',
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
                toaster.notify("Club was successfully edited", {
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
            <form className="form"
                  onSubmit={this.handleSubmit}>
                <h3 className="formText">
                    Edit club
                </h3>
                <br/>
                <input
                    type="name"
                    name="name"
                    placeholder="Club name"
                    value={this.state.name}
                    onChange={this.handleChange}
                    required
                />
                <input
                    type="name"
                    name="city"
                    placeholder="City"
                    value={this.state.city}
                    onChange={this.handleChange}
                    required
                />
                <DatePicker
                    selected={this.state.founded_on}
                    onChange={this.handleDateChange}
                    className="inputDatepicker"
                    placeholderText="Founded on"
                    dateFormat="yyyy-MM-dd"
                    required={true}
                />
                <input
                    type="name"
                    name="description"
                    placeholder="Description"
                    value={this.state.description}
                    onChange={this.handleChange}
                    required
                />
                <input
                    type="name"
                    name="representative"
                    placeholder="Representative"
                    value={this.state.representative}
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
                <input
                    type="email"
                    name="email"
                    placeholder="Email"
                    value={this.state.email}
                    onChange={this.handleChange}
                    required
                />
                <input type='submit'
                       className="formButton textFontStyle16"/>
            </form>
        </div>
    }
}

export default EditClub;
