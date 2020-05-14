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
            clubs: {
                "data": {
                    "clubs": [
                        {
                            "id": 123,
                            "name": "Club 1",
                            "city": "Chisinau",
                            "address": "Chisinau, some street",
                            "contacts": {
                                "representative": "John Doe",
                                "phone": "+123456789",
                                "email": "foo@bar.baz"
                            },
                        },
                        {
                            "id": 124,
                            "name": "Club 2",
                            "city": "Chisinau",
                            "address": "Chisinau, some street",
                            "contacts": {
                                "representative": "John Doe",
                                "phone": "+123456789",
                                "email": "foo@bar.baz"
                            }
                        },
                        {
                            "id": 125,
                            "name": "Club 3",
                            "city": "Chisinau",
                            "address": "Chisinau, some street",
                            "contacts": {
                                "representative": "John Doe",
                                "phone": "+123456789",
                                "email": "foo@bar.baz"
                            }
                        }
                    ]
                }
            },
            isLoading: true
        };
    }

    // componentDidMount() {
    //     fetch('/api/v1/clubs', {
    //         method: 'GET',
    //         headers: {
    //             'Content-Type': 'application/json'
    //         }
    //     })
    //         .then(response => response.json())
    //         .then(data => this.setState({clubs: data, isLoading: false}))
    // }

    render() {
        const {clubs, isLoading} = this.state;

        // if (isLoading) {
        //     return <div className="main center"><LoaderSpinner/></div>;
        // }

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
            {(JSON.stringify(this.props.user) !== '{}' &&
                checkUserManageClubsRole(this.props.user.roles)) ?
                <div className="divAddClub">
                    <button className="choiceButton choiceButtonStatic okButton textFontStyle16"
                            onClick={() => openAddClubPopUpBox()}>
                        + Add Club
                    </button>
                </div> : null
            }
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
                    <div className="clubEdit"/>
                    <div className="clubDelete"/>
                    <div className="clubArrow"/>
                </div>
                {clubsList}
            </div>
        </div>
    }
}

const mapStateToProps = (state) => {
    return {
        user: state.user
    }
};

export default connect(mapStateToProps, null)(Clubs);
