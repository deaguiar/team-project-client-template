import React from 'react';
import { getUserData, editUserData } from '../server.js';

export default class Settings_Table extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      fullName: "", userName: "", email: "", city: ""
    };
  }

saveData(e) {
e.preventDefault();

  var newUserData = {fullName: this.state.fullName,
  userName: this.state.userName, email: this.state.email,
  city: this.state.city};

  editUserData("000000000000000000000003", newUserData, (data) => {
    this.setState(data);
  });
}

refresh() {
  getUserData("000000000000000000000003", (data) => {
    this.setState(data);
  });
}

componentDidMount(){
  this.refresh();
}

  onFullNameChange(e) {
    this.setState({fullName: e.target.value});
  }

  onUserNameChange(e) {
    this.setState({userName: e.target.value});
  }

  onEmailChange(e) {
    this.setState({email: e.target.value});
  }

  onCityChange(e) {
    this.setState({city: e.target.value});
  }

  render() {
    return(
      <div>
        <table className = "table table-hover" style={{width:'600px'}}>
          <caption>General Settings</caption>
          <tr>
            <th>Name</th>
            <td><input type="text" className="form-control" style={{border:'none'}}
              value={this.state.fullName} onChange={(e) => this.onFullNameChange(e)}/></td>
          </tr>
          <tr>
            <th>Username</th>
            <td><input type="text" className="form-control" style={{border: 'none'}}
              value={this.state.userName} onChange={(e) => this.onUserNameChange(e)}/></td>
          </tr>
          <tr>
            <th>Email</th>
              <td><input type="text" className="form-control" style={{border: 'none'}}
                value={this.state.email} onChange={(e) => this.onEmailChange(e)}/></td>
          </tr>
          <tr>
            <th>Default City</th>
              <td><input type="text" className="form-control" style={{border: 'none'}}
                value={this.state.city} onChange={(e) => this.onCityChange(e)}/></td>
          </tr>
          <tr>
            <th></th>
            <td></td>
            <td>
              <button onClick={(e) => this.saveData(e)}>Save</button>
            </td>
          </tr>
        </table>
      </div>
    )
  }
}
