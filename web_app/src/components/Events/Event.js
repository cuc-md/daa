import React, {Component} from 'react';
import {UncontrolledCollapse} from 'reactstrap';
import {openDeleteEventPopUpBox} from '../Utils/PopUpBox/PopUpBox';
import arrow_up from '../../assets/icons/base/arrow_up.svg';
import arrow_down from '../../assets/icons/base/arrow_down.svg';
import editIcon from '../../assets/icons/base/edit.svg';
import deleteIcon from '../../assets/icons/base/delete.svg';
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
            <div className="divEventsTableRow">
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
                <div className="eventEdit">
                    <img src={editIcon}
                         className="eventIcon" alt=""
                         onClick={() => console.log("edit event")}/>
                </div>
                <div className="eventDelete">
                    <img src={deleteIcon}
                         className="eventIcon" alt=""
                         onClick={() => openDeleteEventPopUpBox(this.props.eventId)}/>
                </div>
                <div className="eventArrow">
                    <img src={this.getArrowForChallenge(isOpen)}
                         className="eventIcon" alt=""
                         onClick={this.changeCollapseState}
                         id={this.props.divItemId}/>
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
