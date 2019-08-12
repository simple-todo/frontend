import React, { Component } from "react";
import { connect } from "react-redux";

import Userctions from "../../../redux/userRedux";

class Login extends Component {
  render() {
    // this.props.loginRequest();
    return (
      <div>
        <div className="App">
          <header className="App-header">
            <h1>Hai ini profile loh</h1>
          </header>
        </div>
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
)(Login);
