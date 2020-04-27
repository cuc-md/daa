import React, {Component} from 'react';
import Club from './Club';
import './Clubs.css';

class Clubs extends Component {

    constructor(props) {
        super(props);
        this.state = {
            isLoading: true
        };
    }

    render() {
        return <div className="main">
            <div>
                <div className="clubsTableHead">
                    <div className="clubNumber"/>
                    <div className="clubName">
                        Club
                    </div>
                    <div className="clubArrow"/>
                </div>
                <Club keyItem={1}
                      divItemId="id1"
                      divItemIdToggler="#id1"
                      clubNumber={1}
                      clubName="Club1"/>
                <Club keyItem={2}
                      divItemId="id2"
                      divItemIdToggler="#id2"
                      clubNumber={2}
                      clubName="Club2"/>
                <Club keyItem={3}
                      divItemId="id3"
                      divItemIdToggler="#id3"
                      clubNumber={3}
                      clubName="Club3"/>
            </div>
        </div>
    }
}

export default Clubs;
