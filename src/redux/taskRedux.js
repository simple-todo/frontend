import { createReducer, createActions } from "reduxsauce";
import Immutable from "seamless-immutable";

/* ------------- Types and Action Creators ------------- */
// CREATE LIST ACTIONS FROM SAGA & REDUCER
const { Types, Creators } = createActions({
  // SAGA
  fetchTask: ["token"],
  fetchDeleteTask: ["todo_id"],
  fetchUpdateTask: ["todo_id"],
  fetchAddTask: ["task"],
  // REDUCER
  resetReducer: null,
  taskRequest: null,
  taskRequestError: ["error"],
  taskRequestSuccess: ["task"],
  deleteTaskRequestSuccess: ["message"],
  updateTaskRequestSuccess: ["message"],
  addTaskRequestSuccess: ["message"],
});

export const TaskTypes = Types;
export default Creators;

/* ------------- Initial State ------------- */

export const INITIAL_STATE = Immutable({
  task: [],
  fetch: false,
  fetchSuccess: false,
  error: null,
  message: "",
});

/* ------------- Reducers ------------- */
export const taskRequest = (state) => {
  return {
    ...state,
    fetch: true,
    fetchSuccess: false,
    error: null,
    message: "",
  };
};

export const taskRequestError = (state, { error }) => {
  return {
    ...state,
    error,
    fetch: false,
    fetchSuccess: false,
  };
};

export const taskRequestSuccess = (state, { task }) => {
  return {
    ...state,
    task,
    fetch: false,
    fetchSuccess: true,
  };
};

export const deleteTaskRequestSuccess = (state, { message }) => {
  return {
    ...state,
    message,
    fetch: false,
    fetchSuccess: true,
  };
};

export const updateTaskRequestSuccess = (state, { message }) => {
  return {
    ...state,
    message,
    fetch: false,
    fetchSuccess: true,
  };
};

export const addTaskRequestSuccess = (state, { message }) => {
  return {
    ...state,
    message,
    fetch: false,
    fetchSuccess: true,
  };
};

export const resetReducer = () => {
  return INITIAL_STATE;
};

/* ------------- Hookup Reducers To Types ------------- */
/* Only list the REDUCERS on here*/
export const reducer = createReducer(INITIAL_STATE, {
  [Types.RESET_REDUCER]: resetReducer,
  [Types.TASK_REQUEST]: taskRequest,
  [Types.TASK_REQUEST_ERROR]: taskRequestError,
  [Types.TASK_REQUEST_SUCCESS]: taskRequestSuccess,
  [Types.DELETE_TASK_REQUEST_SUCCESS]: deleteTaskRequestSuccess,
  [Types.UPDATE_TASK_REQUEST_SUCCESS]: updateTaskRequestSuccess,
  [Types.ADD_TASK_REQUEST_SUCCESS]: addTaskRequestSuccess,
});
