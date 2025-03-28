import { useState } from "react";
import APIForm from "./assets/APIForm.jsx";
import Gallery from "./assets/Gallery.jsx";

import "./App.css";
const ACCESS_KEY = import.meta.env.VITE_APP_ACCESS_KEY;

function App() {
  const [inputs, setInputs] = useState({
    url: "",
    format: "",
    no_ads: "",
    no_cookie_banners: "",
    width: "",
    height: "",
  });
  const reset = () => {
    setInputs({
      url: "",
      format: "",
      no_ads: "",
      no_cookie_banners: "",
      width: "",
      height: "",
    });
  };
  const [prevImages, setPrevImages] = useState([]);
  const [imageURL, setImageURL] = useState("");
  const callAPI = async (query) => {
    const respone = await fetch(query);
    const json = await respone.json();
    if (json.url == null) {
      alert("Oops! Something went wrong with that query, let's try again!");
    } else {
      setImageURL(json.url);
      setPrevImages((images) => [...images, json.url]);
      reset();
    }
  };
  const makeQuery = () => {
    let wait_until = "network_idle";
    let response_type = "json";
    let fail_on_status = "400%2C404%2C500-511";
    let url_starter = "https://";
    let fullURL = url_starter + inputs.url;
    let query = `https://api.apiflash.com/v1/urltoimage?access_key=${ACCESS_KEY}&url=${fullURL}&format=${inputs.format}&width=${inputs.width}&height=${inputs.height}&no_cookie_banners=${inputs.no_cookie_banners}&no_ads=${inputs.no_ads}&wait_until=${wait_until}&response_type=${response_type}&fail_on_status=${fail_on_status}`;
    callAPI(query).catch(console.error);
  };

  const submitForm = () => {
    let defaultValues = {
      format: "jpeg",
      no_ads: "true",
      no_cookie_banners: "true",
      width: "1920",
      height: "1080",
      url: "",
    };
    if (inputs.url == "" || inputs.url == " ") {
      alert("You forgot to submit an url!");
    } else {
      for (const [key, value] of Object.entries(inputs)) {
        if (value == "" || value == " ") {
          inputs[key] = defaultValues[key];
        }
      }
      makeQuery();
    }
  };

  return (
    <div
      className="whole-page"
      style={{ background: "#335574", color: "black" }}
    >
      <h1 style={{ padding: "10px" }}>Build Your Own Screenshot! 📸</h1>
      <div>
        <h3>Paste your key🔑 here: </h3>
        <input
          type="password"
          name="access_key"
          value={ACCESS_KEY}
          placeholder="Input this attribute..."
          className="textbox"
        />
      </div>

      <APIForm
        inputs={inputs}
        handleChange={(e) =>
          setInputs((prevState) => ({
            ...prevState,
            [e.target.name]: e.target.value.trim(),
          }))
        }
        onSubmit={submitForm}
      />
      <br></br>
      {imageURL ? (
        <img className="screenshot" src={imageURL} alt="Screenshot returned" />
      ) : (
        <div>Nothing to Display</div>
      )}

      <div className="container" style={{ background: "lightblue" }}>
        <h3> Current Query Status: </h3>
        <p>
          https://api.apiflash.com/v1/urltoimage?access_key=ACCESS_KEY
          <br></br>
          &url={inputs.url} <br></br>
          &format={inputs.format} <br></br>
          &width={inputs.width}
          <br></br>
          &height={inputs.height}
          <br></br>
          &no_cookie_banners={inputs.no_cookie_banners}
          <br></br>
          &no_ads={inputs.no_ads}
          <br></br>
        </p>
      </div>
      <div className="gallery">
        <Gallery prevImages={prevImages} />
      </div>

      <br></br>
    </div>
  );
}

export default App;
