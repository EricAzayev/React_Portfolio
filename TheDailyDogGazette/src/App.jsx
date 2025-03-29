import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";

const ACCESS_KEY = import.meta.env.VITE_ACCESS_KEY;

function App(response, setBannedAttributes, setPastURLsAndFetchNewDog) {
  
  return (
    <>
      <div
        style={{
          alignContent: "center",
          textAlign: "center",
          backgroundColor: "grey",
        }}
      >
        <h1>The Daily Dog Gazette</h1>
        <h3>Discover your dream dog</h3>

        <button onClick={setPastURLsAndFetchNewDog}>Discover!</button>
      </div>
    </>
  );
}

export default App;
