
import React from 'react';
import Navbar from './navbar';
import {getAllCommentsForAPost, getTopXHotPosts,getUserData,editUserData} from '../server.js';
import {initMapReact} from '../util.js';
import ResetDatabase from './resetdatabase';
import ErrorBanner from './errorbanner';


export default class Index extends React.Component {
    constructor(props) {
        super(props);
        this.state = props.data;
        this.posts = [];
        this.comments = [];
        this.state = {
        post: ""
        }
      }
      hanldePostData(e) {
      e.preventDefault();


        var newUserData = {fullName: this.state.fullName,
        userName: this.state.userName, email: this.state.email,
        city: this.state.city,post:this.state.post};

        editUserData("000000000000000000000003", newUserData, (data) => {
          this.setState(data);

        });

      }
      refresh() {
        getUserData("000000000000000000000003", (data) => {
          this.setState(data);
          });
      }
      setUserData(data, t)
      {
        t.setState({userData: data});
      }


      setPosts(data, t)
      {
        t.posts = data;
        t.forceUpdate();
        for (var post in t.posts)
        {
          getAllCommentsForAPost(t.posts[post].postID, t.setComments, t);
        }
        if (window.google != undefined)
          window.initMap = initMapReact(window.google, t.map, t.posts);
      }

      componentDidMount()
      {
          getTopXHotPosts(100, this.setPosts, this);
          this.refresh();
      }

      onPostChange(e) {
        this.setState({post: e.target.value});
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
                  <div className="row">
                    <div className="col-md-8">
                      <div style ={{width: 999 + 'px'}}> </div>
                          <div id="map" ref={(ref) => {this.map = ref; }}></div>
<ResetDatabase />
                            </div>
                              <div className ="col-md-4">
                  <div className= "col-md-10 feed-title white">
                  <span className="glyphicon glyphicon-pencil"></span>
                    <a1>   WHAT ARE PEOPLE SAYING</a1>
                  </div>
                    <div  className="feed-left-side input-group">
                      <div className="row">
                          <div className="col-md-12 feed">
                {this.posts.map(function(post)
                  {
                    return (

                              <ul className="feed-list">
                                  <div className="feed-body">
                                    <span className="glyphicon glyphicon-map-marker"></span>

                                  <Link to="profile/">{post.person.fullName}</a>
                                  <div className="controls text-wrap">
                                    <p className="feed-body">
                                      {post.postText}
                                    </p>
                                      </div>
                                  </div>
                                  <div className="col-md-12 vote-bar">
                                    <div className="btn-group pull-right" role="group">
                                    <button type="button" className="btn btn-xs white">
                                    <span className="glyphicon glyphicon-menu-up upvote">{post.upvotes}</span>
                                    </button>
                                    <button type="button" className="btn btn-xs white">
                                      <span className="glyphicon glyphicon-menu-down downvote">{post.downvotes}</span>

                                     </button>
                                      </div>
                                    </div>
                              </ul>
                    )

                  }, null)
                }

                </div>
                </div>
                </div>
                <div className ="row">
                    <div className ="col-md-9 post-section">
                         <div className="media-footer">
                           <div className="input-group">
                             <input type="text" className="form-control" id="form-control" placeholder="Post a comment..."
                               value={this.state.value}
                               onChange={(e) => this.onPostChange(e) }/>


                  <span className="input-group-btn">
                        <button type="button" className="btn btn-default" id="form-control" onClick={(e) => this.hanldePostData(e)}>
                          <span className="glyphicon glyphicon-map-marker" />
                    </button>
                          </span>
                                            </div>
                                        </div>
                                    </div>
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
                  <div className="container" style={{paddingTop: 70 + 'px'}}>
                    <div className="row">
                      <div className="col-md-8">
                        <div style ={{width: 999 + 'px'}}> </div>
                          <div id="map" ref={(ref) => {this.map = ref; }}></div>
                              </div>
                                <div className ="col-md-4">
                      <div className= "col-md-10 feed-title white">
                      <span className="glyphicon glyphicon-pencil"></span>
                        <a1>   WHAT ARE PEOPLE SAYING</a1>
                      </div>
                        </div>
                          </div>
                              </div>
                                  </div>

        )
      }


      }
}
