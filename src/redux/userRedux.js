import { createReducer, createActions } from "reduxsauce";
import Immutable from "seamless-immutable";

/* ------------- Types and Action Creators ------------- */
// CREATE LIST ACTIONS FROM SAGA & REDUCER
const { Types, Creators } = createActions({
  // SAGA
  fetchUser: ["username", "password"],
  // REDUCER
  loginRequest: null,
  resetReducer: null
});

export const UserTypes = Types;
export default Creators;

/* ------------- Initial State ------------- */

export const INITIAL_STATE = Immutable({
  fetching: false,
  errorMessage: "",
  error: false
});

/* ------------- Reducers ------------- */
export const loginRequest = state => {
  return {
    ...state,
    fetching: true,
    error: false,
    errorMessage: "mau nya tidak berubah meong moeng moeng"
  };
};

export const resetReducer = () => {
  return INITIAL_STATE;
};

/* ------------- Hookup Reducers To Types ------------- */
/* Only list the REDUCERS on here*/
export const reducer = createReducer(INITIAL_STATE, {
  [Types.LOGIN_REQUEST]: loginRequest,
  [Types.RESET_REDUCER]: resetReducer
});
