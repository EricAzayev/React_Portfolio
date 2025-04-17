import React from "react";
import { useState } from "react";
import { supabase } from "../client.js";

import img1 from "./images/img1.jpg";
import img2 from "./images/img2.jpg";
import img3 from "./images/img3.jpg";

const ProfileImages = [img1, img2, img3];

const CreateView = () => {
  const [name, setName] = useState("");
  const [bio, setBio] = useState("");
  const [selectedPfp, setSelectedPfp] = useState(null);
  const [user, setUser] = useState(null);

  const handleSubmit = () => {
    if (!name || !bio || !selectedPfp) {
      alert("Please fill out all fields and select a profile picture.");
      return;
    }

    const newUser = {
      name,
      bio,
      pfp: selectedPfp,
    };

    const addUser = async () => {
      await supabase
        .from("Profiles")
        .insert({ name: newUser.name, bio: newUser.bio, pfp: newUser.pfp })
        .select();

      window.location = "/";
    };

    addUser();

    //setUser(newUser);
    console.log("User created:", newUser);
  };

  return (
    <div>
      <h1>Create View</h1>
      <div>
        <label>
          Name:
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Enter your name"
          />
        </label>
      </div>
      <div>
        <label>
          Bio:
          <textarea
            value={bio}
            onChange={(e) => setBio(e.target.value)}
            placeholder="Enter your bio"
          />
        </label>
      </div>
      <div>
        <h3>Select a Profile Picture:</h3>
        <div style={{ display: "flex", gap: "10px" }}>
          {ProfileImages.map((image, index) => (
            <img
              key={index}
              src={image}
              alt={`Profile ${index + 1}`}
              onClick={() => setSelectedPfp(image)}
              style={{
                width: "100px",
                height: "100px",
                border:
                  selectedPfp === image ? "3px solid blue" : "1px solid gray",
                cursor: "pointer",
              }}
            />
          ))}
        </div>
      </div>
      <button onClick={handleSubmit}>Create Profile</button>
      {user && (
        <div>
          <h2>Profile Created:</h2>
          <p>
            <strong>Name:</strong> {user.name}
          </p>
          <p>
            <strong>Bio:</strong> {user.bio}
          </p>
          <img
            src={user.pfp}
            alt="Selected Profile"
            style={{ width: "100px", height: "100px" }}
          />
        </div>
      )}
    </div>
  );
};

export default CreateView;
