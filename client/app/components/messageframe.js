import React from 'react';
import Navbar from './navbar.js';
import {getUserData, messageUser, readMessage, getMessageList} from '../server.js';
import Conversation from './conversation.js';
import {Link} from 'react-router';
import Messages from './messages.js';

export default class MessageFrame extends React.Component {
    constructor(props) {
        super(props); //we need to be given the userID in the URL!
        this.state = {
            active: -1,
            chats: []
        }
    }
    refresh() {
        getMessageList("000000000000000000000003", (data) => {
           this.setState(data);
        });
    }

    componentDidMount() {
        this.refresh();
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
        if (this.state.active == event)
            return;
        if (this.state.chats[event].read) {
            this.setState({active: event});
        } else {
            readMessage("000000000000000000000003", event, (cb) => {
                cb.active = event;
                this.setState(cb);
            });
        }
    }

    isRead(id) {
        return this.state.chats[id].read;
    }

    isConvoActive() {
        if(this.hasActiveChat()) {
            return (
                <div>
                    <div className ="panel-heading">
                        <Link to={"/profile/" + this.state.chats[this.state.active].chatID._id}>
                        {this.state.chats[this.state.active].chatName}</Link>
                        <div className="btn-group pull-right" role="group">
                            <button type="button" className="btn btn-default new-message">
                                <span className="glyphicon glyphicon-road"> Last Location</span>
                            </button>
                        </div>
                    </div>
                    <hr />
                    <div className="panel-body media-list message-panel message-body">
                        {this.state.chats[this.state.active].messages.map( (map, i) => {
                            return (
                                <Messages key={i + (this.state.active * 1000)} data={map} />
                            );
                        })}
                    </div>
                </div>
            );
        } else {
            return (<div className="panel-heading">Click a conversation to view messages!<hr /></div>)
        }
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
        var chatName = 'Click a conversation to view messages!';
        if(this.hasActiveChat())
            chatName = this.state.chats[this.state.active].chatName;
    return (
      <div>
          <Navbar />
          <div className="container" style={{paddingTop: 53}}>
              <div className="row">
                  <div className="col-md-3">
                      <div className="panel panel-default">
                          <div className="panel-heading">
                              <ul className="list-inline">
                                  <li role="presentation" className="active">
                                      <span className="glyphicon glyphicon-pushpin">Nearby</span>
                                  </li>
                                  <li role="presentation">
                                      <span className="glyphicon glyphicon-envelope">All</span>
                                  </li>
                              </ul>
                          </div>
                          <div className="panel-body" style={{marginBottom: 220}}>
                                  <div className="media-list nav nav-pills message-list">
                                          {this.state.chats.map( (map, i) => {
                                              return (
                                                  <Conversation key={i} _id={i}
                                                                isActive={(e) => this.isChatActive(e)} data={map}
                                                                onClick={(e) => this.handleConvoChange(e)} />
                                              );
                                          })}
                                  </div>
                          </div>
                      </div>
                  </div>
                  <div className="col-md-9">
                      <div className="panel conv-panel">
                              {this.isConvoActive()}
                          <div className="panel-footer">
                              <div className="input-group">
                                  <input type="text" className="form-control message-bar" placeholder="Send a message"
                                         value={this.state.value}
                                         onChange={(e) => this.handleChange(e)}/>
                                    <span className="input-group-btn">
                                        <button type="submit" className="btn btn-default" onClick={(e) => this.handleMessageEvent(e)}>
                                            <span className="glyphicon glyphicon-send" />
                                        </button>
                                    </span>
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
