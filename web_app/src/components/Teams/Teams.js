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
            teams: {},
            isLoading: true
        };
    }

    componentDidMount() {
        fetch('/api/v1/teams', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': this.props.token
            }
        }).then(response => {
            if (response.ok) {
                return response.json()
            } else {
                console.log("Response status " + response.status);
                return Promise.reject('Error')
            }
        })
            .then(data => this.setState({teams: data, isLoading: false}))
            .catch(error => console.log(error));
    }

    render() {
        const {teams, isLoading} = this.state;

        if (isLoading) {
            return <div className="main center"><LoaderSpinner/></div>;
        }

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
        token: state.token,
        user: state.user
    }
};

export default connect(mapStateToProps, null)(Teams);
