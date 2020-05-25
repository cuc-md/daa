import React, {Component} from 'react';
import {connect} from 'react-redux';
import toaster from 'toasted-notes';
import DatePicker from "react-datepicker";
import {PopupboxManager} from 'react-popupbox';
import 'react-datepicker/dist/react-datepicker.css';
import '../Utils/Toaster/Toaster.css';
import '../Utils/Form/Form.css';

class AddClub extends Component {

    constructor(props) {
        super(props);
        this.state = {
            name: '',
            city: '',
            founded_on: null,
            description: '',
            representative: '',
            phone: '',
            email: '',
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
        fetch('/api/v1/clubs', {
            method: 'POST',
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
                toaster.notify("Club was successfully added", {
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
            <form className="form"
                  onSubmit={this.handleSubmit}>
                <h3 className="formText">
                    Add club
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

const mapStateToProps = (state) => {
    return {
        token: state.token
    }
};

export default connect(mapStateToProps, null)(AddClub);
