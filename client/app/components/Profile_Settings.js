import React from 'react';
import Navbar from './navbar';
import Settings_Table from './Settings_Table';
import Profile_Options from './Profile_Options';

export default class Profile_Settings extends React.Component {

  render() {
    return (
      <div>
        <Navbar />
        <div className="container" style={{paddingTop: 70 + 'px'}} />

          <div className="container body-container">
              <div className="row">
                <div className="col-md-1">
                </div>
                <div className="col-md-7 table-panel">
                  <Settings_Table />
                </div>
                <div className="col-md-1">
                </div>
                <div className="col-md-3 right-bar">
                  <Profile_Options />
                </div>
              </div>
            </div>
      </div>
    );
  }
}
