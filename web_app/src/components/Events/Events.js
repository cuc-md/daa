import React, {Component} from 'react';
import './Events.css';

class Events extends Component {

    constructor(props) {
        super(props);
        this.state = {
            isLoading: true
        };
    }

    render() {
        return <div className="main">Events</div>
    }
}

export default Events;
