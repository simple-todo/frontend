import React from "react";
import { Route, Redirect } from "react-router-dom";

export default class App extends React.Component {
  render() {
    // const { component: Component, ...rest } = this.props;

    return (
      <Redirect
        to={{
          pathname: "/login",
          state: { from: this.props.location },
        }}
      />
    );
  }
}
