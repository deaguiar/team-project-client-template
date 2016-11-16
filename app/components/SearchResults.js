import React from 'react';
import {getAllPostsWithText, getUserData} from '../server.js';
import {unixTimeToString, createMapURL} from '../util.js'
import Navbar from './navbar'

export default class SearchResults extends React.Component
{
  constructor(props)
  {
    super(props);
  }

  onCommentsClick(postID)
  {
    console.log(postID);
  }

  render()
  {
    var query = this.props.location.query;
    var posts = getAllPostsWithText(query)

    if (posts.length > 0 && query != "")
    {
    return (
    <div>
          <Navbar/>

          <div className="container" style={{paddingTop: 70 + 'px'}}>

          <div className="col-md-11 col-centered">
            <div>

              {posts.map(function(post)
                {
                  return (
                    <div className="panel panel-default panel-colors">
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
                                <button onClick={() => this.onCommentsClick(post.postID)}><span className="glyphicon glyphicon-pencil">
                                </span> <strong>View Comments</strong></button>
                              </li>
                              <li role="presentation" className="active">
                                <a href="#"><span className="glyphicon glyphicon-triangle-right">
                                </span> <strong>View Full Post</strong></a>
                              </li>
                            </ul>
                          </div>
                        </div>
                      </div>
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
                              <p className="form-control-static post-text">
                                <div>There are no results for "{query}"</div>
                              </p>
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
