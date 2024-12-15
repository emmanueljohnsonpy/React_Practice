import { useState } from "react";

export default function Counter() {
  const [count, setCount] = useState(0);
  const [incby, setIncBy] = useState(1);
  function increment() {
    setCount(count + incby);
  }
  function decrement() {
    setCount(count - incby);
  }
  function incBy() {
    setIncBy(incby + 1);
  }
  function decBy() {
    if (incby > 1) {
      setIncBy(incby - 1);
    }
  }
  return (
    <div style={{ textAlign: "center" }}>
      <h1>The count value is : {count}</h1>
      <button style={{ margin: "5px" }} onClick={decrement}>
        Decrement
      </button>
      <button style={{ margin: "5px" }} onClick={increment}>
        Increment
      </button>
      <h1>We are incrementing the value by : {incby}</h1>
      <button style={{ margin: "5px" }} onClick={decBy}>
        Decrement By
      </button>
      <button style={{ margin: "5px" }} onClick={incBy}>
        Increment By
      </button>
    </div>
  );
}
