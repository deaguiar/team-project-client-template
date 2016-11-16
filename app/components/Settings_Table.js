import React from 'react';

export default class Settings_Table extends React.Component {
  constructor(props) {
    super(props);
  }

  render(){
    return(
      <div>
        <table className = "table table-hover" style="width:600px">
          <caption>General Settings</caption>
          <tr>
            <th>Name</th>
            <td>Elliot Alderson</td>
            <td>
              <a href="#" className="pull-right">
                <span className="glyphicon glyphicon-pencil"></span>
                Edit
              </a>
            </td>
          </tr>
          <tr>
            <th>Username</th>
            <td>Mr. Robot</td>
            <td>
              <a href="#" className="pull-right">
                <span className="glyphicon glyphicon-pencil"></span>
                Edit
              </a>
            </td>
          </tr>
          <tr>
            <th>Email</th>
            <td>Elliot Alderson</td>
            <td>
              <a href="#" className="pull-right">
                <span className="glyphicon glyphicon-pencil"></span>
                Edit
              </a>
            </td>
          </tr>
          <tr>
            <th>Default City</th>
            <td>Amherst</td>
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
