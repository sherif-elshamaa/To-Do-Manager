import { ADD_TO_TODO, EDIT_TASK, DELETE_TASK } from "../Constants/action-types";
import { v4 as uuid } from 'uuid';
import { POST_TOAST } from "../Constants/action-types";

const initialState = {
  tasks: [
    {
      id: uuid(),
      title: '1st title',
      description: '1st description',
      assignedTo: 'sherif',
      priority: 'High',
      startDate: new Date(2022, 11, 23, 10, 33, 30, 0),
      deadline: new Date(2022, 4, 23, 10, 33, 30, 0),
      status: "To Do"
    },
    {
      id: uuid(),
      title: '3rd title',
      description: '1rd description',
      assignedTo: 'sherif',
      priority: 'High',
      startDate: new Date(2022, 11, 24, 10, 33, 30, 0),
      deadline: new Date(2022, 4, 22, 10, 33, 30, 0),
      status: "To Do"
    },
    {
      id: uuid(),
      title: '2st title',
      description: '2st description',
      assignedTo: 'jimmy',
      priority: 'Low',
      startDate: new Date(),
      deadline: new Date(),
      status: "In Progress",
    }
  ],
  users: [
    {
      id: uuid(),
      name: 'jon'
    },
    {
      id: uuid(),
      name: 'dow'
    },
    {
      id: uuid(),
      name: 'jake'
    },
    {
      id: uuid(),
      name: 'mike'
    }
  ],
  toast: {
    state: "",
    text: "",
    show: false
  },
};

function rootReducer(state = initialState, action) {
  switch (action.type) {
    case ADD_TO_TODO:
      return { ...state, tasks: [...state.tasks, action.payload.task] };
      
    case EDIT_TASK:
      state.tasks.forEach((todo) => {
        if (todo.id === action.payload.id) {
          todo.status = action.payload.status;
        }
      });
      return { ...state, tasks: [...state.tasks] };

    case DELETE_TASK:
      let arr = state.tasks.filter((todo) => { return todo.id !== action.payload.id })
      return { ...state, tasks: [...arr] }

    case POST_TOAST: {
      return {
        ...state,
        toast: {
          state: action.payload.toast.state,
          text: action.payload.toast.text,
          show: action.payload.toast.show
        }
      }
    }
    default:
      return state;
  }
}

export default rootReducer;