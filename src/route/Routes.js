import React from "react";
import {
  BrowserRouter as Router,
  Route,
  Link,
  Redirect,
  withRouter
} from "react-router-dom";
import { connect } from "react-redux";

import PrivateRoute from "./PrivateRoute";
import Login from "../component/pages/login";
import Home from "../component/pages/home";

const Profile = () => <h3>PROFILE</h3>;
const Forum = () => <h3>FORUM</h3>;
const Adsanse = () => <h3>ADSANSE</h3>;

// TOMBOL SIGN OUT
// const AuthButton = withRouter(({ history }) =>
//   fakeAuth.isAuthenticated ? (
//     <p>
//       Welcome!{" "}
//       <button
//         onClick={() => {
//           fakeAuth.signout(() => history.push("/"));
//         }}
//       >
//         Sign out
//       </button>
//     </p>
//   ) : (
//     <p>You are not logged in.</p>
//   )
// );

class Routes extends React.Component {
  render() {
    console.log("route ", this.props.route.isLogin);

    const { isLogin } = this.props.route;
    return (
      <Router>
        <div>
          <ul>
            <li>
              <Link to="/login">LOGIN</Link>
            </li>
            <li>
              <Link to="/home">HOME</Link>
            </li>

            <li>
              <Link to="/profile">profile</Link>
            </li>
            <li>
              <Link to="/forum">forum</Link>
            </li>
            <li>
              <Link to="/Adsanse">adsanse</Link>
            </li>
          </ul>
          <Route path="/login" component={Login} />
          <PrivateRoute path="/profile" component={Profile} isLogin={isLogin} />
          <PrivateRoute path="/forum" component={Forum} isLogin={isLogin} />
          <PrivateRoute path="/Adsanse" component={Adsanse} isLogin={isLogin} />
          <PrivateRoute path="/home" component={Home} isLogin={isLogin} />
        </div>
      </Router>
    );
  }
}

const mapStateToProps = ({ route, login }) => {
  return {
    route
  };
};

export default connect(
  mapStateToProps,
  null
)(Routes);
