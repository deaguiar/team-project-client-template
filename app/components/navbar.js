import React from 'react';
import { Router, Link, browserHistory } from 'react-router'
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
      var loc = this._reactInternalInstance._context.router.createLocation('#/search/' + text);
      loc.query = text;
      loc.search = "";
      window.location = '/#/search/' + text;
      window.location.reload();
      this.forceUpdate();
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
          <a className="navbar-brand" href="/" style={{color: "white"}}>
            <span className="glyphicon glyphicon-globe" style={{color: "white"}, {top: 2 + 'px'}, {top: 2 + 'px'}, {paddingRight: 5 + 'px'}}></span>GEOPOST
          </a>

          <Link to="hot/" className="navbar-brand" style={{color: "white"}}>
            <span className="glyphicon glyphicon-fire" style={{color: "white"}, {top: 2 + 'px'}, {top: 2 + 'px'}, {paddingRight: 5 + 'px'}}></span>Hot
          </Link>


            <Link to="messages/" className="navbar-brand handIcon" style={{color: "white"}}>
            <span className="glyphicon glyphicon-envelope" style={{color: "white"}, {top: 2 + 'px'}, {top: 2 + 'px'}, {paddingRight: 5 + 'px'}}></span>Messages
            </Link>

        </div>

        <div className="collapse navbar-collapse" id="bs-example-navbar-collapse-1">

          <div className="btn-toolbar pull-right" role="toolbar">

			<div className="btn-group" role="group" href = "profile.html">
              <Link to="profile/">
                <button type="button" className="btn btn-default navbar-btn">
                  <span className="glyphicon glyphicon-user"></span>
                  profile
              </button></Link>
            </div>

            <div className="btn-group" role="group" href = "profile_settings.html">
              <Link to="settings/">
                <button type="button" className="btn btn-default navbar-btn">
                  <span className="glyphicon glyphicon-wrench"></span>
                  Settings
              </button></Link>
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
