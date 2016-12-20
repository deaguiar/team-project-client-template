import React from 'react';
import { getUserData } from '../server.js'

export default class Profile_Options extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  componentDidMount() {
    getUserData("000000000000000000000003", (data) => {
      this.setState(data);
    });
  }

  popAlert(e) {
    e.preventDefault()
    alert("Work in Progress...");
  }

  render(){

    return (
      <div>
        <div className="row">
          <div className="col-md-12">
            <img src={this.state.pic} style={{width:'75%'}} />
            <br /><a href="#/settings/">Update Profile Picture</a>
          </div>
        </div>
        <ul className="nav nav-pills nav-stacked">
          <li role="presentation" className="active">
            <a href="#/settings/">
              <span className="glyphicon glyphicon-info-sign"></span>
              General
            </a>
          </li>
          <li role="presentation">
            <a href="#" onClick={(e) => this.popAlert(e)}>
              <span className="glyphicon glyphicon-lock"></span>
              Security
            </a>
          </li>
          <li role="presentation">
            <a href="#" onClick={(e) => this.popAlert(e)}>
              <span className="glyphicon glyphicon-globe"></span>
              Followers
            </a>
          </li>
        </ul>
      </div>
    )
  }
}
