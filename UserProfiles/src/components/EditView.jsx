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

  // Fetch the profile data to edit
  useEffect(() => {
    const fetchProfile = async () => {
      const { data, error } = await supabase
        .from("Profiles")
        .select()
        .eq("id", id)
        .single();

      if (error) {
        console.error("Error fetching profile:", error);
      } else {
        setName(data.name);
        setBio(data.bio);
        setSelectedPfp(data.pfp);
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
      .from("Profiles")
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
    const { error } = await supabase.from("Profiles").delete().eq("id", id);

    if (error) {
      console.error("Error deleting profile:", error);
    } else {
      console.log("Profile deleted successfully");
      navigate("/"); // Redirect to the main page after deletion
    }
  };

  return (
    <div>
      <h1>Edit Profile</h1>
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
      <button onClick={handleSubmit}>Update Profile</button>
      <button
        onClick={handleDelete}
        style={{
          marginTop: "10px",
          backgroundColor: "red",
          color: "white",
          border: "none",
          padding: "10px 20px",
          cursor: "pointer",
        }}
      >
        Delete Profile
      </button>
    </div>
  );
};

export default EditView;
