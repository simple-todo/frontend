import React, { Component } from "react";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import Reactotron from "reactotron-react-js";

import createStore from "../src/redux";
import Routes from "./route/Routes";

export default class App extends Component {
  render() {
    const { store, persistor } = createStore();
    console.log = Reactotron.log;
    console.disableYellowBox = true;

    return (
      <Provider store={store}>
        <PersistGate persistor={persistor}>
          <Routes />
        </PersistGate>
      </Provider>
    );
  }
}
