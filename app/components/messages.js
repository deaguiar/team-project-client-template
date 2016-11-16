import React from 'react';
import {getUserData} from '../server.js';
import {unixTimeToString} from '../util.js'

export default class Messages extends React.Component {
    constructor(props) {
        super(props);
        this.state = props.data;
        this.state.chatter = props.parentID;
    }
    render() {
        var user = getUserData(this.state.from);
        //if(this.state.chatter != this.state.id)//means we are the one talking

        return(
            <div>
                <img src={user.pic} width="40" height="40"/>
                {this.state.message}
                <br />{unixTimeToString(this.state.timestamp)}
                <hr />
            </div>
        )
    }
}