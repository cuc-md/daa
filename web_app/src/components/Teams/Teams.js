import React, {Component} from 'react';
import Team from './Team';
import './Teams.css';

class Teams extends Component {

    constructor(props) {
        super(props);
        this.state = {
            isLoading: true
        };
    }

    render() {
        return <div className="main">
            <div>
                <div className="teamsTableHead">
                    <div className="teamNumber"/>
                    <div className="teamName">
                        Team
                    </div>
                    <div className="teamArrow"/>
                </div>
                <Team keyItem={1}
                      divItemId="id1"
                      divItemIdToggler="#id1"
                      teamNumber={1}
                      teamName="Team1"/>
                <Team keyItem={2}
                      divItemId="id2"
                      divItemIdToggler="#id2"
                      teamNumber={2}
                      teamName="Team2"/>
                <Team keyItem={3}
                      divItemId="id3"
                      divItemIdToggler="#id3"
                      teamNumber={3}
                      teamName="Team3"/>
            </div>
        </div>
    }
}

export default Teams;
