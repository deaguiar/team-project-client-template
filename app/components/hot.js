import React from 'react';
import Navbar from './navbar';
//import {getUserData} from '../server.js';
//import {unixTimeToString} from '../util.js'

export default class Hot extends React.Component {
    constructor(props) {
        super(props);
      }
      render() {
        return (
          <div>
          <Navbar />
          <div classNameName="container">
              <div className="row">
                  <div className="row col-md-12">
                      <div className="panel">
                          <div className="panel-heading">
                              <div className="input-group">
                                  <input type="text" className="form-control" placeholder="Search Top Posts" />
                                  <span className="input-group-btn">
                                  <button type="submit" className="btn btn-default">
                                      <span className="glyphicon glyphicon-search"></span>
                                  </button></span>
                              </div>
                              <div className="btn-group pull-right" role="group">
                                <div className="dropdown">
                                  <button className="btn btn-default dropdown-toggle" type="button" id="menu1" data-toggle="dropdown">Filter By: <span className="caret"></span></button>
                                    <ul className="dropdown-menu" role="menu" aria-labelledby="menu1">
                                      <li role="presentation"><a role="menuitem" href="#">All Time</a></li>
                                      <li role="presentation" className="divider"></li>
                                      <li role="presentation"><a role="menuitem" href="#">Location</a></li>
                                      <li role="presentation"><a role="menuitem" href="#">Groups</a></li>
                                      <li role="presentation"><a role="menuitem" href="#">Post Date</a></li>
                                    </ul>
                                  </div>
                              </div>
                          </div>
                          <br />
                          <hr />
                              <ul className="media-list">
                                  <li className="media">
                                      <div className="pull-left incoming-message">
                                          <img src="img/BibleThump.png" width="40" height="40" />
                                          Are you in ISB? As in the Integrated Learning Center?
                                          <sub><br className="pull-left" />1 year ago</sub>
                                          <div className="col-md-12">
                                          <div className="btn-group top-posts-votes" role="group">
                                          <button type="button" className="btn btn-xs white">
                                          <span className="glyphicon glyphicon-menu-up"></span>44
                                          </button>
                                          <button type="button" className="btn btn-xs white">
                                          <span className="glyphicon glyphicon-menu-down"></span>44
                                           </button>
                                            </div>
                                          </div>
                                      </div>
                                  </li>
                                  <li className="media">
                                      <div className="pull-left incoming-message">
                                          <img src="img/BibleThump.png" width="40" height="40" />Ill take the escalator
                                          <sub><br className="pull-left" />4 months ago</sub>
                                          <div className="col-md-12">
                                          <div className="btn-group top-posts-votes" role="group">
                                          <button type="button" className="btn btn-xs white">
                                          <span className="glyphicon glyphicon-menu-up"></span>44
                                          </button>
                                          <button type="button" className="btn btn-xs white">
                                          <span className="glyphicon glyphicon-menu-down"></span>44
                                           </button>
                                            </div>
                                          </div>
                                      </div>
                                  </li>
                                  <li className="media">
                                      <div className="pull-left incoming-message">
                                          <img src="img/BibleThump.png" width="40" height="40" /> Ill take the escalator!
                                          <sub><br className="pull-left" />4 months ago</sub>

                                          <div className="col-md-12">
                                          <div className="btn-group top-posts-votes" role="group">
                                          <button type="button" className="btn btn-xs white">
                                          <span className="glyphicon glyphicon-menu-up"></span>44
                                          </button>
                                          <button type="button" className="btn btn-xs white">
                                          <span className="glyphicon glyphicon-menu-down"></span>44
                                           </button>
                                            </div>
                                          </div>
                                      </div>
                                  </li>
                                  <li className="media">
                                      <div className="pull-left incoming-message">
                                          <img src="img/BibleThump.png" width="40" height="40" /> Ill take the escalator!
                                          <sub><br className="pull-left" />4 months ago</sub>
                                          <div className="col-md-12">
                                          <div className="btn-group top-posts-votes" role="group">
                                          <button type="button" className="btn btn-xs white">
                                          <span className="glyphicon glyphicon-menu-up"></span>44
                                          </button>
                                          <button type="button" className="btn btn-xs white">
                                          <span className="glyphicon glyphicon-menu-down"></span>44
                                           </button>
                                            </div>
                                          </div>
                                      </div>
                                  </li>
                                  <li className="media">
                                      <div className="pull-left incoming-message">
                                          <img src="img/BibleThump.png" width="40" height="40" /> Ill take the escalator!
                                          <sub><br className="pull-left" />4 months ago</sub>

                                          <div className="col-md-12">
                                          <div className="btn-group top-posts-votes" role="group">
                                          <button type="button" className="btn btn-xs white">
                                          <span className="glyphicon glyphicon-menu-up"></span>44
                                          </button>
                                          <button type="button" className="btn btn-xs white">
                                          <span className="glyphicon glyphicon-menu-down"></span>44
                                           </button>
                                            </div>
                                          </div>
                                      </div>
                                  </li>
                              </ul>
                          <div className="panel-footer">

                          </div>
                      </div>
                  </div>
              </div>
          </div>
        </div>
        )
      }
}
