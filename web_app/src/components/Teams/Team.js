import React, {Component} from 'react';
import {UncontrolledCollapse} from 'reactstrap';
import arrow_up from '../../assets/icons/base/arrow_up.svg';
import arrow_down from '../../assets/icons/base/arrow_down.svg';
import './Teams.css';

class Team extends Component {

    constructor(props) {
        super(props);
        this.state = {
            isOpen: false
        };
        this.changeCollapseState = this.changeCollapseState.bind(this);
    }

    changeCollapseState() {
        this.setState({isOpen: !this.state.isOpen})
    }

    getArrowForChallenge(isOpen) {
        return isOpen ? arrow_up : arrow_down;
    }

    render() {
        const {isOpen} = this.state;

        return <div className="teamsTableRow" key={this.props.keyItem}>
            <div className="divTeamsTableRow"
                 id={this.props.divItemId}
                 onClick={this.changeCollapseState}>
                <div className="teamNumber">
                    {this.props.teamNumber}
                </div>
                <div className="teamName">
                    {this.props.teamName}
                </div>
                <div className="teamArrow">
                    <img src={this.getArrowForChallenge(isOpen)}
                         className="teamArrowIcon" alt=""/>
                </div>
            </div>

            <UncontrolledCollapse toggler={this.props.divItemIdToggler}>
                <div className="divTeamDetails">
                    Details
                </div>
            </UncontrolledCollapse>
        </div>
    }
}

export default Team;
