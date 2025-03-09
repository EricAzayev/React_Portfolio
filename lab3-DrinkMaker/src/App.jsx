import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import Question from "./assets/Question";

function App() {
  const [count, setCount] = useState(0);

  const buttonStyle = {
    backgroundColor: "orange",
    color: "white",
    borderRadius: "5px",
    fontSize: "16px",
    cursor: "pointer",
  };
  const icon = "->";
  const [inputs, setInputs] = useState({
    temperature: "",
    milk: "",
    syrup: "",
    blended: "",
  });

  const ingredients = {
    temperature: ["hot", "lukewarm", "cold"],
    syrup: ["mocha", "vanilla", "toffee", "maple", "caramel", "other", "none"],
    milk: ["cow", "oat", "goat", "almond", "none"],
    blended: ["yes", "turbo", "no"],
  };

  return (
    <>
      <h2>Hi, I'd like to order a: </h2>

      <button style={buttonStyle}>Check Answer</button>
      <button style={buttonStyle}>{icon}</button>

      <Question
        handleChange={(e) =>
          setInputs((prevState) => ({
            ...prevState,
            [e.target.name]: e.target.value,
          }))
        }
        label="temperature"
        choices={ingredients["temperature"]}
        checked={inputs["temperature"]}
      />
    </>
  );
}

export default App;
