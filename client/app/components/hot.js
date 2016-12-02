import React from 'react';
import Navbar from './navbar';
import {getAllCommentsForAPost, getTopXHotPosts} from '../server.js';
import {unixTimeToString} from '../util.js';
import SearchResultsComments from './SearchResultsComments'

export default class Hot extends React.Component {
    constructor(props) {
        super(props);
        this.state = props.data;
        this.posts = [];
        this.comments = [];
      }

      setComments(data, t)
      {
        t.comments.push(data);
        t.forceUpdate();
      }

      setPosts(data, t)
      {
        t.posts = data;
        t.forceUpdate();
        // now for each post get the comments
        for (var post in t.posts)
        {
          getAllCommentsForAPost(t.posts[post].postID, t.setComments, t);
        }
      }

      componentDidMount()
      {
          getTopXHotPosts(10, this.setPosts, this);
      }

      onCommentsClick(postID)
      {
        for (var post in this.posts)
        {
          if (this.posts[post].postID == postID)
          {
            if (this.posts[post].showComments == false)
            {
              this.posts[post].showComments = true;
            }
            else
            {
              this.posts[post].showComments = false;
            }
          }
        }
        this.forceUpdate();
      }

      render() {
        if (this.posts.length > 0)
        {
        var comments = this.comments;
        this.posts.map(function(a,b){
          a.comments = comments[b];
          return a;
        });

        return (
          <div>
            <Navbar/>
              <div className="container" style={{paddingTop: 70 + 'px'}}>
                {this.posts.map(function(post)
                  {
                    return (
                      <div key={post.postID} className="panel panel-default panel-colors">
                        <div className="panel-body">
                          <div className="row">
                            <div className="col-md-10 col-centered">
                              <ul className="nav nav-pills">
                                <li className="pull-right">
                                  <a href="/profile.html" className="override-boostrap-hyperlink">{post.person.fullName}</a>
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
                        {post.showComments ? <SearchResultsComments postID={post.postID} comments={post.comments}/> : null}
                      </div>
                    )
                  }, this)
                }
            </div>
        </div>
        )
      }
      else
      {
        return (
          <div>
                <Navbar/>

                <div className="container" style={{paddingTop: 70 + 'px'}}>

                <div className="col-md-11 col-centered">
                  <div>
                    <div className="panel panel-default panel-colors">
                      <div className="panel-body">
                        <div className="row">
                          <div className="col-md-10 col-centered">
                            <ul className="nav nav-pills">
                              <li role="presentation" className="active">
                                <div className="controls text-wrap">
                                  <div className="form-control-static post-text">
                                    <div>Unable to retrieve hot posts</div>
                                  </div>
                                </div>
                              </li>
                            </ul>
                          </div>
                        </div>
                        <div className="row">
                          <div className="col-md-10">
                          </div>
                        </div>
                      </div>
                    </div>

                </div>
                </div>

                <div className="row">
                  <div className="col-md-10">
                    <ul className="nav nav-pills pull-left results-footer">
                    </ul>
                  </div>
                </div>

                </div>

          </div>
        )
      }

      }
}
