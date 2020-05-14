import React, {Component} from 'react';
import LoaderSpinner from '../Utils/LoaderSpinner/LoaderSpinner';
import QuestionPack from './QuestionPack';
import './QuestionPacks.css';

class QuestionPacks extends Component {

    constructor(props) {
        super(props);
        this.state = {
            questionPacks: {
                "data": {
                    "question_packs": [
                        {
                            "id": 1,
                            "event_name": "Super Cup",
                            "event_id": "12345",
                            "difficulty": "medium"
                        },
                        {
                            "id": 1,
                            "event_name": "Super Cup1",
                            "event_id": "12346",
                            "difficulty": "medium"
                        },
                        {
                            "id": 1,
                            "event_name": "Super Cup3",
                            "event_id": "12347",
                            "difficulty": "medium"
                        }
                    ]
                }
            },
            isLoading: true
        };
    }

    // componentDidMount() {
    //     fetch('/api/v1/question_packs', {
    //         method: 'GET',
    //         headers: {
    //             'Content-Type': 'application/json'
    //         }
    //     }).then(response => response.json())
    //         .then(data => this.setState({questionPacks: data, isLoading: false}));
    // }

    render() {
        const {questionPacks, isLoading} = this.state;

        // if (isLoading) {
        //     return <div className="main center"><LoaderSpinner/></div>;
        // }

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

export default QuestionPacks;
