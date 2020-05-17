import React, {Component} from 'react';
import {connect} from 'react-redux';
import toaster from 'toasted-notes';
import {registerFetch} from '../../store/actions/authActions';
import '../Utils/Form/Form.css';

const MIN_PASSWORD_LENGTH = 6;

class Registration extends Component {

    constructor(props) {
        super(props);
        this.state = {
            name: '',
            email: '',
            password: '',
            password_confirmation: ''
        };
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChange(e) {
        this.setState({[e.target.name]: e.target.value});
    };

    handleSubmit(e) {
        e.preventDefault();
        let password = this.state.password;
        let passwordConfirmation = this.state.password_confirmation;

        if (password.length < MIN_PASSWORD_LENGTH) {
            toaster.notify("Password must contain minimum 6 characters",
                {duration: 3000, position: "bottom"});
        } else if (password !== passwordConfirmation) {
            toaster.notify("Passwords don't match",
                {duration: 3000, position: "bottom"});
        } else {
            this.props.registerFetch(this.state)
        }
    };

    render() {
        return (
            <div className="divForm">
                <form className="form"
                      onSubmit={this.handleSubmit}>
                    <h3 className="formText">
                        Create your account
                    </h3>
                    <br/>
                    <input
                        type="name"
                        name="name"
                        placeholder="Name"
                        value={this.state.name}
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
                    <input
                        type="password"
                        name="password"
                        placeholder="Password"
                        value={this.state.password}
                        onChange={this.handleChange}
                        required
                    />
                    <input
                        type="password"
                        name="password_confirmation"
                        placeholder="Confirm Password"
                        value={this.state.password_confirmation}
                        onChange={this.handleChange}
                        required
                    />
                    <input type="submit"
                           className="formButton textFontStyle16"/>
                </form>
            </div>
        )
    }
}

const mapDispatchToProps = dispatch => ({
    registerFetch: userInfo => dispatch(registerFetch(userInfo))
});

export default connect(null, mapDispatchToProps)(Registration);
