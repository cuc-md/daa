import React, {Component} from 'react';
import {connect} from 'react-redux';
import {registerFetch} from '../../../store/actions/authActions';

class Registration extends Component {

    constructor(props) {
        super(props);
        this.state = {
            email: "",
            password: "",
            passwordConfirmation: ""
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
        this.props.registerFetch(this.state)
    };

    render() {
        return (
            <div className="main">
                <form onSubmit={this.handleSubmit}>
                    <h1>Register</h1>

                    <label>Email</label>
                    <input
                        name='email'
                        placeholder='email'
                        value={this.state.email}
                        onChange={this.handleChange}
                    /><br/>

                    <label>Password</label>
                    <input
                        type='password'
                        name='password'
                        placeholder='Password'
                        value={this.state.password}
                        onChange={this.handleChange}
                    /><br/>

                    <label>Confirm Password</label>
                    <input
                        type='password'
                        name='password'
                        placeholder='Confirm Password'
                        value={this.state.passwordConfirmation}
                        onChange={this.handleChange}
                    /><br/>

                    <input type='submit'/>
                </form>
            </div>
        )
    }
}

const mapDispatchToProps = dispatch => ({
    registerFetch: userInfo => dispatch(registerFetch(userInfo))
});

export default connect(null, mapDispatchToProps)(Registration);
