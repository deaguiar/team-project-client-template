import React from 'react';
import { Router, Link } from 'react-router'
export default class Navbar extends React.Component
{
  constructor(props)
  {
    super(props);
    this.searchText = "Search all posts here";
  }


  onChange(text)
  {
    this.searchText = text.target.value;
  }

  onChangeForm(e)
  {
    e.target.formAction = "#/search/" + this.searchText;
  }

  handleSubmit(event, text)
  {
      event.preventDefault();
      var loc = this._reactInternalInstance._context.router.createLocation('search/');
      loc.query = text;
      this._reactInternalInstance._context.router.transitionTo(loc);
  }


  render()
  {
    return (
      <nav className="container navbar navbar-default navbar-fixed-top navbar-color" style={{width: "auto"}}>
        <div className="navbar-header">
          <button type="button" className="navbar-toggle collapsed" data-toggle="collapse" data-target="#bs-example-navbar-collapse-1" aria-expanded="false">
          <span className="sr-only">Toggle navigation</span>
          <span className="icon-bar"></span>
          <span className="icon-bar"></span>
          <span className="icon-bar"></span>
          </button>
          <a className="navbar-brand" href="index.html" style={{color: "white"}}>
            <span className="glyphicon glyphicon-globe" style={{color: "white"}, {top: 2 + 'px'}, {top: 2 + 'px'}, {paddingRight: 5 + 'px'}}></span>GEOPOST
          </a>

          <a className="navbar-brand" href="index.html" style={{color: "white"}}>
            <span className="glyphicon glyphicon-fire" style={{color: "white"}, {top: 2 + 'px'}, {top: 2 + 'px'}, {paddingRight: 5 + 'px'}}></span>Hot
          </a>


            <Link to="/messages" className="navbar-brand handIcon" style={{color: "white"}}>
            <span className="glyphicon glyphicon-envelope" style={{color: "white"}, {top: 2 + 'px'}, {top: 2 + 'px'}, {paddingRight: 5 + 'px'}}></span>Messages
            </Link>
        </div>

        <div className="collapse navbar-collapse" id="bs-example-navbar-collapse-1">

          <div className="btn-toolbar pull-right" role="toolbar">

            <div className="btn-group" role="group">

              <button type="button" className="btn btn-default navbar-btn" href = "profile.html">
              <span className="glyphicon glyphicon-user"></span>
                Profile
              </button>
            </div>

            <div className="btn-group" role="group" href = "profile_settings.html">
              <button type="button" className="btn btn-default navbar-btn">
              <span className="glyphicon glyphicon-wrench"></span>
                Settings
              </button>
            </div>
            <div className="btn-group" role="group">
              <button type="button" className="btn btn-default navbar-btn">
              <span className="glyphicon glyphicon-log-out"></span>
                Log Out
              </button>
            </div>
          </div>

          <form className="navbar-form navbar-right navbar-padding" role="search" onSubmit = {(e) => this.handleSubmit(e, this.searchText)}>
            <div className="input-group">
              <input type="text" className="form-control" onKeyUp = {(e) => this.onChange(e)} />
              <span className="input-group-btn">
                <button type="submit" className="btn btn-default" onSubmit = {(e) => this.handleSubmit(e, this.searchText)}>
                  <span className="glyphicon glyphicon-search"></span>
                </button>
              </span>
            </div>
          </form>

        </div>
      </nav>
    )
  }
}
