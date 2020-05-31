import React, {Component} from 'react';
import {connect} from 'react-redux';
import Select from 'react-select';
import LoaderSpinner from '../Utils/LoaderSpinner/LoaderSpinner';
import {checkUserManageEventsRole} from '../Utils/Helpers/UserHelper';
import {openAddQuestionPackPopUpBox} from '../Utils/PopUpBox/PopUpBox';
import QuestionPack from './QuestionPack';
import './QuestionPacks.css';

class QuestionPacks extends Component {

    constructor(props) {
        super(props);
        this.state = {
            questionPacks: {},
            randomPack: {},
            selectRandomPack: true,
            selectedOption: 'medium',
            isLoading: true
        };
        this.getQuestionPacks = this.getQuestionPacks.bind(this);
        this.handleDropdownChange = this.handleDropdownChange.bind(this);
        this.getRandomPack = this.getRandomPack.bind(this);
        this.selectRandomPack = this.selectRandomPack.bind(this);
    }

    componentDidMount() {
        this.getQuestionPacks();
        this.getRandomPack();
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        if (prevState.selectedOption !== this.state.selectedOption) {
            this.getQuestionPacks();
        }
        if (prevState.selectRandomPack === false &&
            this.state.selectRandomPack === true) {
            this.getRandomPack();
            this.setState({selectRandomPack: false})
        }
    }

    getQuestionPacks() {
        fetch('/api/v1/question_packs?difficulty=' + this.state.selectedOption, {
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
            .then(data => this.setState({questionPacks: data, isLoading: false}))
            .catch(error => console.log(error));
    }

    getRandomPack() {
        fetch('/api/v1/question_packs/random?difficulty='
            + this.state.selectedOption, {
            method: 'GET',
            headers: {
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
            .then(data => this.setState({randomPack: data, selectRandomPack: false}))
            .catch(error => console.log(error));
    }

    handleDropdownChange(selectedOption) {
        this.setState({selectedOption: selectedOption.value});
    }

    selectRandomPack() {
        this.setState({selectRandomPack: true});
    }

    render() {
        const {questionPacks, isLoading, randomPack, selectRandomPack} = this.state;

        if (isLoading) {
            return <div className="main center"><LoaderSpinner/></div>;
        }

        const questionPackOptions = [
            {value: 'simple', label: 'simple'},
            {value: 'medium', label: 'medium'},
            {value: 'hard', label: 'hard'},
        ];

        const feedbackDropdownStyles = {
            control: base => ({
                ...base,
                boxShadow: 'none',
                border: '2px solid rgba(255, 255, 255, 0.16)',
                "&:hover": {
                    border: '2px solid #1cc8eb'
                },
                width: '100%'
            }),
            option: (base, state) => ({
                ...base,
                backgroundColor: state.isSelected ? '#1cc8eb' : '#FFFFFF',
                "&:active": {
                    background: '#FFFFFF',
                },
                width: '100%'
            }),
        };

        let questionPacksList = questionPacks.data.question_packs.map((pack, i) => {
            let divItemId = "id" + i;
            let divItemIdToggler = "#" + divItemId;

            return <QuestionPack keyItem={i}
                                 divItemId={divItemId}
                                 divItemIdToggler={divItemIdToggler}
                                 packId={pack.id}
                                 pack={pack}/>
        });

        let randomPackList;
        if (selectRandomPack) {
            randomPackList = <div/>;
        } else {
            randomPackList = <QuestionPack keyItem="random"
                                           divItemId="idrandom"
                                           divItemIdToggler="#idrandom"
                                           packId={randomPack.data.question_pack.id}
                                           pack={randomPack.data.question_pack}/>;
        }

        return <div className="main">
            <div className="divSelectQuestionPack">
                <Select className="textFontStyle16"
                        id="selectQuestionPack"
                        styles={feedbackDropdownStyles}
                        options={questionPackOptions}
                        defaultValue={{value: 'medium', label: 'medium'}}
                        onChange={this.handleDropdownChange}
                />
            </div>
            <div className="divDownloadQuestionPack">
                <button className="choiceButton choiceButtonStatic cancelButton textFontStyle16"
                        onClick={this.selectRandomPack}>
                    Random pack
                </button>
                {(JSON.stringify(this.props.user) !== '{}' &&
                    checkUserManageEventsRole(this.props.user.roles)) ?
                    <button className="choiceButton choiceButtonStatic okButton textFontStyle16"
                            onClick={() => openAddQuestionPackPopUpBox(
                                this.props.user.id,
                                questionPacks.event_id,
                                questionPacks.event_name
                            )}>
                        + Add pack
                    </button> : null
                }
            </div>
            <div>
                <div className="questionPacksTableHead">
                    <div className="questionPackNumber"/>
                    <div className="questionPackEventName">
                        Event
                    </div>
                    <div className="questionPackDifficulty">
                        Difficulty
                    </div>
                    <div className="questionPackDelete"/>
                    <div className="questionPackArrow"/>
                </div>
                {randomPackList}
                {questionPacksList}
            </div>
        </div>
    }
}

const mapStateToProps = (state) => {
    return {
        token: state.token,
        user: state.user
    }
};

export default connect(mapStateToProps, null)(QuestionPacks);
