
import React from 'react';
import Navbar from './navbar';
import {getAllCommentsForAPost, getTopXHotPosts,getUserData,getAllPostsWithText, messageUser, readMessage, getMessageList} from '../server.js';
import {createMapURL, initMapReact} from '../util.js';
import ReactDOM from 'react-dom';
import ResetDatabase from './resetdatabase';


export default class Index extends React.Component {
    constructor(props) {
        super(props);
        this.state = props.data;
        this.posts = [];
        this.comments = [];
        this.state = {
          value: ""
        }
      }

      setComments(data, t)
      {
        t.comments.push(data);
        t.forceUpdate();
      }
      refresh() {
          getMessageList(3, (data) => {
             this.setState(data);
          });
      }
      setUserData(data, t)
      {
        t.setState({userData: data});
      }
      hasActiveChat() {
          return this.state.active > -1;
      }

      handleChange(e) {
          this.setState({ value: e.target.value });
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
      getLastMessage() {
          var length = this.state.postText.length;
          return this.state.posts[length - 1].postText;
      }

      componentDidMount()
      {
          getTopXHotPosts(100, this.setPosts, this);
          this.setState({active: 0});
          this.setState({userData: undefined});
          getUserData(3, this.setUserData, this);
          this.refresh();
      }

      handleChange(e) {
        e.preventDefault();
        this.setState({ value: e.target.value });
      }
      onPost(postContents) {
        // Send to server.
        // We could use geolocation to get a location, but let's fix it to Amherst
        // for now.
      getAllPostsWithText(4, "Amherst, MA", postContents, () => {
          // Database is now updated. Refresh the feed.
          this.refresh();
        });
      }

      handleKeyUp(e) {
        e.preventDefault();
        if (e.key === "Enter") {
          var comment = this.state.value.trim();
          if (comment !== "") {
            // Post comment
            this.props.onPost(this.state.value);
            this.setState({ value: "" });
          }
        }
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

                                  <a href="/profile.html">{post.person.fullName}</a>
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
                             <input type="text" className="form-control" placeholder="Post a comment..."
                               value={this.state.value} onChange={(e) => this.handleChange(e)}
                               onKeyUp={(e) => this.handleKeyUp(e)} />
                  <span className="input-group-btn">
                        <button type="button" className="btn btn-default" onClick={(e) => this.handleChange(e)}>
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
