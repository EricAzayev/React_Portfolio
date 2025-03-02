import React from "react";

let Item = (props) => {
  const bodyStyle = {
    display: "flex",
    flexDirection: "column",
    border: "2px solid black",
    borderRadius: "10px",
  };

  const headerStyle = {
    color: "black",
    fontSize: "30px",
    fontWeight: "bold",
  };
  const multStyle = {
    color: "black",
    fontSize: "20px",
    fontWeight: "bold",
  };
  const costStyle = {
    color: "black",
    fontSize: "20px",
    fontWeight: "bold",
  };

  return (
    <div id="item" style={bodyStyle}>
      <h4 style={headerStyle} id="header">
        {props.header}
      </h4>
      <h5 style={multStyle} id="mult">
        Multiplier: {props.mult}x per click
      </h5>
      <br></br>
      <h5 style={costStyle} id="cost">
        Cost: {props.cost} Pelmeni
      </h5>
    </div>
  );
};

export default Item;
