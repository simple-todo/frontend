import React, { Component } from "react";
import { connect } from "react-redux";
import styled from "styled-components";
import PropTypes from "prop-types";

// import styles from "./login.css";
import userActions from "../../../redux/userRedux";
import routeActions from "../../../redux/routeRedux";

class AddTodo extends Component {
  render() {
    return (
      <Container style={{ display: "flex" }}>
        <Input type="text" name="title" placeholder="Add Todo..." />
        <Submit>Add</Submit>
      </Container>
    );
  }
}

const mapStateToProps = ({ route, user }) => {
  return {
    route,
    user,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    fetchLoginSaga: (username, password) => dispatch(userActions.fetchLogin(username, password)),
    fetchRegisterSaga: (username, password, full_name) => dispatch(userActions.fetchRegister(username, password, full_name)),
    // resetUserReducer: () => dispatch(userActions.resetReducer()),
    // toggleLoginState: () => dispatch(routeActions.toggleLoginState()),
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(AddTodo);

const Container = styled.div`
  display: flex;
  width: 350px;
`;

const Submit = styled.button`
  background-color: #49c6e5;
  color: #19647e;
  margin-bottom: 10px;

  &:focus {
    outline: 0;
  }
`;

const Input = styled.input`
  display: flex;
  flex: 1;
  &:focus {
    outline: 0;
  }
`;
