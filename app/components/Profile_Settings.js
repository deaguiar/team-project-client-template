import React from 'react';
//import ReactDOM from 'react-dom';
import {Settings_Table} from './Settings_Table';
import {Navbar} from './navbar';
import {Profile_Options} from './Profile_Options';

export default class Profile_Settings extends React.Component {
  render() {
    return (
      <div>
        <Navbar />
        <Settings_Table />
        <Profile_Options />
      </div>
    )
  }
}
