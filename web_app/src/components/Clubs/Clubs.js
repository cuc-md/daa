import React, {Component} from 'react';
import './Clubs.css';

class Clubs extends Component {

    constructor(props) {
        super(props);
        this.state = {
            isLoading: true
        };
    }

    render() {
        return <div className="main">Clubs</div>
    }
}

export default Clubs;
