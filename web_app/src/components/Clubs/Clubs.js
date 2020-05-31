import React, {Component} from 'react';
import {connect} from 'react-redux';
import LoaderSpinner from '../Utils/LoaderSpinner/LoaderSpinner';
import {checkUserManageClubsRole} from '../Utils/Helpers/UserHelper';
import {openAddClubPopUpBox} from '../Utils/PopUpBox/PopUpBox';
import Club from './Club';
import '../Utils/Button/Button.css';
import './Clubs.css';

class Clubs extends Component {

    constructor(props) {
        super(props);
        this.state = {
            clubs: {},
            isLoading: true
        };
    }

    componentDidMount() {
        fetch('/api/v1/clubs', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': this.props.token
            }
        }).then(response => {
            if (response.ok) {
                return response.json()
            } else {
                console.log("Response status " + response.status);
                this.setState({clubs: {}, isLoading: false});
                return Promise.reject('Error')
            }
        })
            .then(data => this.setState({clubs: data, isLoading: false}))
            .catch(error => console.log(error));
    }

    getClubsHead() {
        return (JSON.stringify(this.props.user) !== '{}' &&
            checkUserManageClubsRole(this.props.user.roles)) ?
            <div className="divAddClub">
                <button className="choiceButton choiceButtonStatic okButton textFontStyle16"
                        onClick={() => openAddClubPopUpBox()}>
                    + Add Club
                </button>
            </div> : null
    }

    render() {
        const {clubs, isLoading} = this.state;

        if (isLoading) {
            return <div className="main center"><LoaderSpinner/></div>;
        }

        if (JSON.stringify(clubs) === '{}') {
            return <div className="main">
                {this.getClubsHead()}
                <div className="clubsTableRow">
                    <div className="noClubs center">
                        No clubs
                    </div>
                </div>
            </div>
        } else {
            let clubsList = clubs.data.clubs.map((club, i) => {
                let divItemId = "id" + i;
                let divItemIdToggler = "#" + divItemId;

                return <Club keyItem={i}
                             divItemId={divItemId}
                             divItemIdToggler={divItemIdToggler}
                             clubId={club.id}
                             club={club}/>
            });

            return <div className="main">
                {this.getClubsHead()}
                <div>
                    <div className="clubsTableHead">
                        <div className="clubNumber"/>
                        <div className="clubName">
                            Club
                        </div>
                        <div className="clubCity">
                            City
                        </div>
                        <div className="clubAddress">
                            Address
                        </div>
                        <div className="clubContacts">
                            Contacts
                        </div>
                        <div className="clubDelete"/>
                        <div className="clubArrow"/>
                    </div>
                    {clubsList}
                </div>
            </div>
        }
    }
}

const mapStateToProps = (state) => {
    return {
        token: state.token,
        user: state.user
    }
};

export default connect(mapStateToProps, null)(Clubs);
