
import React from 'react';
import Navbar from './navbar';
import {getAllCommentsForAPost, getTopXHotPosts,getUserData, messageUser, readMessage, getMessageList} from '../server.js';
import {createMapURL} from '../util.js';



export default class Index extends React.Component {
    constructor(props) {
        super(props);
        this.state = props.data;
        this.posts = [];
        this.comments = [];
        this.state = {};
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


      isChatActive(chatId) {
          return chatId == this.state.active;
      }

      handleConvoChange(event) {
          if(this.state.active == event)
              return;
          readMessage(3, event, (cb) => {
              cb.active = event;
              this.setState(cb);
          });
      }

      isRead(id) {
          return this.state.chats[id].read;
      }

      handleMessageEvent(event) {
          event.preventDefault();
          if(!this.hasActiveChat())
              return;
          if(event.button == 0) {
              var text = this.state.value.trim();
              var callback = (updatedMessage) => {
                  this.setState(updatedMessage);
              }
              messageUser(this.state.id, this.state.active, text, callback);
              this.setState({value: ""});
          }
      }

      setPosts(data, t)
      {
        t.posts = data;
        t.forceUpdate();
        for (var post in t.posts)
        {
          getAllCommentsForAPost(t.posts[post].postID, t.setComments, t);
        }
      }

      componentDidMount()
      {
          getTopXHotPosts(100, this.setPosts, this);
          this.setState({active: 0});
          this.setState({userData: undefined});
          getUserData(3, this.setUserData, this);
          this.refresh();
      }
      handleMessageEvent(event) {
          event.preventDefault();
          if(!this.hasActiveChat())
              return;
          if(event.button == 0) {
              var text = this.state.value.trim();
              var callback = (updatedMessage) => {
                  this.setState(updatedMessage);
              }
              messageUser(this.state.chatOwner._id, this.state.active, text, callback); //only will update ourselves for now!
              //messageUser(this.state.chats[this.state.active].chatID, text, callback);
              this.setState({value: ""});
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
                        <img src="img/sample_map.png" width="100%" />
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
                                                       value={this.state.value}
                                                       onChange={(e) => this.handleChange(e)}/>
                  <span className="input-group-btn">
                        <button type="button" className="btn btn-default" onClick={(e) => this.handleMessageEvent(e)}>
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
                            <img src="img/sample_map.png" width="100%" />
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
