import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { supabase } from "../client.js";
import { FaInstagram, FaYoutube } from "react-icons/fa";

const InfoView = () => {
  const { _, id } = useParams();
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [bio, setBio] = useState("");
  const [selectedPfp, setSelectedPfp] = useState(null);
  const [youtube, setYoutube] = useState("");
  const [instagram, setInstagram] = useState("");

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
        setInstagram(data.instagram || "NONE");
      }
    };

    fetchProfile();
  }, [id]);

  return (
    <div
      style={{
        maxWidth: 420,
        margin: "40px auto",
        padding: "2rem",
        background: "#fff",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        gap: "1.5rem",
      }}
    >
      <img
        src={selectedPfp}
        alt={name}
        style={{
          width: 120,
          height: 120,
          borderRadius: "50%",
          objectFit: "cover",
        }}
      />
      <h2
        style={{
          margin: 0,
          fontSize: "1.75rem",
          fontWeight: 700,
          color: "#222",
        }}
      >
        {name}
      </h2>
      {/* bio */}
      <div
        style={{
          fontSize: "1rem",
          color: "#444",
          background: "#f5f5f5",
          borderRadius: 10,
          padding: "1rem",
          width: "100%",
          wordBreak: "break-word",
        }}
      >
        {bio}
      </div>
      <div style={{ display: "flex", gap: 24 }}>
        <a
          href={
            instagram && instagram !== "NONE" && instagram !== "SKIP"
              ? instagram
              : "#"
          }
          target="_blank"
          style={{
            color: "#E1306C",
            opacity:
              instagram && instagram !== "NONE" && instagram !== "SKIP"
                ? 1
                : 0.4,
            fontSize: "1.8rem",
            transition: "opacity 0.3s",
          }}
          onClick={(e) => {
            if (!instagram || instagram === "NONE") {
              e.preventDefault();
              alert("This user does not have an Instagram account");
            } else if (instagram === "SKIP") {
              e.preventDefault();
              alert("This user has skipped providing an Instagram account");
            }
          }}
          title="Instagram"
        >
          <FaInstagram />
        </a>

        {youtube && (
          <a
            href={youtube.replace(
              "https://www.youtube.com/embed/",
              "https://youtu.be/"
            )}
            target="_blank"
            rel="noopener noreferrer"
            style={{
              color: "#FF0000",
              fontSize: "1.8rem",
              transition: "opacity 0.3s",
            }}
            title="YouTube"
          >
            <FaYoutube />
          </a>
        )}
      </div>

      {youtube && youtube !== "NONE" && youtube !== "SKIP" && (
        <iframe
          src={youtube}
          width="100%"
          height="40%"
          allow="autoplay; encrypted-media"
          allowFullScreen
          title="YouTube Audio"
          style={{
            borderRadius: 8,
            display: "block",
          }}
        />
      )}

      <button
        onClick={() => navigate(-1)}
        style={{
          marginTop: 10,
          padding: "10px 20px",
          background: "#1976d2",
          color: "#fff",
          fontWeight: 600,
          border: "none",
          borderRadius: 8,
          cursor: "pointer",
          transition: "background 0.3s",
        }}
        onMouseOver={(e) => (e.target.style.background = "#1565c0")}
        onMouseOut={(e) => (e.target.style.background = "#1976d2")}
      >
        Back
      </button>
    </div>
  );
};

export default InfoView;
