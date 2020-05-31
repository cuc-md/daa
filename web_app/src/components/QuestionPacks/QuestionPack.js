import React, {Component} from 'react';
import {connect} from 'react-redux';
import {UncontrolledCollapse} from 'reactstrap';
import LoaderSpinner from '../Utils/LoaderSpinner/LoaderSpinner';
import arrow_up from '../../assets/icons/base/arrow_up.svg';
import arrow_down from '../../assets/icons/base/arrow_down.svg';
import editIcon from '../../assets/icons/base/edit.svg';
import deleteIcon from '../../assets/icons/base/delete.svg';
import randomIcon from '../../assets/icons/base/random.svg';
import {checkUserManageEventsRole} from '../Utils/Helpers/UserHelper';
import {openEditQuestionPackPopUpBox, openDeleteQuestionPackPopUpBox} from '../Utils/PopUpBox/PopUpBox';
import './QuestionPacks.css';

class QuestionPack extends Component {

    constructor(props) {
        super(props);
        this.state = {
            questionPack: {},
            isLoading: true,
            isOpen: false
        };
        this.changeCollapseState = this.changeCollapseState.bind(this);
        this.onEntering = this.onEntering.bind(this);
    }

    onEntering() {
        fetch('/api/v1/question_packs/' + this.props.packId, {
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
                return Promise.reject('Error')
            }
        })
            .then(data => this.setState({questionPack: data, isLoading: false}))
            .catch(error => console.log(error));
    }

    changeCollapseState() {
        this.setState({isOpen: !this.state.isOpen})
    }

    getArrow(isOpen) {
        return isOpen ? arrow_up : arrow_down;
    }

    render() {
        const {questionPack, isLoading, isOpen} = this.state;

        return <div className="questionPacksTableRow" key={this.props.keyItem}>
            <div className="divQuestionPacksTableRow">
                <div className="questionPackNumber">
                    {this.props.keyItem === "random" ?
                        <img src={randomIcon}
                             className="questionPackRandomIcon" alt=""
                             title="random"/> :
                        this.props.keyItem + 1
                    }
                </div>
                <div className="questionPackEventName">
                    {this.props.pack.event_name}
                </div>
                <div className="questionPackDifficulty">
                    {this.props.pack.difficulty}
                </div>
                {(JSON.stringify(this.props.user) !== '{}' &&
                    checkUserManageEventsRole(this.props.user.roles)) ?
                    <div className="questionPackDelete">
                        <img src={deleteIcon}
                             className="questionPackIcon" alt=""
                             title="delete"
                             onClick={() => openDeleteQuestionPackPopUpBox(this.props.pack.id)}/>
                    </div> :
                    <div className="questionPackDelete"/>
                }
                <div className="questionPackArrow">
                    <img src={this.getArrow(isOpen)}
                         className="questionPackIcon" alt=""
                         onClick={this.changeCollapseState}
                         id={this.props.divItemId}/>
                </div>
            </div>

            <UncontrolledCollapse toggler={this.props.divItemIdToggler}
                                  onEntering={this.onEntering}>
                {isLoading ?
                    <div className="center"><LoaderSpinner/></div> :
                    <div className="divQuestionPackDetails">
                        <div className="questionPacksTableHead">
                            <div className="questionPackNumber"/>
                            <div className="questionPackAuthor">
                                Author
                            </div>
                            <div className="questionPackEdit"/>
                            <div className="questionPackEmpty"/>
                        </div>
                        <div className="questionPacksTableRow">
                            <div className="questionPackNumber"/>
                            <div className="questionPackAuthor">
                                {questionPack.data.question_pack.author}
                            </div>
                            {(JSON.stringify(this.props.user) !== '{}' &&
                                checkUserManageEventsRole(this.props.user.roles)) ?
                                <div className="questionPackEdit">
                                    <img src={editIcon}
                                         className="questionPackIcon" alt=""
                                         title="edit"
                                         onClick={() => openEditQuestionPackPopUpBox(this.props.pack.id, questionPack.data.question_pack)}/>
                                </div> :
                                <div className="questionPackEdit"/>
                            }
                            <div className="questionPackEmpty"/>
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

export default connect(mapStateToProps, null)(QuestionPack);
