import React, {Component} from 'react';
import Event from './Event';
import './Events.css';

class Events extends Component {

    constructor(props) {
        super(props);
        this.state = {
            users: {},
            isLoading: true
        };
    }

    componentDidMount() {
        fetch('/api/v1/users', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            }
        }).then(response => response.json())
            .then(data => this.setState({users: data}));
    }

    render() {
        const {users} = this.state;
        console.log(users);

        return <div className="main">
            <div>
                <div className="eventsTableHead">
                    <div className="eventNumber"/>
                    <div className="eventName">
                        Event
                    </div>
                    <div className="eventDate">
                        Date
                    </div>
                    <div className="eventLocation">
                        Location
                    </div>
                    <div className="eventArrow"/>
                </div>
                <Event keyItem={1}
                       divItemId="id1"
                       divItemIdToggler="#id1"
                       eventNumber={1}
                       eventName="Event1"
                       eventDate=" 12.06.2020"
                       eventLocation="Chisinau"/>
                <Event keyItem={2}
                       divItemId="id2"
                       divItemIdToggler="#id2"
                       eventNumber={2}
                       eventName="Event2"
                       eventDate=" 12.07.2020"
                       eventLocation="Chisinau"/>
                <Event keyItem={3}
                       divItemId="id3"
                       divItemIdToggler="#id3"
                       eventNumber={3}
                       eventName="Event3"
                       eventDate=" 12.08.2020"
                       eventLocation="Chisinau"/>
            </div>
        </div>
    }
}

export default Events;
