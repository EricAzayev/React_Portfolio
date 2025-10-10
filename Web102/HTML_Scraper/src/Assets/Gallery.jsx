import React from "react";

const Gallery = ({ prevImages }) => {
  return (
    <div
      className="gallery"
      style={{
        display: "grid",
        gridTemplateColumns: "repeat(3, 1fr)",
        background: "lightblue",
      }}
    >
      <h2>Previous Screenshots:</h2>
      {prevImages && prevImages > 0 ? (
        prevImages.map((image, index) => (
          <img key={index} src={image} alt={`Screenshot ${index}`} />
        ))
      ) : (
        <div>No Images To Display!</div>
      )}
    </div>
  );
};

export default Gallery;
