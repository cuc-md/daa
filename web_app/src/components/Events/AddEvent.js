import React, {Component} from 'react';
import toaster from 'toasted-notes';
import DatePicker from 'react-datepicker';
import {PopupboxManager} from 'react-popupbox';
import 'react-datepicker/dist/react-datepicker.css';
import '../Utils/Toaster/Toaster.css';
import '../Utils/Form/Form.css';

class AddEvent extends Component {

    constructor(props) {
        super(props);
        this.state = {
            name: '',
            long_name: '',
            description: '',
            cover_photo: '',
            start_date: null,
            end_date: null,
            status: '',
            fee: '',
            registration_end: null
        };
        this.handleChange = this.handleChange.bind(this);
        this.handleStartDateChange = this.handleStartDateChange.bind(this);
        this.handleEndDateChange = this.handleEndDateChange.bind(this);
        this.handleRegistrationEndDateChange = this.handleRegistrationEndDateChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChange(e) {
        this.setState({[e.target.name]: e.target.value});
    };

    handleStartDateChange(date) {
        this.setState({startDate: date});
    };

    handleEndDateChange(date) {
        this.setState({endDate: date});
    };

    handleRegistrationEndDateChange(date) {
        this.setState({registrationEnd: date});
    };

    handleSubmit(e) {
        e.preventDefault();
        fetch('/api/v1/events', {
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
                toaster.notify("Event was successfully added", {
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
                    Add Event
                </h3>
                <br/>
                <input
                    type="name"
                    name="name"
                    placeholder="Event name"
                    value={this.state.name}
                    onChange={this.handleChange}
                    required
                />
                <input
                    type="name"
                    name="longName"
                    placeholder="Event long name"
                    value={this.state.long_name}
                    onChange={this.handleChange}
                    required
                />
                <input
                    type="name"
                    name="description"
                    placeholder="Description"
                    value={this.state.description}
                    onChange={this.handleChange}
                    required
                />
                <label>
                    <input
                        type="file"
                        name="coverPhoto"
                        title="Cover photo"
                        accept="image/png, image/jpeg"
                        value={this.state.cover_photo}
                        onChange={this.handleChange}
                        required
                    />
                </label>
                <DatePicker
                    selected={this.state.start_date}
                    onChange={this.handleStartDateChange}
                    className="inputDatepicker"
                    placeholderText="Start date"
                    dateFormat="yyyy-MM-dd"
                    required={true}
                />
                <DatePicker
                    selected={this.state.end_date}
                    onChange={this.handleEndDateChange}
                    className="inputDatepicker"
                    placeholderText="End date"
                    dateFormat="yyyy-MM-dd"
                    required={true}
                />
                <input
                    type="name"
                    name="registrationStatus"
                    placeholder="Registration status"
                    value={this.state.status}
                    onChange={this.handleChange}
                    required
                />
                <input
                    type="name"
                    name="registrationFee"
                    placeholder="Registration fee"
                    value={this.state.fee}
                    onChange={this.handleChange}
                    required
                />
                <DatePicker
                    selected={this.state.registration_end}
                    onChange={this.handleRegistrationEndDateChange}
                    className="inputDatepicker"
                    placeholderText="Registration end date"
                    dateFormat="yyyy-MM-dd"
                    required={true}
                />
                <input type='submit'
                       className="formButton textFontStyle16"/>
            </form>
        </div>
    }
}

export default AddEvent;
