import React, {Component} from 'react';
import {connect} from 'react-redux';
import LoaderSpinner from '../Utils/LoaderSpinner/LoaderSpinner';
import {checkUserManageEventsRole} from '../Utils/Helpers/UserHelper';
import {openAddEventPopUpBox} from '../Utils/PopUpBox/PopUpBox';
import Event from './Event';
import './Events.css';

class Events extends Component {

    constructor(props) {
        super(props);
        this.state = {
            events: {},
            isLoading: true
        };
    }

    componentDidMount() {
        fetch('/api/v1/events', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            }
        }).then(response => response.json())
            .then(data => this.setState({events: data, isLoading: false}));
    }

    render() {
        const {events, isLoading} = this.state;

        if (isLoading) {
            return <div className="main center"><LoaderSpinner/></div>;
        }

        let eventsList = events.data.events.map((event, i) => {
            let divItemId = "id" + i;
            let divItemIdToggler = "#" + divItemId;

            return <Event keyItem={i}
                          divItemId={divItemId}
                          divItemIdToggler={divItemIdToggler}
                          eventId={event.id}
                          event={event}/>
        });

        return <div className="main">
            {(JSON.stringify(this.props.user) !== '{}' &&
                checkUserManageEventsRole(this.props.user.roles)) ?
                <div className="divAddEvent">
                    <button className="choiceButton choiceButtonStatic okButton textFontStyle16"
                            onClick={() => openAddEventPopUpBox()}>
                        + Add Event
                    </button>
                </div> : null
            }
            <div>
                <div className="eventsTableHead">
                    <div className="eventNumber"/>
                    <div className="eventName">
                        Event
                    </div>
                    <div className="eventDate">
                        Start Date
                    </div>
                    <div className="eventDate">
                        End Date
                    </div>
                    <div className="eventRegistration">
                        Status
                    </div>
                    <div className="eventTeamRegister"/>
                    <div className="eventResults"/>
                    <div className="eventEdit"/>
                    <div className="eventDelete"/>
                    <div className="eventArrow"/>
                </div>
                {eventsList}
            </div>
        </div>
    }
}

const mapStateToProps = (state) => {
    return {
        user: state.user
    }
};

export default connect(mapStateToProps, null)(Events);
