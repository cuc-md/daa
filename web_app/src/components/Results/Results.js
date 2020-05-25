import React, {Component} from 'react';
import {connect} from 'react-redux';
import toaster from 'toasted-notes';
import LoaderSpinner from '../Utils/LoaderSpinner/LoaderSpinner';
import {checkUserManageEventsRole} from '../Utils/Helpers/UserHelper';
import Result from './Result';
import './Results.css';

class Results extends Component {

    constructor(props) {
        super(props);
        this.state = {
            results: {
                "data": {
                    "event_name": "Super Cup",
                    "result": [
                        {
                            "team_name": "team1",
                            "total_score": 3,
                            "score": [
                                {"round": 1, "count": 0, "score": [0, 0, 0, 0, 0, 0, 0, 0, 0, 0]},
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
    //             'Content-Type': 'application/json',
    //             'Authorization': this.props.token
    //         }
    //     }).then(response => {
    //         if (response.ok) {
    //             return response.json()
    //         } else {
    //             console.log("Response status " + response.status);
    //             return Promise.reject('Error')
    //         }
    //     })
    //         .then(data => this.setState({results: data, isLoading: false}))
    //         .catch(error => console.log(error));
    // }

    async downloadResultsFile() {
        let response = await fetch('/api/v1/results/sample', {
            method: 'GET'
        });
        response.blob().then(blob => {
            let url = window.URL.createObjectURL(blob);
            let a = document.createElement('a');
            a.href = url;
            a.download = 'sample_form.xlsx';
            a.click();
        });
    }

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
            {(JSON.stringify(this.props.user) !== '{}' &&
                checkUserManageEventsRole(this.props.user.roles)) ?
                <div className="divDownloadResultsFile">
                    <button className="choiceButton choiceButtonStatic okButton textFontStyle16"
                            onClick={this.downloadResultsFile}>
                        ↓ file for results
                    </button>

                </div> : null
            }
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

const mapStateToProps = (state) => {
    return {
        token: state.token,
        user: state.user
    }
};

export default connect(mapStateToProps, null)(Results);
