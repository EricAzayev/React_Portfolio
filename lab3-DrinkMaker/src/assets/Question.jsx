import { useState } from "react";
import React from "react";

function Question({ label, choices, checked, handleChange }) {
  return (
    <div className="question">
      <label>{label}</label>
      <div className="user_selected">
        <h3>{checked}</h3>
        <span className="decorated-bar"></span>
      </div>
      {choices.map((choice) => (
        <div key={choice}>
          <input
            type="radio"
            name={label}
            value={choice}
            checked={checked === choice}
            onChange={handleChange}
          />
          {choice}
        </div>
      ))}
    </div>
  );
}

export default Question;
