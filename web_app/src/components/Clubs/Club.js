import React, {Component} from 'react';
import {UncontrolledCollapse} from 'reactstrap';
import arrow_up from '../../assets/icons/base/arrow_up.svg';
import arrow_down from '../../assets/icons/base/arrow_down.svg';
import './Clubs.css';

class Club extends Component {

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

        return <div className="clubsTableRow" key={this.props.keyItem}>
            <div className="divClubsTableRow"
                 id={this.props.divItemId}
                 onClick={this.changeCollapseState}>
                <div className="clubNumber">
                    {this.props.clubNumber}
                </div>
                <div className="clubName">
                    {this.props.clubName}
                </div>
                <div className="clubArrow">
                    <img src={this.getArrowForChallenge(isOpen)}
                         className="clubArrowIcon" alt=""/>
                </div>
            </div>

            <UncontrolledCollapse toggler={this.props.divItemIdToggler}>
                <div className="divClubDetails">
                    Details
                </div>
            </UncontrolledCollapse>
        </div>
    }
}

export default Club;
