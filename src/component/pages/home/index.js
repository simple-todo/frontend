import React, { Component } from "react";
import { connect } from "react-redux";

import Userctions from "../../../redux/userRedux";

class Home extends React.Component {
  render() {
    return (
      <div>
        <h1>HALAMAN HOME</h1>
        <h2>HANYA BISA DI AKSES SETELAH LOGIN</h2>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    user: state.user
  };
};

const mapDispatchToProps = dispatch => {
  return {
    loginRequest: () => dispatch(Userctions.loginRequest())
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Home);
