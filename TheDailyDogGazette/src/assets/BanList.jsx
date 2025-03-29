import React from "react";

const BanList = (bannedAttributes) => {
  let span = {
    backgroundColor: "grey",
    color: "white",
    padding: "5px",
    borderRadius: "5px",
    fontWeight: "bold",
    height: "100px",
  };
  let listicle = {
    listStyleType: "none",
    padding: "0",
    margin: "0",
    backgroundColor: "chocolate",
    color: "white",
  };

  return (
    <div className="ban-list" style={span}>
      <h2>Ban List</h2>
      <ul>
        {bannedAttributes.map((attribute, index) => (
          <li key={index} style={listicle}>
            {attribute}
          </li>
        ))}
      </ul>
    </div>
  );
};
export default BanList; // Exporting the BanList component as the default export of the module.
