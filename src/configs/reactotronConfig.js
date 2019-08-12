// import Reactotron from "reactotron-react-js";

// import sagaPlugin from "reactotron-redux-saga";

// Reactotron.configure()
//   .use(sagaPlugin())
//   .use(reactotronRedux())
//   .connect();

// Reactotron.clear();

// console.log = Reactotron.log;
// console.tron = Reactotron;

// export default Reactotron;

import Reactotron from "reactotron-react-js";
import sagaPlugin from "reactotron-redux-saga";
import { reactotronRedux } from "reactotron-redux";

// the latest reactotron version its not compatible, right now still user ver 1.0.0
const reactotron = Reactotron.configure()
  .use(sagaPlugin())
  .use(reactotronRedux())
  .connect();

Reactotron.clear();

console.log = Reactotron.log;
console.tron = Reactotron;

export default reactotron;
