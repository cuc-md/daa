import React from 'react';
import {BrowserRouter, Switch, Route} from 'react-router-dom';
import {PopupboxContainer} from 'react-popupbox';
import Home from './components/Home/Home';
import Events from './components/Events/Events';
import Clubs from './components/Clubs/Clubs';
import Teams from './components/Teams/Teams';
import Results from './components/Results/Results';
import QuestionPacks from './components/QuestionPacks/QuestionPacks';
import UsersRedux from './components/Users/UsersRedux';
import Navbar from './components/Navigation/Navbar/Navbar';
import Sidebar from './components/Navigation/Sidebar/Sidebar';

function App() {

    const popupboxConfig = {
        titleBar: {
            enable: true
        },
        fadeIn: true,
        fadeInSpeed: 500
    };

    return (
        <>
            <BrowserRouter basename={'react'}>
                <div>
                    <Navbar/>
                    <div className="row rowStyle">
                        <div className="col-sm-1">
                            <Sidebar/>
                        </div>
                        <div className="col-sm-11">
                            <Switch>
                                <Route exact path='/' component={Home}/>
                                <Route exact path='/events' component={Events}/>
                                <Route path='/events/:eventId/results' component={Results}/>
                                <Route path='/clubs' component={Clubs}/>
                                <Route path='/teams' component={Teams}/>
                                <Route path='/question_store' component={QuestionPacks}/>
                                <Route path='/users' component={UsersRedux}/>
                            </Switch>
                        </div>
                    </div>
                    <PopupboxContainer {...popupboxConfig}/>
                </div>
            </BrowserRouter>
        </>
    )
}

export default App;
