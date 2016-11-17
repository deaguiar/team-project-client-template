import React from 'react';
//import Navbar from './navbar';
import {getUserData} from '../server.js';
import {unixTimeToString} from '../util.js'

export default class Hot extends React.Component {
    constructor(props) {
        super(props);
        //Ready for the addition of multiple states
        this.state = props.data;
        this.state.chatter = props.parentID;
      }
      render() {
        var user = getUserData(this.state.from);
        return(
            <div>
                <div className="media-left media-top">
                    <img src={user.pic} width="40" height="40"/>
                </div>
                <div className="media-body">
                    {user.fullName}
                    <br />
                    {this.state.message}
                    <br />
                    {unixTimeToString(this.state.timestamp)}
                </div>
                <hr />
            </div>
        )
      }
}
