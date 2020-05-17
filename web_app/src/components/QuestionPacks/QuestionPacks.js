import React, {Component} from 'react';
import {connect} from 'react-redux';
import LoaderSpinner from '../Utils/LoaderSpinner/LoaderSpinner';
import QuestionPack from './QuestionPack';
import './QuestionPacks.css';

class QuestionPacks extends Component {

    constructor(props) {
        super(props);
        this.state = {
            questionPacks: {},
            isLoading: true
        };
    }

    componentDidMount() {
        fetch('/api/v1/question_packs', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': this.props.token
            }
        }).then(response => response.json())
            .then(data => this.setState({questionPacks: data, isLoading: false}));
    }

    render() {
        const {questionPacks, isLoading} = this.state;

        if (isLoading) {
            return <div className="main center"><LoaderSpinner/></div>;
        }

        let questionPacksList = questionPacks.data.question_packs.map((pack, i) => {
            let divItemId = "id" + i;
            let divItemIdToggler = "#" + divItemId;

            return <QuestionPack keyItem={i}
                                 divItemId={divItemId}
                                 divItemIdToggler={divItemIdToggler}
                                 packId={pack.id}
                                 pack={pack}/>
        });

        return <div className="main">
            <div>
                <div className="questionPacksTableHead">
                    <div className="questionPackNumber"/>
                    <div className="questionPackEventName">
                        Event
                    </div>
                    <div className="questionPackDifficulty">
                        Difficulty
                    </div>
                    <div className="questionPackArrow"/>
                </div>
                {questionPacksList}
            </div>
        </div>
    }
}

const mapStateToProps = (state) => {
    return {
        token: state.token
    }
};

export default connect(mapStateToProps, null)(QuestionPacks);
