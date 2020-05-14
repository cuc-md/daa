import React, {Component} from 'react';
import {connect} from 'react-redux';
import {checkUserManageEventsRole} from '../Utils/Helpers/UserHelper';
import LoaderSpinner from '../Utils/LoaderSpinner/LoaderSpinner';
import {openAddTeamPopUpBox} from '../Utils/PopUpBox/PopUpBox';
import Team from './Team';
import './Teams.css';

class Teams extends Component {

    constructor(props) {
        super(props);
        this.state = {
            teams: {
                "data": {
                    "teams": [
                        {
                            "id": 123,
                            "name": "Echipa Racheta"
                        },
                        {
                            "id": 124,
                            "name": "Echipa Racheta 1"
                        },
                        {
                            "id": 125,
                            "name": "Echipa Racheta 2"
                        }
                    ]
                }
            },
            isLoading: true
        };
    }

    // componentDidMount() {
    //     fetch('/api/v1/teams', {
    //         method: 'GET',
    //         headers: {
    //             'Content-Type': 'application/json'
    //         }
    //     })
    //         .then(response => response.json())
    //         .then(data => this.setState({teams: data, isLoading: false}))
    // }

    render() {
        const {teams, isLoading} = this.state;

        // if (isLoading) {
        //     return <div className="main center"><LoaderSpinner/></div>;
        // }

        let teamsList = teams.data.teams.map((team, i) => {
            let divItemId = "id" + i;
            let divItemIdToggler = "#" + divItemId;

            return <Team keyItem={i}
                         divItemId={divItemId}
                         divItemIdToggler={divItemIdToggler}
                         teamId={team.id}
                         team={team}/>
        });

        return <div className="main">
            {(JSON.stringify(this.props.user) !== '{}' &&
                checkUserManageEventsRole(this.props.user.roles)) ?
                <div className="divAddTeams">
                    <button className="choiceButton choiceButtonStatic okButton textFontStyle16"
                            onClick={() => openAddTeamPopUpBox()}>
                        + Add Team
                    </button>
                </div> : null
            }
            <div>
                <div className="teamsTableHead">
                    <div className="teamNumber"/>
                    <div className="teamName">
                        Team
                    </div>
                    <div className="teamEdit"/>
                    <div className="teamDelete"/>
                    <div className="teamArrow"/>
                </div>
                {teamsList}
            </div>
        </div>
    }
}

const mapStateToProps = (state) => {
    return {
        user: state.user
    }
};

export default connect(mapStateToProps, null)(Teams);
