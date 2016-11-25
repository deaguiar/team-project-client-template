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

    getLastMessage() {
        var length = this.state.messages.length;
        return this.state.messages[length - 1].message;
    }

    render() {
        var user = getUserData(this.state.chatID);
        var badge = <span className="badge pull-right">1</span>;
        var active = "conversation activeConvo";
        if(!this.props.isActive(this.state.id)) {
            active = "conversation";
        }
        if(this.state.read)
            badge = '';
        return(
            <div>
                <li role="button" className={active} onClick={(e) => this.onClick(this.state.id)}>
                    <div className="media-left media-top">
                        <img src={user.pic} width="40" height="40"/></div>
                    <div className="media-body"> {user.fullName}
                        {badge}
                        <br />
                        <p className="prevMessage">{this.getLastMessage()}</p>
                    </div>
                </li>
            </div>
        )
    }
}