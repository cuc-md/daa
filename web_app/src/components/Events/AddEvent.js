import React, {Component} from 'react';
import DatePicker from 'react-datepicker';

class AddEvent extends Component {

    constructor(props) {
        super(props);
        this.state = {
            name: '',
            longName: '',
            description: '',
            coverPhoto: '',
            startDate: null,
            endDate: null,
            registrationStatus: '',
            registrationFee: '',
            registrationEnd: null
        };
        this.handleChange = this.handleChange.bind(this);
        this.handleStartDateChange = this.handleStartDateChange.bind(this);
        this.handleEndDateChange = this.handleEndDateChange.bind(this);
        this.handleRegistrationEndDateChange = this.handleRegistrationEndDateChange.bind(this);
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

    // handleSubmit(e) {
    //     e.preventDefault();
    //     this.props.signInFetch(this.state)
    // };

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
                    value={this.state.longName}
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
                        value={this.state.coverPhoto}
                        onChange={this.handleChange}
                        required
                    />
                </label>
                <DatePicker
                    selected={this.state.startDate}
                    onChange={this.handleStartDateChange}
                    className="inputDatepicker"
                    placeholderText="Start date"
                    dateFormat="yyyy-MM-dd"
                    required={true}
                />
                <DatePicker
                    selected={this.state.endDate}
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
                    value={this.state.registrationStatus}
                    onChange={this.handleChange}
                    required
                />
                <input
                    type="name"
                    name="registrationFee"
                    placeholder="Registration fee"
                    value={this.state.registrationFee}
                    onChange={this.handleChange}
                    required
                />
                <DatePicker
                    selected={this.state.registrationEnd}
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
