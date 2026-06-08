import { useId, useState } from "react";
import "../style.css";

function Todo() {
  const [todos, setTodos] = useState([]);
  const [todo, setTodo] = useState("");
  const [editingIndex, setEditingIndex] = useState(null);
  const [editText, setEditText] = useState("");
  const id = useId();

  const handleAddTodo = (e) => {
    if (todo.trim() === "") return;
    e.preventDefault();
    if (todos.includes(todo.trim())) {
      alert("Todo already exists");
      return;
    }
    setTodos([...todos, todo.trim()]);
    setTodo("");
  };

  function handleStartEdit(index, currentText) {
    setEditingIndex(index);
    setEditText(currentText);
  }

  function handleSaveEdit(e, index) {
    e.preventDefault();
    if (editText.trim() === "") return;
    setTodos(
      todos.map((todo, i) => {
        if (i === index) {
          return editText.trim();
        }
        return todo;
      }),
    );
    setEditingIndex(null);
    setEditText("");
  }

  function handleDelete(e, index) {
    e.preventDefault();
    setTodos(todos.filter((todo, i) => i !== index));
  }

  return (
    <div>
      <h1 className="heading">TODO LIST</h1>
      <form onSubmit={handleAddTodo} className="todo-form">
        <div className="input-container">
          <label htmlFor={id}>Enter your todo:</label>
          <input
            type="text"
            value={todo}
            onChange={(e) => setTodo(e.target.value)}
            placeholder="Go to mall"
            id={id}
          />
        </div>
        <button type="submit" className="add-todo-button">
          Add Todo
        </button>
      </form>


      <ul className="todo-list-container">
        {todos.map((todo, index) => (
          <li key={index}>
            {editingIndex === index ? (
                <>
                <input type="text" value={editText} onChange={(e) => setEditText(e.target.value)} className="edit-input" autoFocus/>
                <button className="todo-change-button" onClick={(e) => handleSaveEdit(e, index)}>Save</button>
                <button className="todo-delete-button" onClick={() => setEditingIndex(null)}>Cancel</button>
                </>
            ) : (
                <>
                <span className="todo-task">{todo}</span>
                <button className="todo-change-button" onClick={(e) => handleStartEdit(index, todo)}>Change</button>
                <button className="todo-delete-button" onClick={(e) => handleDelete(e, index)}>Delete</button>
                </>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Todo;
