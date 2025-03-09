import React from "react";

const Question = (handleChange, title, choices, checked) => {
  const [display, setDisplay] = useState("");

  return (
    <>
      <div>
        <h1>{title}</h1>
        <div className="displayUserInput">
          <h3>{display}</h3>
        </div>
        <div className="radio-buttons">
          {choices &&
            choices.map((choice) => (
              <li key={choice}>
                <input
                  id={choice}
                  value={choice}
                  name={label}
                  type="radio"
                  onChange={handleChange}
                  checked={checked == choice}
                />
                {choice}
              </li>
            ))}
        </div>
      </div>
    </>
  );
};
export default Question;
