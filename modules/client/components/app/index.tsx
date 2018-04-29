import * as React from "react";
import { Link } from "react-router-dom";
// import './App.css';
import Auth from "client/Auth/Auth";
import { Component } from "react";
require("./styles.scss");

/*
function isAuthenticated() {
  return auth.isAuthenticated();
}
*/

/*
export function AppHeader(props: { auth: Auth }) {
  const isAuthenticated = props.auth.isAuthenticated();
  console.log("ARE YOU AUTHENTICATED??", isAuthenticated);
  return (
    <div className="munchit-app-header">
      <h1 className="munchit-app-title">House Chores</h1>
      <ul className="munchit-app-nav">
        <li>
          <Link to="/add-snack">Add a Chore</Link>
        </li>
        <li>
          <Link to="/chore-schedule">Chore Schedule</Link>
        </li>
      </ul>
      <div>
        {!isAuthenticated && (
          <button className="btn-margin" onClick={() => login(props.auth)}>
            Log In
          </button>
        )}
        {isAuthenticated && (
          <button className="btn-margin" onClick={() => logout(props.auth)}>
            Log Out
          </button>
        )}
      </div>
    </div>
  );
}
*/

export interface AppProps {
  auth: Auth;
  children?: JSX.Element;
}

export class App extends Component<AppProps> {
  login() {
    this.props.auth.login();
  }

  logout() {
    this.props.auth.logout();
  }
  render() {
    const isAuthenticated = this.props.auth.isAuthenticated();
    const children = this.props.children;

    return (
      <div>
        <div className="munchit-app-header">
          <h1 className="munchit-app-title">House Chores</h1>
          <ul className="munchit-app-nav">
            <li>
              <Link to="/add-snack">Add a Chore</Link>
            </li>
            <li>
              <Link to="/chore-schedule">Chore Schedule</Link>
            </li>
          </ul>
          <div>
            {!isAuthenticated && (
              <button className="btn-margin" onClick={this.login.bind(this)}>
                Log In
              </button>
            )}
            {isAuthenticated && (
              <button className="btn-margin" onClick={this.logout.bind(this)}>
                Log Out
              </button>
            )}
          </div>
        </div>
        {children}
      </div>
    );
  }
}
