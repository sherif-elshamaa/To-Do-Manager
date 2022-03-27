import { ADD_TO_TODO, EDIT_TASK, DELETE_TASK } from "../Constants/action-types";
import { POST_TOAST } from '../Constants/action-types'

export const addTodo = (newTodo) => {
  return {
    type: ADD_TO_TODO,
    payload: newTodo,
  };
};

export const editTask = (editTask) => {
  return {
    type: EDIT_TASK,
    payload: editTask,
  };
};

export const deleteTask = (deleteTask) => {
  return {
    type: DELETE_TASK,
    payload: deleteTask,
  };
};

export const posttoast = (object) => {
  return {
      type: POST_TOAST,
      payload: object
  }
}