import React from "react";
import { BrowserRouter as Router, Route, Link, Redirect, withRouter, Switch } from "react-router-dom";
import { connect } from "react-redux";
import { Nav, Container, Row, Col, Navbar, NavDropdown, Form, FormControl, Button } from "react-bootstrap";

import PrivateRoute from "./PrivateRoute";
import Login from "../component/pages/login";
import Home from "../component/pages/home";

const Profile = () => <h3>PROFILE</h3>;
const Forum = () => <h3>FORUM</h3>;
const Adsanse = () => <h3>ADSANSE</h3>;

class Routes extends React.Component {
  render() {
    const { isLogin } = this.props.route;

    return (
      <Router>
        <div>
          <h3>Simple Todo</h3>
          <nav className="navbar navbar-expand-lg navbar-light bg-light">
            <ul className="navbar-nav mr-auto">
              <li>
                <Link to={"/login"} className="nav-link">
                  Login
                </Link>
              </li>

              <li>
                <Link to={"/profile"} className="nav-link">
                  profile
                </Link>
              </li>
            </ul>
          </nav>
          <hr />
          <Switch>
            <Route path="/login" component={Login} />
            <PrivateRoute path="/profile" component={Profile} isLogin={isLogin} />
            <PrivateRoute path="/forum" component={Forum} isLogin={isLogin} />
            <PrivateRoute path="/Adsanse" component={Adsanse} isLogin={isLogin} />
            <PrivateRoute path="/home" component={Home} isLogin={isLogin} />
          </Switch>
        </div>
      </Router>
    );
  }
}

const mapStateToProps = ({ route, login }) => {
  return {
    route,
  };
};

export default connect(
  mapStateToProps,
  null,
)(Routes);
