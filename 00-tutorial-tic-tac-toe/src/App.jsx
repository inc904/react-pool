import { useState } from "react";

import PersonList from "@pages/people-card/index.jsx";
import TodoApp from "./pages/to-do-app/index.jsx";
import Game from "./pages/tic-tac-toe/index.jsx";
import Comp from '@/pages/comp/index.jsx'

// 提取为独立组件
function HeaderTab({ tab, changeTab }) {
  const tabs = [
    { index: 0, label: "People" },
    { index: 1, label: "Todo" },
    { index: 2, label: "Tic-Tac-Toe" },
    { index: 3, label: "组件" },
  ];

  return (
    <div>
      {tabs.map(({ index, label }) => (
        <button
          key={index}
          style={{ background: tab === index ? "red" : "" }}
          onClick={() => changeTab(index)}
        >
          {label}
        </button>
      ))}
    </div>
  );
}

export default function Home() {
  const [tab, setTab] = useState(0);
  const [inputValue, setInputValue] = useState("");
  function changeTab(index) {
    setTab(index);
  }

  return (
    <>
      <header>
        <HeaderTab tab={tab} changeTab={changeTab} />
      </header>
      <input
        type="text"
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
      />
      {inputValue}

      {tab === 0 && (
        <article>
          <PersonList />
        </article>
      )}
      {tab === 1 && <TodoApp />}
      {tab === 2 && <Game />}
      {tab === 3 && <Comp />}
    </>
  );
}
