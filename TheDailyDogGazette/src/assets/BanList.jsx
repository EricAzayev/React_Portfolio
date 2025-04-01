import React from "react";

const BanList = ({ bannedAttributes = [], setBannedAttributes }) => {
  function clearBanList() {
    setBannedAttributes([]);
  }
  let containerStyle = {
    backgroundColor: "grey",
    color: "white",
    padding: "10px",
    borderRadius: "5px",
    fontWeight: "bold",
    minHeight: "100px", // Ensures it doesn't collapse if empty
  };

  let listStyle = {
    listStyleType: "none",
    padding: "0",
    margin: "0",
    backgroundColor: "chocolate",
    color: "white",
  };

  return (
    <div className="ban-list" style={containerStyle}>
      <div>
        <h2>Ban List</h2>
        <button onClick={clearBanList}>Clear</button>
      </div>
      {bannedAttributes.length === 0 ? (
        <p>No banned attributes.</p>
      ) : (
        <ul style={listStyle}>
          {bannedAttributes.map((attribute, index) => (
            <li key={index}>{attribute}</li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default BanList;
