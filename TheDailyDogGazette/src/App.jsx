import { useState, useEffect } from "react";
import "./App.css";
import Gallery from "./assets/Gallery.jsx";
import BanList from "./assets/BanList.jsx";
import Panel from "./assets/Panel.jsx";

function App() {
  const ACCESS_KEY = import.meta.env.VITE_ACCESS_KEY;

  const headers = new Headers({
    "Content-Type": "application/json",
    "x-api-key": ACCESS_KEY,
  });

  const requestOptions = {
    method: "GET",
    headers: headers,
    redirect: "follow",
  };

  const [pastUrls, setPastUrls] = useState([]);
  const [bannedAttributes, setBannedAttributes] = useState([]);
  const [imageUrl, setImageUrl] = useState(
    "https://cdn2.thedogapi.com/images/UZtLVvNhE.jpg"
  );
  const [attributes, setAttributes] = useState([
    "Buddy",
    "Georgie",
    "Luna",
    "Charlie",
    "Max",
    "Bella",
    "Rocky",
    "Duke",
    "Sadie",
    "Milo",
    "Luna",
  ]);
  const [index, setIndex] = useState(0);
  const [buttonClick, setButtonClick] = useState(false);

  useEffect(() => {
    const fetchNewDog = async () => {
      try {
        const response = await fetch(
          "https://api.thedogapi.com/v1/images/search?size=med&mime_types=jpg&format=json&has_breeds=true&order=RANDOM&page=0&limit=1",
          requestOptions
        );

        const result = await response.json(); // Parse the response

        if (result.length > 0) {
          console.log(result[0].url);
          setImageUrl(result[0].url);
        } else {
          throw new Error("No images found in the response.");
        }
      } catch (error) {
        console.error("Error fetching dog image:", error);
        setImageUrl(null);
        setAttributes({});
      }
    };
    fetchNewDog();
  }, [buttonClick]);

  function next() {
    setIndex((prevIndex) => prevIndex + 1);
    setButtonClick((prev) => !prev);
    setPastUrls((prevUrls) => [...prevUrls, imageUrl]);
    console.log(bannedAttributes);
  }
  return (
    <>
      <div className="AppDiv">
        <BanList
          bannedAttributes={bannedAttributes}
          setBannedAttributes={setBannedAttributes}
        />
        <Panel
          imageUrl={imageUrl}
          attribute={attributes[index]}
          setBannedAttributes={setBannedAttributes}
          next={next}
        />
        <div class="control">
          <Gallery pastUrls={pastUrls} />
        </div>
      </div>
    </>
  );
}

export default App;
