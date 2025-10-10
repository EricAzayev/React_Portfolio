import React from "react";

const Event = ({ event, color = "Blue" }) => {
  return (
    <td className="Event" style={{ backgroundColor: color }}>
      <h5>{event}</h5>
    </td>
  );
};

export default Event;
