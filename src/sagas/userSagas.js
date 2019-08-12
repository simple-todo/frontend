import { put, call, select } from "redux-saga/effects";

// import ProfileActions from "../Redux/ProfileRedux";
// import api from "../Services/Api";

// API
// export function fetchLoginApi({ username, password }) {
//   return api
//     .create()
//     .login(username, password)
//     .then(response => response.data)
//     .then(responseBody => responseBody)
//     .catch(error => error);
// }

// SAGAS
export function* fetchUser({ username, password }) {
  console.log("Masuk ke middleware saga");
}
