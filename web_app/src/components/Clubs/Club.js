import React, {Component} from 'react';
import Avatar from 'react-avatar';
import {UncontrolledCollapse} from 'reactstrap';
import {openDeleteClubPopUpBox} from '../Utils/PopUpBox/PopUpBox';
import LoaderSpinner from '../Utils/LoaderSpinner/LoaderSpinner';
import arrow_up from '../../assets/icons/base/arrow_up.svg';
import arrow_down from '../../assets/icons/base/arrow_down.svg';
import editIcon from '../../assets/icons/base/edit.svg';
import deleteIcon from '../../assets/icons/base/delete.svg';
import './Clubs.css';

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
            <div className="divClubsTableRow">
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
                    <div className="clubContactsTable">
                        <div className="divClubContactsUserAvatar">
                            <Avatar name={this.props.club.contacts.representative}
                                    size="30" round="30"
                                    color="#9be8e2"/>
                        </div>
                        <div className="divClubContactsUserName">
                            {this.props.club.contacts.representative}
                        </div>
                        <div className="divClubContactsUserEmail">
                            {this.props.club.contacts.phone}
                            <br/>
                            {this.props.club.contacts.email}
                        </div>
                    </div>
                </div>
                <div className="clubEdit">
                    <img src={editIcon}
                         className="clubIcon" alt=""
                         onClick={() => console.log("edit club")}/>
                </div>
                <div className="clubDelete">
                    <img src={deleteIcon}
                         className="clubIcon" alt=""
                         onClick={() => openDeleteClubPopUpBox(this.props.clubId, this.props.club.name)}/>
                </div>
                <div className="clubArrow">
                    <img src={this.getArrowForChallenge(isOpen)}
                         className="clubIcon" alt=""
                         onClick={this.changeCollapseState}
                         id={this.props.divItemId}/>
                </div>
            </div>

            <UncontrolledCollapse toggler={this.props.divItemIdToggler}>
                {/*{isLoading ?*/}
                {/*    <div className="center"><LoaderSpinner/></div> :*/}
                <div className="divClubDetails">
                    <div className="clubsTableHead">
                        <div className="clubNumber"/>
                        <div className="clubFoundedOn">
                            Founded on
                        </div>
                        <div className="clubActiveTeams">
                            Active teams
                        </div>
                        <div className="clubTotalTeams">
                            Total teams
                        </div>
                        <div className="clubDescription">
                            Description
                        </div>
                        <div className="clubEmpty"/>
                    </div>
                    <div className="clubsDescriptionTableRow">
                        <div className="divClubsTableRow">
                            <div className="clubNumber"/>
                            <div className="clubFoundedOn">
                                {clubDetails.data.club.founded_on}
                            </div>
                            <div className="clubActiveTeams">
                                {clubDetails.data.club.active_teams}
                            </div>
                            <div className="clubTotalTeams">
                                {clubDetails.data.club.total_teams}
                            </div>
                            <div className="clubDescription">
                                {clubDetails.data.club.description}
                            </div>
                            <div className="clubEmpty"/>
                        </div>
                    </div>
                </div>
                {/*}*/}
            </UncontrolledCollapse>
        </div>
    }
}

export default Club;
