import React, {Component} from 'react';
import {UncontrolledCollapse} from 'reactstrap';
import arrow_up from '../../assets/icons/base/arrow_up.svg';
import arrow_down from '../../assets/icons/base/arrow_down.svg';
import './Events.css';

class Event extends Component {

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

        return <div className="eventsTableRow" key={this.props.keyItem}>
            <div className="divEventsTableRow"
                 id={this.props.divItemId}
                 onClick={this.changeCollapseState}>
                <div className="eventNumber">
                    {this.props.eventNumber}
                </div>
                <div className="eventName">
                    {this.props.eventName}
                </div>
                <div className="eventDate">
                    {this.props.eventDate}
                </div>
                <div className="eventLocation">
                    {this.props.eventLocation}
                </div>
                <div className="eventArrow">
                    <img src={this.getArrowForChallenge(isOpen)}
                         className="eventArrowIcon" alt=""/>
                </div>
            </div>

            <UncontrolledCollapse toggler={this.props.divItemIdToggler}>
                <div className="divEventDetails">
                    Details
                </div>
            </UncontrolledCollapse>
        </div>
    }
}

export default Event;
