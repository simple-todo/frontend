import React, { Component } from "react";
import { Route, Redirect } from "react-router-dom";
import LoadingOverlay from "react-loading-overlay";

// export default class Loader extends Component {
//   render() {
//     const { component: Component, ...rest } = this.props;

//     return (
//       <LoadingOverlay active={true} spinner>
//         {this.props}
//       </LoadingOverlay>
//     );
//   }
// }

const Loader = (Comp) => ({ isLoading, children, ...props }) => {
  if (isLoading) {
    return <LoadingOverlay active={true} spinner />;
  } else {
    return <Comp {...props}>{children}</Comp>;
  }
};

export default Loader;
