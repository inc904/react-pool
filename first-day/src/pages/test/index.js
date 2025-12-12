import React, { useState } from "react";

function Count() {
  let [count, setCount] = useState(0);
  return (
    <div>
      <p>{count}</p>
      <button onClick={() => setCount(count + 1)}>+1</button>
    </div>
  );
}

export default function TestPage() {
  return (
    <div>
      <h1>this is TestPage</h1>
      <Count />
      <Count />
    </div>
  );
}
