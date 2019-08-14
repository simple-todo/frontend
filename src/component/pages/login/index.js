import React, { Component } from "react";
import { connect } from "react-redux";
import styled from "styled-components";
import { Tab, Tabs } from "react-bootstrap";
import PropTypes from "prop-types";
import LoadingOverlay from "react-loading-overlay";

import userActions from "../../../redux/userRedux";

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      formControls: {
        username: {
          value: "",
        },
        password: {
          value: "",
        },
        usernameRegister: {
          value: "",
        },
        passwordRegister: {
          value: "",
        },
        fullName: {
          value: "",
        },
      },
      showLoading: this.props.user.fetch,
      errorMessage: this.props.user.error,
      successRegister: this.props.user.successRegister,
      isLogin: this.props.route.isLogin,
      registerMessage: this.props.user.message,
    };
  }

  static getDerivedStateFromProps(nextProps, prevState) {
    let update = {};
    // Flag to navigate to home screen, after user success login
    if (nextProps.route.isLogin !== prevState.isLogin) {
      update.isLogin = nextProps.route.isLogin;
      nextProps.history.push("/home");
    }

    if (nextProps.user.fetch !== prevState.showLoading) {
      update.showLoading = nextProps.user.fetch;
    }

    // Flag to tell, user success register or not
    if (nextProps.user.successRegister !== prevState.successRegister) {
      update.successRegister = nextProps.user.successRegister;
    }

    if (nextProps.user.error !== prevState.errorMessage) {
      update.errorMessage = nextProps.user.error;
      nextProps.user.error !== "" && nextProps.user.error !== null && alert(nextProps.user.error); // Show message to user everytime we receive feedback from server
      nextProps.resetUserReducerSaga();
    }

    return update;
  }

  changeHandler = (event) => {
    const name = event.target.name;
    const value = event.target.value;

    this.setState({
      formControls: {
        ...this.state.formControls,
        [name]: {
          ...this.state.formControls[name],
          value,
        },
      },
    });
  };

  renderLoginForm() {
    const {
      formControls: { username, password },
    } = this.state;

    return (
      <Form>
        <LabelContainer>
          <Label htmlFor="username">Username</Label>
          <input id="username" name="username" type="text" value={username.value} onChange={this.changeHandler} />
        </LabelContainer>

        <LabelContainer>
          <Label htmlFor="password">Password</Label>
          <input id="password" name="password" type="password" value={password.value} onChange={this.changeHandler} />
        </LabelContainer>

        <Submit
          onClick={() => {
            this.props.fetchLoginSaga(username.value, password.value);
          }}>
          Login
        </Submit>
        <p>For Testing, please use :</p>
        <p>Username: ayam</p>
        <p>Password: kucing</p>
      </Form>
    );
  }

  renderRegisterForm() {
    const {
      formControls: { usernameRegister, passwordRegister, fullName },
    } = this.state;

    return (
      <Form>
        <LabelContainer>
          <Label htmlFor="username">Username</Label>
          <input id="username" name="usernameRegister" type="text" value={usernameRegister.value} onChange={this.changeHandler} />
        </LabelContainer>

        <LabelContainer>
          <Label htmlFor="password">Password</Label>
          <input
            id="password"
            name="passwordRegister"
            type="password"
            value={passwordRegister.value}
            onChange={this.changeHandler}
          />
        </LabelContainer>

        <LabelContainer>
          <Label htmlFor="password">Full Name</Label>
          <input id="fullName" name="fullName" type="text" value={fullName.value} onChange={this.changeHandler} />
        </LabelContainer>

        <Submit
          onClick={() => {
            this.props.fetchRegisterSaga(usernameRegister.value, passwordRegister.value, fullName.value);
          }}>
          Register
        </Submit>
      </Form>
    );
  }

  renderTabs() {
    return (
      <FormContainer>
        <StyledTabsContainer>
          <StyledTabs defaultActiveKey="login">
            <Tab eventKey="login" title="Login">
              {this.renderLoginForm()}
            </Tab>
            <Tab eventKey="register" title="Register">
              {this.renderRegisterForm()}
            </Tab>
          </StyledTabs>
        </StyledTabsContainer>
      </FormContainer>
    );
  }

  render() {
    const { showLoading } = this.state;

    return (
      <LoadingOverlay active={showLoading} spinner>
        <Container>{this.renderTabs()}</Container>
      </LoadingOverlay>
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
    resetUserReducerSaga: () => dispatch(userActions.resetReducer()),
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Login);

Login.propTypes = {
  user: PropTypes.object,
  route: PropTypes.object,
};

Login.defaultProps = {
  user: {
    user: {},
    token: "",
    fetch: false,
    fetchSuccess: false,
    error: null,
    successRegister: false,
  },
  route: {
    isLogin: false,
  },
};

const Container = styled.div`
  display: flex;
  flex: 1;
  width: 100vw;
  height: 100vh;
  // background-color: green;
  justify-content: center;
  align-items: center;
`;

const FormContainer = styled.div`
  display: flex;
  flex: 1;
  height: 80vh;
  // background-color: green;
  justify-content: center;
  // margin-top: 5%;
`;

const Form = styled.div`
  display: flex;
  padding: 40px 50px;
  flex-direction: column;
  // background-color: red;
  border: 1px solid #54defd;
  border-radius: 5px;
`;

const LabelContainer = styled.div`
  display: flex;
  width: 250px;
  flex-direction: column;
  margin-bottom: 15px;
`;

const Label = styled.label`
  font-size: 20px;
  color: #119da4;
`;

const Submit = styled.button`
  background-color: #49c6e5;
  color: #19647e;
  margin-bottom: 10px;

  &:focus {
    outline: 0;
  }
`;

const StyledTabs = styled(Tabs)`
  display: flex;
`;

const StyledTabsContainer = styled.div`
  display: flex;
  flex-direction: column;
  margin-bottom: 15px;
  // background-color: green;
`;
