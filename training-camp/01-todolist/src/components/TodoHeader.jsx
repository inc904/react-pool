import { useState } from "react";

export default function TodoHeader({ handleAddTodos }) {
  const [inputValue, setInputValue] = useState("");
  const addTodo = () => {
    if (inputValue.trim() === "") {
      return;
    }
    handleAddTodos(inputValue);
    setInputValue("");
  };
  return (
    <div>
      <h1>待办事项</h1>
      <header className="header">
        <input
          type="text"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          placeholder="请输入待办事项"
        />
        <button onClick={addTodo}>添加</button>
      </header>
      <p>当前输入值：{inputValue}</p>
    </div>
  );
}
