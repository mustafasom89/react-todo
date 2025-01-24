import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { addTodo, deleteTodo, editTodo, toggleTodo } from "../actions/actions";
import "./App.css";
import "./mystyle.css";

const App = () => {
  const [content, setContent] = useState("");
  const todos = useSelector((state) => state.list);
  const dispatch = useDispatch();
  const [newTodo, setNewTodo] = useState("");
  const [editingTodo, setEditingTodo] = useState(null);
  const [showInstructions, setShowInstructions] = useState(false);

  /* 
    handleAddTodo
    >> Ignore request if the value is epmty
    >> Set complete false
    >> Set content with new task
    
  */
  const handleAddTodo = () => {
    if (newTodo.trim() === "") {
      return;
    }
    dispatch(
      addTodo({
        content: newTodo,
        completed: false,
      })
    );
    setNewTodo("");
  };
  /*
  ===== End of edit task

  DELETE TASKS
  Set state by dispatch and call del action
  */

  const handleDeleteTodo = (todo) => {
    dispatch(deleteTodo(todo));
  };
  /*
  ===== End of DELETE task

  EDIT TASKS
  Set state by dispatch and call edit action
  */
  const handleEditTodo = (todo, body) => {
    setContent(body);
    setEditingTodo(todo);
  };

  const handleSaveChanges = (updatedContent) => {
    dispatch(
      editTodo(editingTodo, { ...editingTodo, content: updatedContent })
    );
    setEditingTodo(null);
  };

  const handleToggleTodo = (todo) => {
    dispatch(toggleTodo(todo));
  };

  const handleInfoClick = () => {
    setShowInstructions(true); // Show popup when info icon is clicked
  };

  const handleClosePopup = () => {
    setShowInstructions(false); // Close popup
  };

  const InstructionsPopup = () => (
    <div className={`modal ${true ? "open" : ""}`}>
      <div className="modal-content">
        <h2>Instructions</h2>
        <p>Here are the instructions for using the Todo App:</p>
        <ul>
          <li>
            Add a new todo by entering its content in the input field and
            clicking "Add Todo".
          </li>
          <li>
            To delete a todo, click the "Delete" button next to the todo item.
          </li>
          <li>
            To edit a todo, click the info icon (ℹ️) next to the todo item. Make
            the changes in the modal and click "Save".
          </li>
          <li>
            To mark a todo as completed or incomplete, click the "Complete" or
            "Undo" button next to the todo item, respectively.
          </li>
        </ul>
        <button className="close-btn" onClick={handleClosePopup}>
          Close
        </button>
      </div>
    </div>
  );
  /*
Use modal 
*/
  const Modal = ({ isOpen, onClose, onSave }) => {
    const handleSave = () => {
      if (content) {
        onSave(content);
        setContent("");
      } else {
        alert("Empty is not allowed");
        return;
      }
    };

    return (
      <div className={`modal ${isOpen ? "open" : ""}`}>
        <div className="modal-content">
          <h2>
            <div className="modal-header">
              <h2>Edit Todo</h2>
              <button className="close-btn" onClick={onClose}>
                X
              </button>
            </div>
          </h2>
          <input
            type="text"
            value={content}
            onChange={(e) => setContent(e.target.value)}
          />
          <div className="modal-buttons">
            <button onClick={onClose}>Cancel</button>
            <button onClick={handleSave}>Save</button>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="app">
      {/*A heading with your app name.*/}
      <h1>Todo App ({todos.length})</h1>
      {/* Info Icon */}
      <div className="info-icon" onClick={handleInfoClick}>
        ℹ️
      </div>
      {/* Popup */}
      {showInstructions && <InstructionsPopup />}
      <div className="todo-item">
        <div className="todo-content">
          {todos.map((todo, index) => (
            <div
              key={index}
              className={`todo-item ${todo.completed ? "completed" : ""}`}
            >
              <span>{todo.content}</span>
              <div className="btn">
                <div
                  className="btn btn-info"
                  onClick={() => handleEditTodo(todo, todo.content)}
                >
                  ℹ️
                </div>
                <button
                  className="btn btn-del"
                  onClick={() => handleDeleteTodo(todo)}
                >
                  Delete
                </button>
                <button
                  className="btn btn-com"
                  onClick={() => handleToggleTodo(todo)}
                >
                  {todo.completed ? "Undo" : "Complete"}
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
      <div className="todo-form">
        <input
          className="input"
          type="text"
          value={newTodo}
          maxLength={30}
          onChange={(e) => setNewTodo(e.target.value)}
          onKeyPress={(e) => {
            if (e.key === "Enter") {
              handleAddTodo();
            }
          }}
        />
        <button className="btn btn-todo" onClick={handleAddTodo}>
          Add Todo
        </button>
      </div>
      {editingTodo && (
        <Modal
          isOpen={true}
          onClose={() => setEditingTodo(null)}
          onSave={handleSaveChanges}
        />
      )}
    </div>
  );
};

export default App;
