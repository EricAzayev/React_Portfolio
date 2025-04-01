import React from "react";
import "./Panel.css";

const listicle = {
  display: "inline-block",
  backgroundColor: "chocolate",
  color: "white",
  padding: "10px",
  margin: "5px",
  borderRadius: "5px",
  cursor: "pointer",
};

function Panel({ imageUrl, attribute, setBannedAttributes, next }) {
  if (!attribute) return <p>Loading...</p>; // Prevents crashes when attribute is null

  return (
    <div
      style={{
        alignContent: "center",
        textAlign: "center",
        backgroundColor: "grey",
        padding: "20px",
        borderRadius: "10px",
      }}
    >
      <h1>The Daily Dog Gazette</h1>
      <h3>Discover your dream dog</h3>

      <div id="attributeList">
        <li
          style={listicle}
          onClick={() => setBannedAttributes((prev) => [...prev, attribute])}
        >
          {attribute}
        </li>
      </div>

      {imageUrl && (
        <img
          className="image"
          id="currentDog"
          src={imageUrl}
          alt="Random Dog"
          style={{ maxWidth: "100%", borderRadius: "10px" }}
        />
      )}

      <button
        onClick={next}
        style={{ marginTop: "10px", padding: "10px", cursor: "pointer" }}
      >
        Discover!
      </button>
    </div>
  );
}

export default Panel;
