import React from 'react';
import {getUserData,getAllPostsWithText} from '../server.js';
import {Link} from 'react-router';

export default class Post extends React.Component {
    constructor(props) {
        super(props);
        this.state = props.data;
        this.state.chatter = props.parentID;


    }
    render() {
        var user = getUserData(this.state.from);
        var post = getAllPostsWithText(this.state.from);
            return(
                <div>
                    <div className="media-body">
                    <span className="glyphicon glyphicon-map-marker"></span>
                        <Link to={"/profile/" + user.id}>
                            {user.fullName}</Link>
                        <br />
                        {this.state.message}

                    </div>
                    <div className="col-md-12 vote-bar">
                        {post.postText}
                      <div className="btn-group pull-right" role="group">
                      <button type="button" className="btn btn-xs white">
                      <span className="glyphicon glyphicon-menu-up ">{post.upvotes}</span>
                      </button>
                      <button type="button" className="btn btn-xs white">
                      <span className="glyphicon glyphicon-menu-down ">{post.downvotes}</span>
                       </button>
                        </div>
                      </div>

                </div>
            )
        }
    }
