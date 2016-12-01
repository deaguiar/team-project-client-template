import React from 'react';
import {unixTimeToString} from '../util.js';
import {Link} from 'react-router';

export default class Messages extends React.Component {
    constructor(props) {
        super(props);
        this.state = props.data;
        this.state.chatter = props.parentID;
    }
    render() {
        var user = this.state.from;
        return(
            <div>
                <div className="media-left media-top">
                  <img src={user.pic} width="40" height="40"/>
                </div>
                <div className="media-body">
                    <Link to={"/profile/" + user._id}>
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
