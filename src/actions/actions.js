/*
We use 4 actions
  1. ADD_TODO
    >>This uses to add new task to the project

  2. DELETE_TODO
    >>This uses for delete task and exclude from the project

  3. EDIT_TODO
    >>This uses to edit an exist task in project

  4. TOGGLE_TODO
    >>This uses for completion
*/
export const addTodo = (todo) => ({
  type: "ADD_TODO",
  payload: todo,
});

export const deleteTodo = (todo) => ({
  type: "DELETE_TODO",
  payload: todo,
});

export const editTodo = (oldTodo, newTodo) => ({
  type: "EDIT_TODO",
  payload: { oldTodo, newTodo },
});

export const toggleTodo = (todo) => ({
  type: "TOGGLE_TODO",
  payload: todo,
});
