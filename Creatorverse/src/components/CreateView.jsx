import React, { useState } from "react";
import { supabase } from "../client.js";

import img1 from "./images/img1.jpg";
import img2 from "./images/img2.jpg";
import img3 from "./images/img3.jpg";

const ProfileImages = [img1, img2, img3];

const CreateView = () => {
  const [name, setName] = useState("");
  const [bio, setBio] = useState("");
  const [selectedPfp, setSelectedPfp] = useState(null);
  const [uploadedPfp, setUploadedPfp] = useState(null);
  const [user, setUser] = useState(null);
  const [youtube, setYoutube] = useState(""); // Add this line
  const [instagram, setInstagram] = useState("SKIP"); // Add this state

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setUploadedPfp(reader.result);
        setSelectedPfp(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = () => {
    if (!name || !bio || !selectedPfp || !instagram) {
      alert("Please fill out all fields and select a profile picture.");
      return;
    }
    const processedYoutube = youtube
      .replace("https://youtu.be/", "https://www.youtube.com/embed/")
      .trim();

    const newUser = {
      name,
      bio,
      pfp: selectedPfp,
      youtube: processedYoutube,
      instagram, // add this line
    };

    const addUser = async () => {
      await supabase
        .from("Creators")
        .insert({
          name: newUser.name,
          bio: newUser.bio,
          pfp: newUser.pfp,
          youtube: newUser.youtube,
          instagram: newUser.instagram, // add this line
        })
        .select();

      window.location = "/";
    };

    addUser();

    //setUser(newUser);
    console.log("User created:", newUser);
  };

  return (
    <div
      style={{
        maxWidth: 420,
        margin: "40px auto",
        padding: 32,
        borderRadius: 12,
        background: "#fff",
        boxShadow: "0 2px 16px rgba(0,0,0,0.07)",
        display: "flex",
        flexDirection: "column",
        gap: 20,
      }}
    >
      <h1 style={{ marginBottom: 16 }}>Create Profile</h1>
      <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
        <label style={{ fontWeight: 500, marginBottom: 4 }}>Name:</label>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Enter your name"
          style={{
            padding: "10px",
            borderRadius: 6,
            border: "1px solid #ccc",
          }}
        />
      </div>
      <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
        <label style={{ fontWeight: 500, marginBottom: 4 }}>Bio:</label>
        <textarea
          value={bio}
          onChange={(e) => setBio(e.target.value)}
          placeholder="Enter your bio"
          style={{
            padding: "10px",
            borderRadius: 6,
            border: "1px solid #ccc",
            minHeight: 60,
          }}
        />
      </div>
      <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
        <label style={{ fontWeight: 500, marginBottom: 4 }}>
          Youtube Music Clip:
        </label>
        <input
          type="text"
          value={youtube}
          onChange={(e) => setYoutube(e.target.value)}
          placeholder="Paste a YouTube link or ID"
          style={{
            padding: "10px",
            borderRadius: 6,
            border: "1px solid #ccc",
          }}
        />
      </div>

      <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
        <label style={{ fontWeight: 500, marginBottom: 4 }}>
          Instagram Account:
        </label>
        <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
          <input
            type="text"
            value={instagram}
            onChange={(e) => setInstagram(e.target.value)}
            placeholder="Paste an Instagram link or ID"
            style={{
              padding: "10px",
              borderRadius: 6,
              border: "1px solid #ccc",
              flex: 1,
            }}
          />
          <button
            type="button"
            style={{
              padding: "6px 10px",
              borderRadius: 5,
              border: "1px solid #bbb",
              background: "#f5f5f5",
              color: "#444",
              cursor: "pointer",
              fontSize: "0.95rem",
            }}
            onClick={() => setInstagram("NONE")}
          >
            Does not have
          </button>
          <button
            type="button"
            style={{
              padding: "6px 10px",
              borderRadius: 5,
              border: "1px solid #bbb",
              background: "#e3f7e3",
              color: "#1976d2",
              cursor: "pointer",
            }}
            onClick={() => setInstagram("SKIP")}
          >
            Skip
          </button>
        </div>
      </div>
      <div>
        <h3 style={{ margin: "12px 0 8px 0" }}>Select a Profile Picture:</h3>
        <div
          style={{
            display: "flex",
            gap: 10,
            alignItems: "center",
            flexWrap: "wrap",
          }}
        >
          {ProfileImages.map((image, index) => (
            <img
              key={index}
              src={image}
              alt={`Profile ${index + 1}`}
              onClick={() => setSelectedPfp(image)}
              style={{
                width: 70,
                height: 70,
                borderRadius: 8,
                border:
                  selectedPfp === image
                    ? "3px solid #1976d2"
                    : "1px solid #bbb",
                cursor: "pointer",
                objectFit: "cover",
              }}
            />
          ))}
          {uploadedPfp && (
            <img
              src={uploadedPfp}
              alt="Uploaded"
              onClick={() => setSelectedPfp(uploadedPfp)}
              style={{
                width: 70,
                height: 70,
                borderRadius: 8,
                border:
                  selectedPfp === uploadedPfp
                    ? "3px solid #1976d2"
                    : "1px solid #bbb",
                cursor: "pointer",
                objectFit: "cover",
              }}
            />
          )}
          <label
            style={{
              display: "inline-block",
              width: 70,
              height: 70,
              border: "1px dashed #bbb",
              borderRadius: 8,
              textAlign: "center",
              lineHeight: "70px",
              cursor: "pointer",
              background: "#fafafa",
              color: "#888",
              fontSize: "2rem",
            }}
          >
            +
            <input
              type="file"
              accept="image/*"
              style={{ display: "none" }}
              onChange={handleImageUpload}
            />
          </label>
        </div>
      </div>
      <button
        onClick={handleSubmit}
        style={{
          marginTop: 10,
          padding: "10px",
          borderRadius: 6,
          background: "#1976d2",
          color: "#fff",
          fontWeight: 600,
          cursor: "pointer",
        }}
      >
        Create Profile
      </button>
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
