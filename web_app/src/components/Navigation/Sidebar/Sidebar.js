import React, {Component} from 'react';
import './Sidebar.css';

class Sidebar extends Component {

    constructor(props) {
        super(props);
        this.state = {
            isLoading: true
        };
    }

    render() {
        return <div>Sidebar</div>
    }
}

export default Sidebar;
