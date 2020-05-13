import React, {Component} from 'react';
import LoaderSpinner from '../Utils/LoaderSpinner/LoaderSpinner';
import Result from './Result';
import './Results.css';

class Results extends Component {

    constructor(props) {
        super(props);
        this.state = {
            results: {
                "data": {
                    "result": [
                        {
                            "team_name": "team1",
                            "total_score": 3,
                            "score": [
                                {"round": 1, "count": 0, "score": [0, 0, 0, 0, 0, 0, 0, 0, 0, 0]},
                                {"round": 2, "count": 3, "score": [0, 1, 0, 0, 0, 0, 0, 1, 0, 1]}
                            ]
                        },
                        {
                            "team_name": "team2",
                            "total_score": 4,
                            "score": [
                                {"round": 1, "count": 1, "score": [0, 0, 0, 0, 1, 0, 0, 0, 0, 0]},
                                {"round": 2, "count": 3, "score": [0, 1, 0, 0, 0, 0, 0, 1, 0, 1]}
                            ]
                        },
                        {
                            "team_name": "team3",
                            "total_score": 5,
                            "score": [
                                {"round": 1, "count": 2, "score": [0, 0, 1, 0, 0, 0, 0, 0, 1, 0]},
                                {"round": 2, "count": 3, "score": [0, 1, 0, 0, 0, 0, 0, 1, 0, 1]}
                            ]
                        }
                    ]
                }
            },
            isLoading: true
        };
    }

    // componentDidMount() {
    //     fetch('/api/v1/results/' + this.props.match.params.eventId + '/details', {
    //         method: 'GET',
    //         headers: {
    //             'Content-Type': 'application/json'
    //         }
    //     }).then(response => response.json())
    //         .then(data => this.setState({results: data, isLoading: false}));
    // }

    render() {
        const {results, isLoading} = this.state;

        // if (isLoading) {
        //     return <div className="main center"><LoaderSpinner/></div>;
        // }

        let resultsList = results.data.result.map((result, i) => {
            let divItemId = "id" + i;
            let divItemIdToggler = "#" + divItemId;

            return <Result keyItem={i}
                           divItemId={divItemId}
                           divItemIdToggler={divItemIdToggler}
                           eventId={this.props.match.params.eventId}
                           result={result}/>
        });

        let maxTableCellEmptyWidth = 64;
        let resultsRoundNumber = 0;
        let resultsRoundHead = results.data.result[0].score.map(score => {
            resultsRoundNumber++;
            return <div className="resultRound center">
                Round {score.round}
            </div>
        });

        return <div className="main">
            <div className="divResultEventName textFontStyle18 center">
                Results of {this.props.location.state.eventName}
            </div>
            <div>
                <div className="resultsTableHead">
                    <div className="resultNumber"/>
                    <div className="resultTeam">
                        Team
                    </div>
                    <div className="resultTotalScore center">
                        Total Score
                    </div>
                    {resultsRoundHead}
                    <div className="resultEmpty"
                         style={{width: (maxTableCellEmptyWidth - (8 * resultsRoundNumber)) + "%"}}/>
                    <div className="resultArrow"/>
                </div>
                {resultsList}
            </div>
        </div>
    }
}

export default Results;
