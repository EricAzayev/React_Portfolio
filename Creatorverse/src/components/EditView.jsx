import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { supabase } from "../client.js";

import img1 from "./images/img1.jpg";
import img2 from "./images/img2.jpg";
import img3 from "./images/img3.jpg";

const ProfileImages = [img1, img2, img3];

const EditView = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [bio, setBio] = useState("");
  const [selectedPfp, setSelectedPfp] = useState(null);
  const [uploadedPfp, setUploadedPfp] = useState(null);
  const [youtube, setYoutube] = useState("");

  // Fetch the profile data to edit
  useEffect(() => {
    const fetchProfile = async () => {
      const { data, error } = await supabase
        .from("Creators")
        .select()
        .eq("id", id)
        .single();

      if (error) {
        console.error("Error fetching profile:", error);
      } else {
        setName(data.name);
        setBio(data.bio);
        setSelectedPfp(data.pfp);
        setYoutube(
          data.youtube
            ? data.youtube +
                (data.youtube.includes("?")
                  ? "&autoplay=1&mute=0"
                  : "?autoplay=1&mute=0")
            : ""
        );
        console.log(data);
      }
    };

    fetchProfile();
  }, [id]);

  const handleSubmit = async () => {
    if (!name || !bio || !selectedPfp) {
      alert("Please fill out all fields and select a profile picture.");
      return;
    }

    const updatedUser = {
      name,
      bio,
      pfp: selectedPfp,
    };

    const { error } = await supabase
      .from("Creators")
      .update(updatedUser)
      .eq("id", id);

    if (error) {
      console.error("Error updating profile:", error);
    } else {
      console.log("Profile updated:", updatedUser);
      navigate("/"); // Redirect to the main page after updating
    }
  };

  const handleDelete = async () => {
    const { error } = await supabase.from("Creators").delete().eq("id", id);

    if (error) {
      console.error("Error deleting profile:", error);
    } else {
      console.log("Profile deleted successfully");
      navigate("/");
    }
  };

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

  return (
    <div
      style={{
        maxWidth: 420,
        margin: "40px auto",
        padding: 32,
        borderRadius: 12,
        background: "#D0E0EB",
        boxShadow: "0 2px 16px rgba(0,0,0,0.07)",
        display: "flex",
        flexDirection: "column",
        gap: 20,
      }}
    >
      <h1 style={{ marginBottom: 16 }}>Edit Profile</h1>
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
      <div /*style={{ display: "none" }}*/>
        {youtube && (
          <iframe
            src={youtube}
            frameBorder="0"
            allow="autoplay; encrypted-media"
            allowFullScreen
            title="YouTube Audio"
            //tabIndex={-1}
          />
        )}
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
          padding: "10px 0",
          borderRadius: 6,
          border: "none",
          background: "#1976d2",
          color: "#fff",
          fontWeight: 600,
          cursor: "pointer",
        }}
      >
        Update Profile
      </button>
      <button
        onClick={handleDelete}
        style={{
          marginTop: 6,
          backgroundColor: "#e53935",
          color: "white",
          border: "none",
          borderRadius: 6,
          padding: "10px 0",
          fontWeight: 600,
          cursor: "pointer",
        }}
      >
        Delete Profile
      </button>
    </div>
  );
};

export default EditView;
