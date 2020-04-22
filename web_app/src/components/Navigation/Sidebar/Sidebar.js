import React, {Component} from 'react';
import {NavLink} from 'react-router-dom';
import {ReactComponent as HomeIcon} from '../../../assets/icons/sidebar/home.svg';
import {ReactComponent as EventIcon} from '../../../assets/icons/sidebar/event.svg';
import {ReactComponent as ClubIcon} from '../../../assets/icons/sidebar/club.svg';
import {ReactComponent as TeamIcon} from '../../../assets/icons/sidebar/team.svg';
import {ReactComponent as ResultsIcon} from '../../../assets/icons/sidebar/results.svg';
import './Sidebar.css';

class Sidebar extends Component {

    constructor(props) {
        super(props);
        this.state = {
            isLoading: true
        };
    }

    render() {
        return <div className="sidebar">
            <div className="divSidebar">
                <NavLink exact activeClassName="active" className="" to='/'>
                    <div className="sidebarIcon">
                        <HomeIcon className="sidebarIcon"/>
                    </div>
                </NavLink>
            </div>
            <div className="divSidebar">
                <NavLink activeClassName="active" className="" to='/events'>
                    <div className="sidebarIcon">
                        <EventIcon className="sidebarIcon"/>
                    </div>
                </NavLink>
            </div>
            <div className="divSidebar">
                <NavLink activeClassName="active" className="" to='/clubs'>
                    <div className="sidebarIcon">
                        <ClubIcon className="sidebarIcon"/>
                    </div>
                </NavLink>
            </div>
            <div className="divSidebar">
                <NavLink activeClassName="active" className="" to='/teams'>
                    <div className="sidebarIcon">
                        <TeamIcon className="sidebarIcon"/>
                    </div>
                </NavLink>
            </div>
            <div className="divSidebar">
                <NavLink activeClassName="active" className="" to='/results'>
                    <div className="sidebarIcon">
                        <ResultsIcon className="sidebarIcon"/>
                    </div>
                </NavLink>
            </div>
        </div>
    }
}

export default Sidebar;
