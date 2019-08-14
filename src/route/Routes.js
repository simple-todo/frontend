import React from "react";
import { BrowserRouter as Router, Route, Link, Switch } from "react-router-dom";
import { connect } from "react-redux";
import styled from "styled-components";

import routeActions from "../redux/routeRedux";
import userActions from "../redux/userRedux";
import PrivateRoute from "./PrivateRoute";
import Login from "../component/pages/login";
import Home from "../component/pages/home";

class Routes extends React.Component {
  componentWillMount() {
    // this.props.resetUserReducer();
  }

  logout() {
    this.props.toggleLoginState();
  }

  renderNavBar() {
    const { isLogin } = this.props.route;
    return isLogin ? (
      <React.Fragment>
        <h3>Simple Todo</h3>
        <nav className="navbar navbar-expand-lg navbar-light bg-light">
          <ul className="navbar-nav mr-auto ">
            <li>
              <Link onClick={() => this.logout()} to={"/login"} className="nav-link">
                Logout
              </Link>
            </li>
          </ul>
        </nav>
      </React.Fragment>
    ) : null;
  }

  render() {
    const { isLogin } = this.props.route;
    return (
      <Router>
        {this.renderNavBar()}
        <MainContent>
          <Switch>
            <Route path="/login" component={Login} />
            <PrivateRoute path="/home" component={Home} isLogin={isLogin} />
          </Switch>
        </MainContent>
      </Router>
    );
  }
}

const mapStateToProps = ({ route, login }) => {
  return {
    route,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    resetUserReducer: () => dispatch(userActions.resetReducer()),
    toggleLoginState: () => dispatch(routeActions.toggleLoginState()),
  };
};

const MainContent = styled.div`
  // background-color: red;
  display: flex;
  flex: 1;
`;

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Routes);
