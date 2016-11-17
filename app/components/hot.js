import React from 'react';
import Navbar from './navbar';
import {getUserData, getAllPostsWithText} from '../server.js';
import {unixTimeToString} from '../util.js';
import SearchResultsComments from './SearchResultsComments'

export default class Hot extends React.Component {
    constructor(props) {
        super(props);
        this.state = props.data;
      }
      render() {
        this.query = 'h'
        this.posts = getAllPostsWithText(this.query);
        return (
          <div>
            <Navbar/>
              <div className="container">
                {this.posts.map(function(post)
                  {
                    return (
                      <div className="panel panel-default panel-colors">
                        <div className="panel-body">
                          <div className="row">
                            <div className="col-md-10 col-centered">
                              <ul className="nav nav-pills">
                                <li className="pull-right">
                                  <a href="/profile.html" className="override-boostrap-hyperlink">{getUserData(post.user).fullName}</a>
                                  <br></br><text>{unixTimeToString(post.date)}</text>
                                </li>
                                <li role="presentation" className="active">
                                  <div className="controls text-wrap">
                                    <p className="form-control-static post-text">
                                      {post.postText}
                                    </p>
                                  </div>
                                </li>
                              </ul>
                            </div>
                          </div>
                          <div className="row">
                            <div className="col-md-10">

                              <ul className="nav nav-pills pull-left post-options">
                                <li className="col-centered">
                                  <span className="glyphicon glyphicon-menu-up upvote">{post.upvotes}</span>
                                </li>
                                <li className="col-centered">
                                  <span className="glyphicon glyphicon-menu-down downvote">{post.downvotes}</span>
                                </li>
                              </ul>

                              <ul className="nav nav-pills pull-right post-options">
                                <li role="presentation" className="active">
                                  <a onClick={() => this.onCommentsClick(post.postID)}><span className="glyphicon glyphicon-pencil">
                                  </span> <strong>View Comments</strong></a>
                                </li>
                                <li role="presentation" className="active">
                                  <a href="#"><span className="glyphicon glyphicon-triangle-right">
                                  </span> <strong>View Full Post</strong></a>
                                </li>
                              </ul>
                            </div>
                          </div>
                        </div>
                        {post.showComments ? <SearchResultsComments postID={post.postID} /> : null}
                      </div>
                    )
                  }, this)
                }
            </div>
        </div>
        )
      }
}
