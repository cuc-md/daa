import React, {Component} from 'react';
import '../Utils/Form/Form.css';

class AddTeam extends Component {

    constructor(props) {
        super(props);
        this.state = {
            name: '',
            captain: '',
            phone: '',
        };
    }

    handleChange(e) {
        this.setState({
            [e.target.name]: e.target.value
        });
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
                    name='name'
                    placeholder='Team name'
                    value={this.state.name}
                    onChange={this.handleChange}
                    required
                />
                <input
                    type="name"
                    name='captain'
                    placeholder='Captain'
                    value={this.state.captain}
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
                <input type='submit'
                       className="formButton textFontStyle16"/>
            </form>
        </div>
    }
}

export default AddTeam;
