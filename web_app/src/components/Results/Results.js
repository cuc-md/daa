import React, {Component} from 'react';
import './Results.css';

class Results extends Component {

    constructor(props) {
        super(props);
        this.state = {
            isLoading: true
        };
    }

    render() {
        return <div className="main">Results</div>
    }
}

export default Results;
