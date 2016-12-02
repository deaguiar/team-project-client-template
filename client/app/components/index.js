
import React from 'react';
import Navbar from './navbar.js';
import {getUserData, messageUser, readMessage} from '../server.js';
import {Link} from 'react-router';
import Post from './post.js';

export default class Index extends React.Component {
    constructor(props) {
        super(props);
        this.state = {};
    }
    componentDidMount()
    {
        this.setState({active: 0});
        this.setState({userData: undefined});
        getUserData(3, this.setUserData, this);
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


    // this function will no longer work since getUserData has changed
    // idk who is using this
    getNameOfChat() {
        return getUserData(this.state.chats[this.state.active].chatID).fullName;
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

  render() {

        var chatName = "";
        if(this.hasActiveChat())
            chatName;

    return (
        <div>
          <Navbar />

          <div style={{paddingTop: 70}}>
          <div className="container" >
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

  <div className="feed-left-side input-group">
    <div className="row">
    <div className="col-md-12 feed">
      <ul className="feed-list">
      <div className="feed-left feed-top">
      </div>
          <div className="feed-body">
             {this.state.fullName} <hr /></div>
                     <div className="feed-body">
                          {this.state.text}

          <div/>
              <div className="feed-body">

                        </div>
                      </div>
                    </ul>
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
                   </div>
                        </div>



    )
  }


}
