import React from 'react';
import {getUserData} from '../server.js';
import {unixTimeToString} from '../util.js';
import {Link} from 'react-router';

export default class Messages extends React.Component {
    constructor(props) {
        super(props);
        this.state = props.data;
        this.state.chatter = props.parentID;
    }
    render() {
        var user = getUserData(this.state.from);
        var chatUser = "otherChatter"
        if(this.state.chatter != this.state.id)//means we are the one talking
            chatUser = 'youChatter'
        return(
            <div>
                <div className="media-left media-top">
                    <img src={user.pic} width="40" height="40"/>
                </div>
                <div className="media-body">
                    <Link to={"/profile/" + user.id}>
                        {user.fullName}</Link>
                    <br />
                    {this.state.message}
                    <br />
                    <sub>{unixTimeToString(this.state.timestamp)}</sub>
                </div>
                <hr />
            </div>
        )
    }
}