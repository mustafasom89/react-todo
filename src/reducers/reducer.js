//reducer.js

/*Initail values 
○ The 2 initial to-do items
*/
const initialTodoState = {
  list: [
    { content: "JavaScript Programming Tasks", completed: false },
    { content: "Front End Development Tasks", completed: false },
  ],
};

const todoReducer = (state = initialTodoState, action) => {
  switch (action.type) {
    // Add to the list
    case "ADD_TODO":
      return {
        ...state,
        list: [...state.list, action.payload],
      };
    // delete the task by using filter not equal to thr passed task
    case "DELETE_TODO":
      return {
        ...state,
        list: state.list.filter((todo) => todo !== action.payload),
      };
    // edit by comparing the existing old tasks to the new value
    case "EDIT_TODO":
      return {
        ...state,
        list: state.list.map((todo) =>
          todo === action.payload.oldTodo ? action.payload.newTodo : todo
        ),
      };
    // completing with true, and incomplete with false
    case "TOGGLE_TODO":
      return {
        ...state,
        list: state.list.map((todo) =>
          todo === action.payload
            ? { ...todo, completed: !todo.completed }
            : todo
        ),
      };
    default:
      return state;
  }
};

export default todoReducer;
