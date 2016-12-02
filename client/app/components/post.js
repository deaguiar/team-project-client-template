import React from 'react';
import {Link} from 'react-router';

export default class Post extends React.Component {
    constructor(props) {
        super(props);
        this.state = props.data;

    }
    render() {
        var user = this.state.from;
        return(
            <div>

                <div className="media-body">
                    <span className="glyphicon glyphicon-map-marker"></span>
                    <Link to={"/profile/" + user._id}>
                        {user.fullName}</Link>
                    <br />
                    {this.state.message}
                    <br />

                </div>
                <hr />
            </div>
        )
    }
}
