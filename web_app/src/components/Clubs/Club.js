import React, {Component} from 'react';
import {UncontrolledCollapse} from 'reactstrap';
import arrow_up from '../../assets/icons/base/arrow_up.svg';
import arrow_down from '../../assets/icons/base/arrow_down.svg';
import './Clubs.css';
import LoaderSpinner from "../Utils/LoaderSpinner/LoaderSpinner";

class Club extends Component {

    constructor(props) {
        super(props);
        this.state = {
            clubDetails: {
                "data": {
                    "club": {
                        "id": 123,
                        "name": "Club 1",
                        "city": "Chisinau",
                        "address": "Chisinau, some street",
                        "founded_on": "2010-10-10",
                        "description": "very long description + html",
                        "active_teams": 10,
                        "total_teams": 50,
                        "contacts": {
                            "representative": "John Doe",
                            "phone": "+123456789",
                            "email": "foo@bar.baz"
                        }
                    }
                }
            },
            isLoading: true,
            isOpen: false
        };
        this.changeCollapseState = this.changeCollapseState.bind(this);
    }

    // componentDidMount() {
    //     fetch('/api/v1/clubs/' + this.props.clubId)
    //         .then(response => response.json())
    //         .then(data => this.setState({clubDetails: data, isLoading: false}))
    // }

    changeCollapseState() {
        this.setState({isOpen: !this.state.isOpen})
    }

    getArrowForChallenge(isOpen) {
        return isOpen ? arrow_up : arrow_down;
    }

    render() {
        const {clubDetails, isLoading, isOpen} = this.state;

        return <div className="clubsTableRow" key={this.props.keyItem}>
            <div className="divClubsTableRow"
                 id={this.props.divItemId}
                 onClick={this.changeCollapseState}>
                <div className="clubNumber">
                    {this.props.keyItem + 1}
                </div>
                <div className="clubName">
                    {this.props.club.name}
                </div>
                <div className="clubCity">
                    {this.props.club.city}
                </div>
                <div className="clubAddress">
                    {this.props.club.address}
                </div>
                <div className="clubContacts">
                    {/*{this.props.club.contacts}*/}
                    contacts
                </div>
                <div className="clubArrow">
                    <img src={this.getArrowForChallenge(isOpen)}
                         className="clubArrowIcon" alt=""/>
                </div>
            </div>

            <UncontrolledCollapse toggler={this.props.divItemIdToggler}>
                {isLoading ?
                    <div className="center"><LoaderSpinner/></div> :
                    <div className="divClubDetails">
                        Details
                    </div>
                }
            </UncontrolledCollapse>
        </div>
    }
}

export default Club;
