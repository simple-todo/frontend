import { createReducer, createActions } from "reduxsauce";
import Immutable from "seamless-immutable";

/* ------------- Types and Action Creators ------------- */
// CREATE LIST ACTIONS FROM SAGA & REDUCER
const { Types, Creators } = createActions({
  // LIST SAGA
  toggleLoginState: null,
  // LIST REDUCER
  login: null,
  signOut: null,
  resetReducer: null
});

export const RouteTypes = Types;
export default Creators;

/* ------------- Initial State ------------- */

export const INITIAL_STATE = Immutable({
  isLogin: false
});

/* ------------- Reducers ------------- */
export const login = state => {
  return { ...state, isLogin: true };
};

export const signOut = state => {
  return { ...state, isLogin: false };
};

export const resetReducer = () => {
  return INITIAL_STATE;
};

/* ------------- Hookup Reducers To Types ------------- */
/* Only list the REDUCERS on here*/
export const reducer = createReducer(INITIAL_STATE, {
  [Types.LOGIN]: login,
  [Types.SIGN_OUT]: signOut,
  [Types.RESET_REDUCER]: resetReducer
});
