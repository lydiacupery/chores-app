import * as React from "react";
import { Link } from "react-router-dom";

require("./styles.scss");
export function AppHeader() {
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
    </div>
  );
}

export function App(props: { children: JSX.Element }) {
  const { children } = props;
  return (
    <div className="munchit-app">
      <AppHeader />
      {children}
    </div>
  );
}
