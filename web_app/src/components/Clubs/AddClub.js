import React, {Component} from 'react';
import '../Utils/Form/Form.css';

class AddClub extends Component {

    constructor(props) {
        super(props);
        this.state = {
            name: '',
            city: '',
            foundedOn: '',
            description: '',
            representative: '',
            phone: '',
            email: ''
        };
    }

    handleChange(e) {
        this.setState({
            [e.target.name]: e.target.value
        });
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
                    Add club
                </h3>
                <br/>
                <input
                    type="name"
                    name='name'
                    placeholder='Club name'
                    value={this.state.name}
                    onChange={this.handleChange}
                    required
                />
                <input
                    type="name"
                    name='city'
                    placeholder='City'
                    value={this.state.city}
                    onChange={this.handleChange}
                    required
                />
                {/*TODO add datepicker*/}
                <input
                    type='name'
                    name='foundedOn'
                    placeholder='Founded on'
                    value={this.state.foundedOn}
                    onChange={this.handleChange}
                    required
                />
                <input
                    type='name'
                    name='description'
                    placeholder='Description'
                    value={this.state.description}
                    onChange={this.handleChange}
                    required
                />
                <input
                    type='name'
                    name='representative'
                    placeholder='Representative'
                    value={this.state.representative}
                    onChange={this.handleChange}
                    required
                />
                {/*TODO check phone*/}
                <input
                    type='name'
                    name='phone'
                    placeholder='Phone'
                    value={this.state.phone}
                    onChange={this.handleChange}
                    required
                />
                <input
                    type='email'
                    name='email'
                    placeholder='Email'
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

export default AddClub;
