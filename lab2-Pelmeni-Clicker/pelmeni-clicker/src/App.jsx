import { useState } from "react";

import "./App.css";
import Item from "./assets/item.jsx";
import pelmeniClick from "./pelmeniClick.png";

function App() {
  const [count, setCount] = useState(0);
  const [multiplier, setMultiplier] = useState(1);

  function increment() {
    setCount(count + multiplier);
  }
  function setToZero(cost) {
    if (count >= cost) setCount(0);
  }
  function setMult(cost, value) {
    if (count >= cost) setMultiplier(value * multiplier);
  }

  return (
    <>
      <h1> Pelmeni Selector </h1>
      <h3>Count:{count}</h3>
      <div id="Pelmeni">
        <img
          src={pelmeniClick}
          alt="Pelmeni"
          width="200"
          height="200"
          onClick={increment}
        />
        {/*Large Image to click*/}
        <a onClick={increment}></a>
      </div>
      <div id="shop">
        <a
          class="separate"
          onClick={() => {
            setToZero(10);
            setMult(10, 2);
          }}
        >
          <Item amount={count} header="Double Stuffed" mult="2" cost="10" />
          {/*2x multiplier*/}
        </a>
        <a
          class="separate"
          onClick={() => {
            setToZero(100);
            setMult(100, 5);
          }}
        >
          {" "}
          {/*2x multiplier*/}
          <Item amount={count} header="Party Pack" mult="5" cost="100" />
          {/*5x multiplier*/}
        </a>

        <a
          class="separate"
          onClick={() => {
            setToZero(1000);
            setMult(1000, 10);
          }}
        >
          {" "}
          {/*2x multiplier*/}
          <Item amount={count} header="Full Feast" mult="10" cost="1000" />{" "}
          {/*10x multiplier*/}
        </a>
      </div>
    </>
  );
}

export default App;
