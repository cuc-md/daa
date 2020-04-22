import React from 'react';
import {BrowserRouter, Switch, Route} from 'react-router-dom';
import {PopupboxContainer} from 'react-popupbox';
import Home from './components/Home/Home';
import Events from './components/Events/Events';
import Clubs from './components/Clubs/Clubs';
import Teams from './components/Teams/Teams';
import Results from './components/Results/Results';
import Navbar from './components/Navigation/Navbar/Navbar';
import Sidebar from './components/Navigation/Sidebar/Sidebar';
import './App.css';

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
                                <Route exact path='/clubs' component={Clubs}/>
                                <Route exact path='/teams' component={Teams}/>
                                <Route exact path='/results' component={Results}/>
                            </Switch>
                        </div>
                    </div>
                </div>
        </BrowserRouter>
            </>
    )
}

export default App;
