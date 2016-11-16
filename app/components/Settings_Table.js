import React from 'react';
import { getUserData } from '../server.js';

export default class Settings_Table extends React.Component {
  constructor(props) {
    super(props);
    this.state = getUserData(3);
  }

  render() {

    return(
      <div>
        <table className = "table table-hover" style={{width:'600px'}}>
          <caption>General Settings</caption>
          <tr>
            <th>Name</th>
            <td>{this.state.fullName}</td>
            <td>
              <a href="#" className="pull-right">
                <span className="glyphicon glyphicon-pencil"></span>
                Edit
              </a>
            </td>
          </tr>
          <tr>
            <th>Username</th>
            <td>{this.state.settings[0].userName}</td>
            <td>
              <a href="#" className="pull-right">
                <span className="glyphicon glyphicon-pencil"></span>
                Edit
              </a>
            </td>
          </tr>
          <tr>
            <th>Email</th>
            <td>{this.state.settings[0].email}</td>
            <td>
              <a href="#" className="pull-right">
                <span className="glyphicon glyphicon-pencil"></span>
                Edit
              </a>
            </td>
          </tr>
          <tr>
            <th>Default City</th>
            <td>{this.state.settings[0].city}</td>
            <td>
              <a href="#" className="pull-right">
                <span className="glyphicon glyphicon-pencil"></span>
                Edit
              </a>
            </td>
          </tr>
        </table>
      </div>
    )
  }
}
