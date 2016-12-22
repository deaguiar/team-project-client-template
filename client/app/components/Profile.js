import React from 'react';
import {unixTimeToString, createMapURL} from '../util.js'
import Navbar from './navbar'
import getUserData from '../server.js'

export default class Profile extends React.Component
{
  constructor(props)
  {
    super(props);
    this.state = {};
  }

  componentDidMount() {
    getUserData("000000000000000000000003", (data) => {
      this.setState(data);
    });
  }

  render()
  {
    var query = this.props.location.query;
    var posts = getAllPostsWithText(query)
	var user = posts.user
    if (posts.length > 0 && query != "" && user == 2)
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
                    <div>
                      <div className="panel panel-default panel-colors">
                        <div className="panel-body">
                          <div className="row">
                            <div className="col-md-10 col-centered">
                              <ul className="nav nav-pills">
                                <li role="presentation">
                                  <img width="200" src={createMapURL(post.lat, post.long)}/>
                                </li>
                                <li className="pull-right">
                                  <Link to="profile/" className="override-boostrap-hyperlink">{getUserData(post.user).fullName}</link>
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
    </div>
      )
    }
    else
    {
      return (
        <div>
              <Navbar/>
  			<div class="col-md-3">
  			<div class="row">
  				<div class="col-md-12">
  					<img src="img/Kappa.png" width="75%">
  				</div>
  			</div>
  			<ul class="nav nav-pills nav-stacked">
  				<li role="presentation">
  					<a href="private_message.html">
  						<span class="glyphicon glyphicon-triangle-right"></span>
  						Birthday: XX/XX/XXXX
  					</a>
  				</li>
  				<li role="presentation">
  					<a href="private_message.html">
  						<span class="glyphicon glyphicon-triangle-right"></span>
  						Date Joined: YY/YY/YYYY
  					</a>
  				</li>
  				<li role="presentation">
  					<a href="search_results.html">
  						<span class="glyphicon glyphicon-triangle-right"></span>
  						Location: ??????, ?????
  					</a>
  				</li>
  				<li role="presentation">
  					<a href="#">
  						<span class="glyphicon glyphicon-triangle-right"></span>
  						Followers: ??????
  					</a>
  				</li>
  				<li role="presentation">
  					<a href="#">
  						<span class="glyphicon glyphicon-triangle-right"></span>
  						Followed: ??????
  					</a>
  				</li>
  			</ul>
  		</div>

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
