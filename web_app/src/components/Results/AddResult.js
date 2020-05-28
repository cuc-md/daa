import React, {Component} from 'react';
import {connect} from 'react-redux';
import toaster from 'toasted-notes';
import {PopupboxManager} from 'react-popupbox';
import '../Utils/Toaster/Toaster.css';
import '../Utils/Form/Form.css';

class AddResult extends Component {

    constructor(props) {
        super(props);
        this.state = {
            results: null,
        };
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChange(e) {
        this.setState({[e.target.name]: e.target.files[0]});
    };

    async handleSubmit(e) {
        e.preventDefault();

        let fileReader = new FileReader();
        fileReader.readAsDataURL(this.state.results);
        const toBase64 = file => new Promise((resolve, reject) => {
            const reader = new FileReader();
            reader.readAsDataURL(file);
            reader.onload = () => resolve(reader.result);
            reader.onerror = error => reject(error);
        });

        fetch('/api/v1/results', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': this.props.token
            },
            body: JSON.stringify({
                blob: await toBase64(this.state.results),
                event_name: this.props.eventName,
                event_id: this.props.eventId,
                user_id: this.props.userId
            })
        }).then(response => {
            if (!response.ok) {
                toaster.notify("Error", {
                    duration: 3000,
                    position: "bottom"
                });
            } else {
                toaster.notify("Results were successfully added", {
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
                    Add Results
                </h3>
                <br/>
                <label>
                    <input
                        type="file"
                        name="results"
                        title="Results file"
                        accept=".xlsx"
                        onChange={this.handleChange}
                        required
                    />
                </label>
                <input type='submit' className="formButton textFontStyle16"/>
            </form>
        </div>
    }
}

const mapStateToProps = (state) => {
    return {
        token: state.token,
    }
};

export default connect(mapStateToProps, null)(AddResult);
