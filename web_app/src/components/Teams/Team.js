import React, {Component} from 'react';
import {connect} from 'react-redux';
import Avatar from 'react-avatar';
import {UncontrolledCollapse} from 'reactstrap';
import {checkUserManageEventsRole} from '../Utils/Helpers/UserHelper';
import {openEditTeamPopUpBox, openDeleteTeamPopUpBox} from '../Utils/PopUpBox/PopUpBox';
import LoaderSpinner from '../Utils/LoaderSpinner/LoaderSpinner';
import arrow_up from '../../assets/icons/base/arrow_up.svg';
import arrow_down from '../../assets/icons/base/arrow_down.svg';
import editIcon from '../../assets/icons/base/edit.svg';
import deleteIcon from '../../assets/icons/base/delete.svg';
import './Teams.css';

class Team extends Component {

    constructor(props) {
        super(props);
        this.state = {
            teamDetails: {
                "data": {
                    "team": {
                        "name": "Echipa Racheta",
                        "captain": "John Doe",
                        "phone": "+123456789"
                    }
                }
            },
            isLoading: true,
            isOpen: false
        };
        this.changeCollapseState = this.changeCollapseState.bind(this);
    }

    // componentDidMount() {
    //     fetch('/api/v1/teams/' + this.props.teamId, {
    //         method: 'GET',
    //         headers: {
    //             'Content-Type': 'application/json'
    //         }
    //     })
    //         .then(response => response.json())
    //         .then(data => this.setState({teamDetails: data, isLoading: false}))
    // }

    changeCollapseState() {
        this.setState({isOpen: !this.state.isOpen})
    }

    getArrow(isOpen) {
        return isOpen ? arrow_up : arrow_down;
    }

    render() {
        const {teamDetails, isLoading, isOpen} = this.state;

        return <div className="teamsTableRow" key={this.props.keyItem}>
            <div className="divTeamsTableRow">
                <div className="teamNumber">
                    {this.props.keyItem + 1}
                </div>
                <div className="teamName">
                    {this.props.team.name}
                </div>
                {(JSON.stringify(this.props.user) !== '{}' &&
                    checkUserManageEventsRole(this.props.user.roles)) ?
                    <>
                        <div className="teamEdit">
                            <img src={editIcon}
                                 className="teamIcon" alt=""
                                 onClick={() => openEditTeamPopUpBox(this.props.teamId, teamDetails.data.team)}/>
                        </div>
                        <div className="teamDelete">
                            <img src={deleteIcon}
                                 className="teamIcon" alt=""
                                 onClick={() => openDeleteTeamPopUpBox(this.props.teamId, this.props.team.name)}/>
                        </div>
                    </> :
                    <>
                        <div className="teamEdit"/>
                        <div className="teamDelete"/>
                    </>
                }
                <div className="teamArrow">
                    <img src={this.getArrow(isOpen)}
                         className="teamIcon" alt=""
                         onClick={this.changeCollapseState}
                         id={this.props.divItemId}/>
                </div>
            </div>

            <UncontrolledCollapse toggler={this.props.divItemIdToggler}>
                {/*{isLoading ?*/}
                {/*    <div className="center"><LoaderSpinner/></div> :*/}
                <div className="divTeamDetails">
                    <div className="teamsTableHead">
                        <div className="teamNumber"/>
                        <div className="teamCaptain">
                            Captain
                        </div>
                        <div className="teamCaptainPhone">
                            Phone
                        </div>
                        <div className="teamEmpty"/>
                    </div>
                    <div className="teamsDescriptionTableRow">
                        <div className="divTeamsTableRow">
                            <div className="teamNumber"/>
                            <div className="teamCaptain">
                                <Avatar name={teamDetails.data.team.captain}
                                        size="30" round="30"
                                        color="#9be8e2"
                                        className="teamCaptainAvatar"/>
                                {teamDetails.data.team.captain}
                            </div>
                            <div className="teamCaptainPhone">
                                {teamDetails.data.team.phone}
                            </div>
                            <div className="teamEmpty"/>
                        </div>
                    </div>
                </div>
                {/*}*/}
            </UncontrolledCollapse>
        </div>
    }
}

const mapStateToProps = (state) => {
    return {
        user: state.user
    }
};

export default connect(mapStateToProps, null)(Team);
