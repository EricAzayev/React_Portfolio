import React from "react";
import "./Panel.css";

const Gallery = ({ pastUrls = [] }) => {
  //pastUrls is a 1D array of url strings

  return (
    <div className="gallery">
      <h2>Gallery</h2>
      <div className="gallery-images">
        {pastUrls.map((image, index) => (
          <div
            key={index}
            className="gallery-image"
            style={{ display: "flex", flexDirection: "column" }}
          >
            <img
              src={image}
              alt={`Gallery Image ${index + 1}`}
              className="image"
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default Gallery;
