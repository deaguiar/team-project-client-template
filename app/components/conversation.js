import React from 'react';
import {getUserData} from '../server.js';

export default class Conversation extends React.Component {
    constructor(props) {
        super(props);
        this.state = props.data;
        this.state.active = props.active;
    }

    render() {
        var user = getUserData(this.state.chatID);
        var badge = <span className="badge pull-right">1</span>;
        var active = "activeConvo";
        if(!this.state.active)
            active = "";
        if(this.state.read)
            badge = '';
        return(
            <div>
                <li role="button" className={active}>
                    <img src={user.pic} width="40" height="40"/>
                    {user.fullName}
                    {badge}
                </li>
            </div>
        )
    }
}