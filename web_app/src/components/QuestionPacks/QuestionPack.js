import React, {Component} from 'react';
import {Image} from 'react-bootstrap';
import {UncontrolledCollapse} from 'reactstrap';
import LoaderSpinner from '../Utils/LoaderSpinner/LoaderSpinner';
import arrow_up from '../../assets/icons/base/arrow_up.svg';
import arrow_down from '../../assets/icons/base/arrow_down.svg';
import './QuestionPacks.css';

class QuestionPack extends Component {

    constructor(props) {
        super(props);
        this.state = {
            questionPack: {
                "data": {
                    "question_pack": {
                        "id": 1,
                        "author": "anonymous",
                        "event_name": "Super Cup",
                        "event_id": "12345",
                        "difficulty": "medium",
                        "user_id": "123"
                    }
                }
            },
            isLoading: true,
            isOpen: false
        };
        this.changeCollapseState = this.changeCollapseState.bind(this);
    }

    componentDidMount() {
        fetch('/api/v1/question_packs/' + this.props.packId, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            }
        }).then(response => response.json())
            .then(data => this.setState({results: data, isLoading: false}));
    }

    changeCollapseState() {
        this.setState({isOpen: !this.state.isOpen})
    }

    getArrow(isOpen) {
        return isOpen ? arrow_up : arrow_down;
    }

    render() {
        const {questionPack, isLoading, isOpen} = this.state;

        // if (isLoading) {
        //     return <div className="main center"><LoaderSpinner/></div>;
        // }

        return <div className="questionPacksTableRow" key={this.props.keyItem}>
            <div className="divQuestionPacksTableRow">
                <div className="questionPackNumber">
                    {this.props.keyItem + 1}
                </div>
                <div className="questionPackEventName">
                    {this.props.pack.event_name}
                </div>
                <div className="questionPackDifficulty">
                    {this.props.pack.difficulty}
                </div>
                <div className="questionPackArrow">
                    <img src={this.getArrow(isOpen)}
                         className="questionPackIcon" alt=""
                         onClick={this.changeCollapseState}
                         id={this.props.divItemId}/>
                </div>
            </div>

            <UncontrolledCollapse toggler={this.props.divItemIdToggler}>
                {/*{isLoading ?*/}
                {/*    <div className="center"><LoaderSpinner/></div> :*/}
                <div className="divQuestionPackDetails">
                    <div className="questionPacksTableHead">
                        <div className="questionPackNumber"/>
                        <div className="questionPackAuthor">
                            Author
                        </div>
                        <div className="questionPackEmpty"/>
                    </div>
                    <div className="questionPacksTableRow">
                        <div className="questionPackNumber"/>
                        <div className="questionPackAuthor">
                            {questionPack.data.question_pack.author}
                        </div>
                        <div className="questionPackEmpty"/>
                    </div>
                </div>
                {/*}*/}
            </UncontrolledCollapse>
        </div>
    }
}

export default QuestionPack;
