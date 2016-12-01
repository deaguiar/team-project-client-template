import React from 'react';
import {getAllPostsWithText, getUserData} from '../server.js';
import {unixTimeToString, createMapURL} from '../util.js'
import Navbar from './navbar'
import SearchResultsComments from './SearchResultsComments'

export default class SearchResults extends React.Component
{
  constructor(props)
  {
    super(props);

    this.query = this.props.params.query;
    this.posts = [];
  }

  setPosts(data, t)
  {
    t.posts = data;
    t.forceUpdate();
  }
  componentDidMount()
  {
      getAllPostsWithText(this.query, this.setPosts, this);
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

  render()
  {
    if (this.posts.length > 0 && this.query != "")
    {
    return (
    <div>
          <Navbar/>

          <div className="container" style={{paddingTop: 70 + 'px'}}>

          <div className="col-md-11 col-centered">
            <div>

              {this.posts.map(function(post)
                {
                  return (
                    <div key={post.postID} className="panel panel-default panel-colors">
                      <div className="panel-body">
                        <div className="row">
                          <div className="col-md-10 col-centered">
                            <ul className="nav nav-pills">
                              <li role="presentation">
                                <img width="200" src={createMapURL(post.lat, post.long)}/>
                              </li>
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
                                <div>There are no results for "{this.query}"</div>
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
