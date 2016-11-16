import React from 'react';

export default class Profile_Options extends React.Component {
  render(){

    return (
      <div>
        <div className="row">
          <div className="col-md-12">
            <img src="img/profile_img.jpg" style={{width:'75%'}} />
            <br /><a href="#">Update Profile Picture</a>
          </div>
        </div>
        <ul className="nav nav-pills nav-stacked">
          <li role="presentation" className="active">
            <a href="#">
              <span className="glyphicon glyphicon-info-sign"></span>
              General
            </a>
          </li>
          <li role="presentation">
            <a href="#">
              <span className="glyphicon glyphicon-lock"></span>
              Security
            </a>
          </li>
          <li role="presentation">
            <a href="#">
              <span className="glyphicon glyphicon-globe"></span>
              Followers
            </a>
          </li>
        </ul>
      </div>
    )
  }
}
