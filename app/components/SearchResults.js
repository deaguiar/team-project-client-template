import React from 'react';
import {getAllPostsWithText, getUserData} from '../server.js';
import {unixTimeToString} from '../util.js'

export default class SearchResults extends React.Component
{
  constructor(props)
  {
    super(props);
  }

  render()
  {
    return (
    <div>
          <div className="container" style={{'padding-top': 70 + 'px'}}>

          <div className="col-md-11 col-centered">
            <div>
              {getAllPostsWithText("Lorem ipsum").map(function(post)
                {
                  return (
                    <div className="panel panel-default panel-colors">
                      <div className="panel-body">
                        <div className="row">
                          <div className="col-md-10 col-centered">
                            <ul className="nav nav-pills">
                              <li role="presentation">
                                <img width="200" src="http://maps.googleapis.com/maps/api/staticmap?center=42.38666512+-72.52333124&zoom=13&scale=1&size=200x200&maptype=roadmap&key=AIzaSyDGuGiLXDNcw84JU6I7ldZF63sxBLP6z7s&format=png&visual_refresh=true&markers=size:mid%7Ccolor:0xff0000%7Clabel:1%7C42.389825, -72.528267" alt="Google Map of 42.389825, -72.528267"/>
                              </li>
                              <li className="pull-right">
                                <a href="/profile.html" className="override-boostrap-hyperlink">{getUserData(post.user).fullName}</a>
                                <br><text>{unixTimeToString(post.date)}</text></br>
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
                                <a href="#"><span className="glyphicon glyphicon-pencil">
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
                    </div>
                  )
                }
            )}
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
