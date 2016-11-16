import React from 'react';
import Navbar from './navbar.js';
import {getUserData} from '../server.js';
import Conversation from './conversation.js';

export default class MessageFrame extends React.Component {
    constructor(props) {
        super(props);
        this.state = getUserData(3);//Need to pass dynamic user ID to this!
        this.state.active = 0;//should be -1, but we will set to 0
    }

    hasActiveChat() {
        return this.state.active > -1;
    }

    getNameOfChat() {
        return getUserData(this.state.chats[this.state.active].chatID).fullName;
    }

  render() {
        var chatName = 'Click a conversation to view messages!';
        if(this.hasActiveChat())
            chatName = this.getNameOfChat();
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
                                  <div className="media-list">
                                          {this.state.chats.map( (map, i) => {
                                              return (
                                                  <Conversation key={i} data={map} />
                                              );
                                          })}
                                  </div>
                          </div>
                      </div>
                  </div>
                  <div className="col-md-9">
                      <div className="panel">
                          <div className="panel-heading">
                              {chatName}
                              <div className="btn-group pull-right" role="group">
                                  <button type="button" className="btn btn-default new-message">
                                      <span className="glyphicon glyphicon-plus">New Message</span>
                                  </button>
                                  <button type="button" className="btn btn-default new-message">
                                      <span className="glyphicon glyphicon-road">Last Location</span>
                                  </button>
                              </div>
                              <hr>
                                  <div className="media-list">
                                      {this.state.chats[this.state.active].messages.map( (map, i) => {
                                          return (
                                              <Messages key={i} chatUser={getUserData(map.chatID)} data={map} />
                                          );
                                      })}
                                  </div>
                              </hr>
                          </div>
                      </div>
                  </div>
              </div>
          </div>
      </div>
    )
  }

}
