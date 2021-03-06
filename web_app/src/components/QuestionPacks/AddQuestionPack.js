import React, {Component} from 'react';
import {connect} from 'react-redux';
import toaster from 'toasted-notes';
import {PopupboxManager} from 'react-popupbox';
import '../Utils/Toaster/Toaster.css';
import '../Utils/Form/Form.css';

class AddQuestionPack extends Component {

    constructor(props) {
        super(props);
        this.state = {
            author: '',
            pack: null,
            event_name: '',
            event_id: 123,
            difficulty: ''
        };
        this.handleChange = this.handleChange.bind(this);
        this.handleFileChange = this.handleFileChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChange(e) {
        this.setState({[e.target.name]: e.target.value});
    };

    handleFileChange(e) {
        this.setState({[e.target.name]: e.target.files[0]});
    };

    async handleSubmit(e) {
        e.preventDefault();
        //TODO check upload file && fix eventName, eventId
        let fileReader = new FileReader();
        fileReader.readAsDataURL(this.state.pack);
        const toBase64 = file => new Promise((resolve, reject) => {
            const reader = new FileReader();
            reader.readAsDataURL(file);
            reader.onload = () => resolve(reader.result);
            reader.onerror = error => reject(error);
        });

        fetch('/api/v1/question_packs', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': this.props.token
            },
            body: JSON.stringify({
                author: "anonymous",
                blob: await toBase64(this.state.pack),
                event_name: this.state.event_name,
                event_id: this.state.event_id,
                difficulty: this.state.difficulty,
            })
        }).then(response => {
            if (!response.ok) {
                toaster.notify("Error", {
                    duration: 3000,
                    position: "bottom"
                });
            } else {
                toaster.notify("Question pack was successfully added", {
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
                    Add Question Pack
                </h3>
                <br/>
                <input
                    type="name"
                    name="author"
                    placeholder="Author"
                    value={this.state.author}
                    onChange={this.handleChange}
                    required
                />
                <label>
                    <input
                        type="file"
                        name="pack"
                        title="Question pack"
                        accept=".doc,.pdf"
                        onChange={this.handleFileChange}
                        required
                    />
                </label>
                <input
                    type="name"
                    name="event_name"
                    placeholder="Event"
                    value={this.state.event_name}
                    onChange={this.handleChange}
                    required
                />
                <input
                    type="name"
                    name="difficulty"
                    placeholder="Difficulty"
                    value={this.state.difficulty}
                    onChange={this.handleChange}
                    required
                />
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

export default connect(mapStateToProps, null)(AddQuestionPack);
