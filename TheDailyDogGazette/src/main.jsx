import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import Gallery from "./assets/Gallery.jsx";
import BanList from "./assets/BanList.jsx";

//everything with API done here

let style = {
  layout: "grid",
  gridTemplateColumns: "1fr 1fr, 4fr, 1fr, 1fr",
  gap: "10px",
  padding: "10px",
};

const fetchNewDog = async () => {
  try {
    const res = await fetch(`${url}?api_key=${ACCESS_KEY}`);
    const data = await res.json();
    if (data && data.length > 0) {
      setResponse(data[0].image.url); // Assuming the API returns an image URL in `data[0].image.url`
    }
  } catch (error) {
    console.error("Error fetching dog data:", error);
  }
};

url = "https://api.thedogapi.com/v1/breeds";
const ACCESS_KEY = import.meta.env.VITE_ACCESS_KEY;
const [pastUrls, setPastUrls] = useState([]);
const [bannedAttributes, setBannedAttributes] = useState([]);
const [response, setResponse] = useState(null);

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <div style={style}>
      <Gallery pastUrls={pastUrls} />
      <App
        response={response}
        pastUrls={pastUrls}
        setPastUrls={setPastUrls}
        bannedAttributes={bannedAttributes}
        setBannedAttributes={setBannedAttributes}
        fetchNewDog={fetchNewDog}
      />
      <BanList bannedAttributes={bannedAttributes} />
    </div>
  </StrictMode>
);
