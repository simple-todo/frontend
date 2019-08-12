import React, { Component } from "react";
import { connect } from "react-redux";

import "./login.css";
import userActions from "../../../redux/userRedux";
import routeActions from "../../../redux/routeRedux";

class Login extends React.Component {
  state = {
    redirectToReferrer: false
  };

  // login = () => {
  //   fakeAuth.authenticate(() => {
  //     this.setState(() => ({
  //       redirectToReferrer: true
  //     }));
  //   });
  // };

  render() {
    // const { from } = this.props.location.state || { from: { pathname: "/" } };
    // const { redirectToReferrer } = this.state;

    // // KALAU SUDAH LOGIN, MAKA AKAN OTOMATIS REDIRRECT
    // if (redirectToReferrer === true) {
    //   return <Redirect to={from} />;
    // }

    // JIKA USER BELUM LOGIN

    // setInterval(() => {
    //   this.props.toggleLoginState();
    // }, 3000);

    return (
      <div>
        {/* <form> */}
        <label htmlFor="username">Enter username</label>
        <input id="username" name="username" type="text" />

        <label htmlFor="password">Enter password</label>
        <input id="password" name="password" type="password" />

        <button onClick={() => this.props.toggleLoginState()}>
          Send data!
        </button>
        {/* </form> */}
      </div>
    );
  }
}

const mapStateToProps = ({ route, login }) => {
  return {
    route,
    login
  };
};

const mapDispatchToProps = dispatch => {
  return {
    loginRequest: () => dispatch(userActions.loginRequest()),
    toggleLoginState: () => dispatch(routeActions.toggleLoginState())
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Login);
