import React, {Component} from 'react';
import {connect} from 'react-redux';
import Avatar from 'react-avatar';
import {UncontrolledCollapse} from 'reactstrap';
import {checkUserManageClubsRole} from '../Utils/Helpers/UserHelper';
import {openEditClubPopUpBox, openDeleteClubPopUpBox} from '../Utils/PopUpBox/PopUpBox';
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
            clubDetails: {},
            isLoading: true,
            isOpen: false
        };
        this.changeCollapseState = this.changeCollapseState.bind(this);
        this.onEntering = this.onEntering.bind(this);
    }

    onEntering() {
        fetch('/api/v1/clubs/' + this.props.clubId, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': this.props.token
            }
        })
            .then(response => response.json())
            .then(data => this.setState({clubDetails: data, isLoading: false}))
    }

    changeCollapseState() {
        this.setState({isOpen: !this.state.isOpen})

    }

    getArrow(isOpen) {
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
                {(JSON.stringify(this.props.user) !== '{}' &&
                    checkUserManageClubsRole(this.props.user.roles)) ?
                    <>
                        <div className="clubEdit">
                            <img src={editIcon}
                                 className="clubIcon" alt=""
                                 title="edit"
                                 onClick={() => openEditClubPopUpBox(this.props.clubId, clubDetails.data.club)}/>
                        </div>
                        <div className="clubDelete">
                            <img src={deleteIcon}
                                 className="clubIcon" alt=""
                                 title="delete"
                                 onClick={() => openDeleteClubPopUpBox(this.props.clubId, this.props.club.name)}/>
                        </div>
                    </> :
                    <>
                        <div className="clubEdit"/>
                        <div className="clubDelete"/>
                    </>
                }
                <div className="clubArrow">
                    <img src={this.getArrow(isOpen)}
                         className="clubIcon" alt=""
                         onClick={this.changeCollapseState}
                         id={this.props.divItemId}/>
                </div>
            </div>

            <UncontrolledCollapse toggler={this.props.divItemIdToggler}
                                  onEntering={this.onEntering}>
                {isLoading ? <div className="center"><LoaderSpinner/></div> :
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
                }
            </UncontrolledCollapse>
        </div>
    }
}

const mapStateToProps = (state) => {
    return {
        token: state.token,
        user: state.user
    }
};

export default connect(mapStateToProps, null)(Club);
