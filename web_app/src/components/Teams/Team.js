import React, {Component} from 'react';
import {UncontrolledCollapse} from 'reactstrap';
import arrow_up from '../../assets/icons/base/arrow_up.svg';
import arrow_down from '../../assets/icons/base/arrow_down.svg';
import './Teams.css';
import editIcon from "../../assets/icons/base/edit.svg";
import deleteIcon from "../../assets/icons/base/delete.svg";

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
            <div className="divTeamsTableRow">
                <div className="teamNumber">
                    {this.props.teamNumber}
                </div>
                <div className="teamName">
                    {this.props.teamName}
                </div>
                <div className="teamEdit">
                    <img src={editIcon}
                         className="teamIcon" alt=""
                         onClick={() => console.log("edit team")}/>
                </div>
                <div className="teamDelete">
                    <img src={deleteIcon}
                         className="teamIcon" alt=""
                         onClick={() => console.log("delete team")}/>
                </div>
                <div className="teamArrow">
                    <img src={this.getArrowForChallenge(isOpen)}
                         className="teamIcon" alt=""
                         onClick={this.changeCollapseState}
                         id={this.props.divItemId}/>
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
