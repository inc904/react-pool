import TodoItem from "./TodoItem";

export default function TodoList(props) {
  console.log('props',props)
  return (
    <ul className="main">
      {props.todos.map((todo) => (
        <TodoItem key={todo.id} {...props} todo= {todo} />
      ))}
    </ul>
  );
}
