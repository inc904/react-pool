export default function TodoItem({ todo, handleDeleteTodo, handleToggleTodo }) {
  let { id, title, done } = todo;
  return (
    <li className="todoItem">
      <input
        type="checkbox"
        checked={done}
        onChange={() => {
          handleToggleTodo(id);
        }}
      />
      <span style={{ textDecoration: done ? "line-through" : "none" }}>
        {title}
      </span>
      <div className="actionsContainer">
        <button
          onClick={() => {
            handleDeleteTodo(id);
          }}
        >
          <i className="fa-regular fa-trash-can"></i>
        </button>
      </div>
    </li>
  );
}
