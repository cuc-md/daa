import React, {Component} from 'react';
import {connect} from 'react-redux';
import {signInFetch} from '../../../store/actions/authActions';

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
            <div className="main">
                <form onSubmit={this.handleSubmit}>
                    <h1>Sign in</h1>

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

                    <input type='submit'/>
                </form>
            </div>
        )
    }
}

const mapDispatchToProps = dispatch => ({
    signInFetch: userInfo => dispatch(signInFetch(userInfo))
});

export default connect(null, mapDispatchToProps)(SignIn);
