import React from 'react';
import Navbar from '../navbar.js';

export default class MessageFrame extends React.Component {

  render() {
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
                              <ul className="nav nav-pills">
                                  <li role="presentation">
                                      <a href="#"> Billy Bob
                                      <span className="badge pull-right">1</span>
                                      </a>
                                  </li>
                                  <li role="presentation" className="active">
                                      <a href="#">
                                          Tim Richards
                                      </a>
                                  </li>
                                  <li role="presentation">
                                      <a href="#">
                                          Sally Musket
                                      </a>
                                  </li>
                                  <li role="presentation">
                                      <a href="#">
                                          Elliot Anderson
                                      </a>
                                  </li>
                                  <li role="presentation">
                                      <a href="#">
                                          Mike Tyson
                                      </a>
                                  </li>
                              </ul>
                          </div>
                      </div>
                  </div>
                  <div className="col-md-9">

                  </div>
              </div>
          </div>
      </div>
    )
  }
}
