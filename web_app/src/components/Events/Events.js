import React, {Component} from 'react';
import LoaderSpinner from '../Utils/LoaderSpinner/LoaderSpinner';
import {openAddEventPopUpBox} from '../Utils/PopUpBox/PopUpBox';
import Event from './Event';
import './Events.css';

class Events extends Component {

    constructor(props) {
        super(props);
        this.state = {
            events: {
                "data": {
                    "events": [
                        {
                            "id": 123,
                            "name": "World championship",
                            "long_name": "World championship 2020",
                            "description": "description",
                            "cover_photo": "/api/v1/photos/1234.png",
                            "dates": {
                                "start_date": "2010-01-01 10:00",
                                "end_date": "2010-01-01 15:00"
                            },
                            "registration": {
                                "status": "open",
                                "fee": "10 MDL/person",
                                "registation_end": "2010-01-01 09:00"
                            }
                        },
                        {
                            "id": 124,
                            "name": "World championship 2",
                            "long_name": "World championship 2022",
                            "description": "description",
                            "cover_photo": "/api/v1/photos/1234.png",
                            "dates": {
                                "start_date": "2010-01-01 10:00",
                                "end_date": "2010-01-01 15:00"
                            },
                            "registration": {
                                "status": "open",
                                "fee": "10 MDL/person",
                                "registation_end": "2010-01-01 09:00"
                            }
                        },
                        {
                            "id": 125,
                            "name": "World championship 3",
                            "long_name": "World championship 2023",
                            "description": "description",
                            "cover_photo": "/api/v1/photos/1234.png",
                            "dates": {
                                "start_date": "2010-01-01 10:00",
                                "end_date": "2010-01-01 15:00"
                            },
                            "registration": {
                                "status": "open",
                                "fee": "10 MDL/person",
                                "registation_end": "2010-01-01 09:00"
                            }
                        }
                    ]
                }
            },
            isLoading: true
        };
    }

    // componentDidMount() {
    //     fetch('/api/v1/events', {
    //         method: 'GET',
    //         headers: {
    //             'Content-Type': 'application/json'
    //         }
    //     }).then(response => response.json())
    //         .then(data => this.setState({events: data, isLoading: false}));
    // }

    render() {
        const {events, isLoading} = this.state;

        // if (isLoading) {
        //     return <div className="main center"><LoaderSpinner/></div>;
        // }

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
            <div className="divAddEvent">
                <button className="choiceButton choiceButtonStatic okButton textFontStyle16"
                        onClick={() => openAddEventPopUpBox()}>
                    + Add Event
                </button>
            </div>
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

export default Events;
