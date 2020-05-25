import React, {Component} from 'react';
import {connect} from 'react-redux';
import {Link} from 'react-router-dom';
import {Image} from 'react-bootstrap';
import {UncontrolledCollapse} from 'reactstrap';
import {checkUserManageEventsRole} from '../Utils/Helpers/UserHelper';
import {
    openEditEventPopUpBox,
    openDeleteEventPopUpBox,
    openRegisterTeamForEventPopUpBox
} from '../Utils/PopUpBox/PopUpBox';
import LoaderSpinner from '../Utils/LoaderSpinner/LoaderSpinner';
import event_default from '../../assets/icons/default/event_default.svg';
import arrow_up from '../../assets/icons/base/arrow_up.svg';
import arrow_down from '../../assets/icons/base/arrow_down.svg';
import editIcon from '../../assets/icons/base/edit.svg';
import deleteIcon from '../../assets/icons/base/delete.svg';
import resultsIcon from '../../assets/icons/sidebar/results.svg';
import team_register from '../../assets/icons/base/team_register.svg';
import './Events.css';

class Event extends Component {

    constructor(props) {
        super(props);
        this.state = {
            eventDetails: {
                "data": {
                    "event": {
                        "id": 123,
                        "name": "World championship",
                        "long_name": "World championship 2020",
                        "description": "description",
                        "cover_photo": "/api/v1/photos/1234",
                        "dates": {
                            "start_date": "2010-01-01 10:00",
                            "end_date": "2010-01-01 15:00"
                        },
                        "registration": {
                            "status": "open",
                            "fee": "10 MDL/person",
                            "registation_end": "2010-01-01 09:00"
                        },
                        "teams": [
                            {
                                "id": 456,
                                "name": "Echipa Racheta"
                            }
                        ]
                    }
                }
            },
            isLoading: true,
            isOpen: false
        };
        this.changeCollapseState = this.changeCollapseState.bind(this);
        // this.onEntering = this.onEntering.bind(this);
    }

    // onEntering() {
    //     fetch('/api/v1/events/' + this.props.eventId, {
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
    //         .then(data => this.setState({eventDetails: data, isLoading: false}))
    //         .catch(error => console.log(error));
    // }

    changeCollapseState() {
        this.setState({isOpen: !this.state.isOpen})
    }

    getArrow(isOpen) {
        return isOpen ? arrow_up : arrow_down;
    }

    render() {
        const {eventDetails, isLoading, isOpen} = this.state;

        let eventTeamsList = "";
        eventDetails.data.event.teams.map(team => {
            return eventTeamsList += team.name + ", ";
        });
        eventTeamsList = eventTeamsList.substring(0, eventTeamsList.length - 2);

        return <div className="eventsTableRow" key={this.props.keyItem}>
            <div className="divEventsTableRow">
                <div className="eventNumber">
                    {this.props.keyItem + 1}
                </div>
                <div className="eventName">
                    {/*{this.props.event.cover_photo}*/}
                    <Image src={event_default}
                           className="eventCoverPhoto" alt=""
                           rounded/>
                    {this.props.event.long_name}
                </div>
                <div className="eventDate">
                    {this.props.event.dates.start_date}
                </div>
                <div className="eventDate">
                    {this.props.event.dates.end_date}
                </div>
                <div className="eventRegistration">
                    {this.props.event.registration.status}
                </div>
                {this.props.token === null ?
                    <div className="eventTeamRegister"/> :
                    <div className="eventTeamRegister">
                        <img src={team_register}
                             className="eventIcon" alt=""
                             title="register team for event"
                             onClick={() => openRegisterTeamForEventPopUpBox(this.props.eventId)}/>
                    </div>
                }
                <div className="eventResults">
                    <Link to={{
                        pathname: `/events/${this.props.event.id}/results`,
                        state: {
                            eventName: this.props.event.long_name
                        }
                    }}>
                        <img src={resultsIcon}
                             title="results"
                             className="eventIcon" alt=""/>
                    </Link>
                </div>
                {(JSON.stringify(this.props.user) !== '{}' &&
                    checkUserManageEventsRole(this.props.user.roles)) ?
                    <>
                        <div className="eventEdit">
                            <img src={editIcon}
                                 className="eventIcon" alt=""
                                 title="edit"
                                 onClick={() => openEditEventPopUpBox(this.props.eventId, eventDetails.data.event)}/>
                        </div>
                        <div className="eventDelete">
                            <img src={deleteIcon}
                                 className="eventIcon" alt=""
                                 title="delete"
                                 onClick={() => openDeleteEventPopUpBox(this.props.eventId, this.props.event.long_name)}/>
                        </div>
                    </> :
                    <>
                        <div className="eventEdit"/>
                        <div className="eventDelete"/>
                    </>
                }
                <div className="eventArrow">
                    <img src={this.getArrow(isOpen)}
                         className="eventIcon" alt=""
                         onClick={this.changeCollapseState}
                         id={this.props.divItemId}/>
                </div>
            </div>

            <UncontrolledCollapse toggler={this.props.divItemIdToggler}
                // onEntering={this.onEntering}
            >
                {/*{isLoading ?*/}
                {/*    <div className="center"><LoaderSpinner/></div> :*/}
                <div className="divEventDetails">
                    <div className="eventsTableHead">
                        <div className="eventNumber"/>
                        <div className="eventTeams">
                            Teams
                        </div>
                        <div className="eventRegistrationFee">
                            Registration fee
                        </div>
                        <div className="eventRegistrationEnd">
                            Registration end
                        </div>
                        <div className="eventDescription">
                            Description
                        </div>
                        <div className="eventEmpty"/>
                    </div>
                    <div className="eventsDescriptionTableRow">
                        <div className="divEventsTableRow">
                            <div className="eventNumber"/>
                            <div className="eventTeams">
                                {eventTeamsList}
                            </div>
                            <div className="eventRegistrationFee">
                                {this.props.event.registration.fee}
                            </div>
                            <div className="eventRegistrationEnd">
                                {this.props.event.registration.registation_end}
                            </div>
                            <div className="eventDescription">
                                {eventDetails.data.event.description}
                            </div>
                            <div className="eventEmpty"/>
                        </div>
                    </div>
                </div>
                {/*}*/}
            </UncontrolledCollapse>
        </div>
    }
}

const mapStateToProps = (state) => {
    return {
        token: state.token,
        user: state.user
    }
};

export default connect(mapStateToProps, null)(Event);
