import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom"; // Import useNavigate
import { supabase } from "./client.js";
import "./App.css";

function App() {
  const [users, setUsers] = useState([]);
  const navigate = useNavigate(); // Initialize useNavigate

  // Fetch users from Supabase
  const fetchUsers = async () => {
    const { data, error } = await supabase.from("Profiles").select();
    if (error) {
      console.error("Error fetching users:", error);
    } else {
      setUsers(data);
    }
  };

  // Fetch users on component mount
  useEffect(() => {
    fetchUsers();
  }, []);

  const handleEditClick = (id) => {
    navigate(`/edit/${id}`); // Navigate to the edit page with the user's ID
  };

  const handleCreateClick = () => {
    navigate("/create"); // Navigate to the CreateView component
  };

  return (
    <div>
      <h1>User Profiles</h1>
      <button
        onClick={handleCreateClick}
        style={{
          marginBottom: "20px",
          padding: "10px 20px",
          backgroundColor: "blue",
          color: "white",
          border: "none",
          borderRadius: "5px",
          cursor: "pointer",
        }}
      >
        Create Profile
      </button>
      <div style={{ display: "flex", flexWrap: "wrap", gap: "20px" }}>
        {users.map((user, index) => (
          <div
            key={index}
            onClick={() => handleEditClick(user.id)} // Add click handler
            style={{
              border: "1px solid gray",
              borderRadius: "8px",
              padding: "10px",
              width: "200px",
              textAlign: "center",
              cursor: "pointer", // Indicate it's clickable
            }}
          >
            <img
              src={user.pfp}
              alt={`${user.name}'s profile`}
              style={{ width: "100px", height: "100px", borderRadius: "50%" }}
            />
            <h3>{user.name}</h3>
            <p>{user.bio}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;
