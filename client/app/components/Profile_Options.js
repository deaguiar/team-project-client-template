import React from 'react';
import { getUserData } from '../server.js'

export default class Profile_Options extends React.Component {
  constructor(props) {
    super(props);
    this.state = props.data;
  }

  setUserData(data, t)
  {
    t.setState({data: data});
  }

  componentDidMount() {
    getUserData(4, this.setUserData, this);
  }

  popAlert(e) {
    e.preventDefault()
    alert("Work in Progress...");
  }

  render(){
    var user = this.state.id;

    return (
      <div>
        <div className="row">
          <div className="col-md-12">
            <img src={user.pic} style={{width:'75%'}} />
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
