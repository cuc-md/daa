import React, {Component} from 'react';
import './Teams.css';

class Teams extends Component {

    constructor(props) {
        super(props);
        this.state = {
            isLoading: true
        };
    }

    render() {
        return <div className="main">Teams</div>
    }
}

export default Teams;
