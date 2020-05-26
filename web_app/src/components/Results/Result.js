import React, {Component} from 'react';
import {connect} from 'react-redux';
import {UncontrolledCollapse} from 'reactstrap';
import {checkUserManageEventsRole} from '../Utils/Helpers/UserHelper';
import {openDeleteResultPopUpBox} from '../Utils/PopUpBox/PopUpBox';
import arrow_up from '../../assets/icons/base/arrow_up.svg';
import arrow_down from '../../assets/icons/base/arrow_down.svg';
import deleteIcon from '../../assets/icons/base/delete.svg';
import './Results.css';

class Result extends Component {

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

    getArrow(isOpen) {
        return isOpen ? arrow_up : arrow_down;
    }

    render() {
        const {isOpen} = this.state;

        let maxTableCellEmptyWidth = 64;
        let resultsRoundNumber = 0;
        let resultsRoundCount = this.props.result.score.map(score => {
            resultsRoundNumber++;
            return <div className="resultRound center">
                {score.count}
            </div>
        });

        let resultsDescription = this.props.result.score.map(score => {
            return <div className="resultsDescriptionTableRow">
                <div className="eventNumber"/>
                <div className="eventRoundNumber">
                    Round {score.round}
                </div>
                {score.score.map(scorePoint => {
                    if (scorePoint === 0) {
                        return <div className="eventScorePoint center">
                            {scorePoint}
                        </div>
                    } else {
                        return <div className="eventScorePoint blue center">
                            {scorePoint}
                        </div>
                    }
                })}
            </div>
        });

        return <div className="resultsTableRow" key={this.props.keyItem}>
            <div className="divResultsTableRow">
                <div className="resultNumber">
                    {this.props.keyItem + 1}
                </div>
                <div className="resultTeam">
                    {this.props.result.team_name}
                </div>
                <div className="resultTotalScore center">
                    {this.props.result.total_score}
                </div>
                {resultsRoundCount}
                <div className="resultEmpty"
                     style={{width: (maxTableCellEmptyWidth - (8 * resultsRoundNumber)) + "%"}}/>
                {(JSON.stringify(this.props.user) !== '{}' &&
                    checkUserManageEventsRole(this.props.user.roles)) ?
                    <div className="resultDelete">
                        <img src={deleteIcon}
                             className="resultIcon" alt=""
                             title="delete"
                             onClick={() => openDeleteResultPopUpBox(this.props.eventId)}/>
                    </div> :
                    <div className="resultDelete"/>
                }
                <div className="resultArrow">
                    <img src={this.getArrow(isOpen)}
                         className="resultIcon" alt=""
                         onClick={this.changeCollapseState}
                         id={this.props.divItemId}/>
                </div>
            </div>

            <UncontrolledCollapse toggler={this.props.divItemIdToggler}>
                <div className="divResultDetails">
                    {resultsDescription}
                </div>
            </UncontrolledCollapse>
        </div>
    }
}

const mapStateToProps = (state) => {
    return {
        user: state.user
    }
};

export default connect(mapStateToProps, null)(Result);
