import React, {Component} from 'react';
import {connect} from 'react-redux';
import {signInFetch} from '../../store/actions/authActions';
import './Auth.css';

class SignIn extends Component {

    constructor(props) {
        super(props);
        this.state = {
            email: "",
            password: ""
        };
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChange(e) {
        this.setState({
            [e.target.name]: e.target.value
        });
    };

    handleSubmit(e) {
        e.preventDefault();
        this.props.signInFetch(this.state)
    };

    render() {
        return (
            <div className="divAccountForm">
                <form className="accountForm"
                      onSubmit={this.handleSubmit}>
                    <h3 className="accountText">
                        Sign in your account
                    </h3>
                    <br/>
                    <input
                        type="email"
                        name='email'
                        placeholder='Email'
                        value={this.state.email}
                        onChange={this.handleChange}
                        required
                    />
                    <input
                        type='password'
                        name='password'
                        placeholder='Password'
                        value={this.state.password}
                        onChange={this.handleChange}
                        required
                    />
                    <input type='submit'
                           className="accountButton textFontStyle16"/>
                </form>
            </div>
        )
    }
}

const mapDispatchToProps = dispatch => ({
    signInFetch: userInfo => dispatch(signInFetch(userInfo))
});

export default connect(null, mapDispatchToProps)(SignIn);
