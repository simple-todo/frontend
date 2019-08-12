import { takeLatest, all } from "redux-saga/effects";

/* ------------- Types ------------- */
import { UserTypes } from "../redux/userRedux";

/* ------------- Sagas ------------- */
import { fetchUser } from "./userSagas";

/* ------------- Connect Types To Sagas ------------- */
export default function* root() {
  yield all([takeLatest(UserTypes.FETCH_USER, fetchUser)]);
}
