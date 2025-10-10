import React from "react";

function Tab({ date, temperature, sunrise, sunset }) {
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "space-between",
        gap: "10px",
        padding: "10px",
        border: "1px solid #ccc",
      }}
    >
      <h3>{date}</h3>
      <p>Temp: {temperature}°C</p>
      <p>Sunrise: {sunrise}</p>
      <p>Sunset: {sunset}</p>
    </div>
  );
}

export default Tab;
