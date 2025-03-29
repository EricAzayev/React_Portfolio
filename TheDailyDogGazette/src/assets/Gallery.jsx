import React from "react";

const Gallery = (pastUrls) => {
  //pastUrls is a 2D array where pastUrls[i][0] is the url of the image
  //pastUrls[i][1] is the name of the image

  return (
    <div className="gallery">
      <h2>Gallery</h2>
      <div className="gallery-images">
        {pastUrls.map((image, index) => (
          <div key={index} className="gallery-image">
            <img src={image[0]} alt={image[1]} />
            <p>{image[1]}</p>
          </div>
        ))}
      </div>
    </div>
  );
};
