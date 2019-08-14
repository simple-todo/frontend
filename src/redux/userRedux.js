import { createReducer, createActions } from "reduxsauce";
import Immutable from "seamless-immutable";

/* ------------- Types and Action Creators ------------- */
// CREATE LIST ACTIONS FROM SAGA & REDUCER
const { Types, Creators } = createActions({
  // SAGA
  fetchLogin: ["username", "password"],
  fetchRegister: ["username", "password", "full_name"],
  // REDUCER
  resetReducer: null,
  userRequest: null,
  userRequestError: ["error"],
  loginRequestSuccess: ["user", "token"],
  registerRequestSuccess: ["successRegister"],
});

export const UserTypes = Types;
export default Creators;

/* ------------- Initial State ------------- */

export const INITIAL_STATE = Immutable({
  user: {},
  successRegister: false,
  token: "",
  fetch: false,
  fetchSuccess: false,
  error: null,
  message: "",
});

/* ------------- Reducers ------------- */
export const userRequest = (state) => {
  return {
    ...state,
    fetch: true,
    fetchSuccess: false,
  };
};

export const loginRequestSuccess = (state, { user, token }) => {
  return {
    ...state,
    user,
    token,
    fetch: false,
    fetchSuccess: true,
  };
};

export const registerRequestSuccess = (state, { successRegister }) => {
  return {
    ...state,
    error: successRegister,
    successRegister: true,
    fetch: false,
    fetchSuccess: true,
  };
};

export const userRequestError = (state, { error }) => {
  return {
    ...state,
    error,
    fetch: false,
    fetchSuccess: false,
  };
};

export const resetReducer = () => {
  return INITIAL_STATE;
};

/* ------------- Hookup Reducers To Types ------------- */
/* Only list the REDUCERS on here*/
export const reducer = createReducer(INITIAL_STATE, {
  [Types.RESET_REDUCER]: resetReducer,
  [Types.USER_REQUEST]: userRequest,
  [Types.USER_REQUEST_ERROR]: userRequestError,
  [Types.LOGIN_REQUEST_SUCCESS]: loginRequestSuccess,
  [Types.REGISTER_REQUEST_SUCCESS]: registerRequestSuccess,
});
