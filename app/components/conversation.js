import React from 'react';
import {getUserData} from '../server.js';

export default class Conversation extends React.Component {
    constructor(props) {
        super(props);
        this.state = props.data;
        this.state.id = props._id;
    }

    onClick(id) {
        this.props.onClick(id);
        this.setState({read: true});
    }

    render() {
        var user = getUserData(this.state.chatID);
        var badge = <span className="badge pull-right">1</span>;
        var active = "converation activeConvo";
        if(!this.props.isActive(this.state.id)) {
            active = "conversation";
        }
        if(this.state.read)
            badge = '';
        return(
            <div>
                <li role="button" className={active} onClick={(e) => this.onClick(this.state.id)}>
                    <img src={user.pic} width="40" height="40"/>
                    {user.fullName}
                    {badge}
                </li>
                <hr />
            </div>
        )
    }
}