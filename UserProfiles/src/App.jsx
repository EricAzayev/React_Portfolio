import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom"; // Import useNavigate
import { supabase } from "./client.js";
import "./App.css";

function App() {
  const [users, setUsers] = useState([]);
  const [posts, setPosts] = useState([]); // State for posts
  const [searchQuery, setSearchQuery] = useState(""); // State for search query
  const navigate = useNavigate(); // Initialize useNavigate

  const [currentUserId, setCurrentUserId] = useState(null);

  // Fetch users from Supabase
  const fetchUsers = async () => {
    const { data, error } = await supabase.from("Profiles").select();
    if (error) {
      console.error("Error fetching users:", error);
    } else {
      setUsers(data);
    }
  };

  // Fetch posts from Supabase
  const fetchPosts = async () => {
    const { data, error } = await supabase.from("Posts").select();
    if (error) {
      console.error("Error fetching posts:", error);
    } else {
      setPosts(data);
    }
  };

  useEffect(() => {
    fetchUsers();
    fetchPosts();
  }, []);

  const handleEditClick = (id) => {
    navigate(`/edit/${id}`);
  };

  const handleCreateClick = () => {
    navigate("/create");
  };

  const handleAddPostClick = () => {
    navigate("/create-post");
  };

  // Filter posts based on search query
  const filteredPosts = posts.filter((post) =>
    post.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

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
            onClick={() => handleEditClick(user.id)}
            style={{
              border: "1px solid gray",
              borderRadius: "8px",
              padding: "10px",
              width: "200px",
              textAlign: "center",
              cursor: "pointer",
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

      {/* Posts Section */}
      <div
        style={{
          marginTop: "40px",
          borderTop: "2px solid black",
          paddingTop: "20px",
        }}
      >
        <h2>Posts</h2>
        {/* Search Input and Sort Buttons */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            marginBottom: "20px",
          }}
        >
          <input
            type="text"
            placeholder="Search posts by title..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            style={{
              padding: "10px",
              width: "70%",
              border: "1px solid gray",
              borderRadius: "5px",
            }}
          />
          <div style={{ display: "flex", gap: "10px" }}>
            <button
              onClick={() => {
                const sortedPosts = [...posts].sort(
                  (a, b) => new Date(b.created_at) - new Date(a.created_at)
                );
                setPosts(sortedPosts);
              }}
              style={{
                padding: "10px 20px",
                backgroundColor: "blue",
                color: "white",
                border: "none",
                borderRadius: "5px",
                cursor: "pointer",
              }}
            >
              Newest
            </button>
            <button
              onClick={() => {
                const sortedPosts = [...posts].sort(
                  (a, b) => b.upvotes - a.upvotes
                );
                setPosts(sortedPosts);
              }}
              style={{
                padding: "10px 20px",
                backgroundColor: "green",
                color: "white",
                border: "none",
                borderRadius: "5px",
                cursor: "pointer",
              }}
            >
              Most Liked
            </button>
          </div>
        </div>
        <button
          onClick={handleAddPostClick}
          style={{
            fontSize: "24px",
            width: "60px",
            height: "60px",
            borderRadius: "50%",
            backgroundColor: "green",
            color: "white",
            border: "none",
            cursor: "pointer",
            marginBottom: "20px",
          }}
        >
          +
        </button>
        <div
          style={{
            display: "flex",
            flexWrap: "wrap",
            gap: "20px",
            justifyContent: "center",
          }}
        >
          {filteredPosts.map((post, index) => (
            <div
              key={index}
              onClick={() => navigate(`/discussions/${post.id}`)}
              style={{
                border: "1px solid gray",
                borderRadius: "8px",
                padding: "20px",
                width: "300px",
                textAlign: "center",
                cursor: "pointer",
                backgroundColor: "#f9f9f9",
                boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
                transition: "transform 0.3s ease, box-shadow 0.3s ease",
              }}
              onMouseOver={(e) => {
                e.target.style.transform = "scale(1.05)";
                e.target.style.boxShadow = "0 6px 10px rgba(0, 0, 0, 0.15)";
              }}
              onMouseOut={(e) => {
                e.target.style.transform = "scale(1)";
                e.target.style.boxShadow = "0 4px 6px rgba(0, 0, 0, 0.1)";
              }}
            >
              <h3 style={{ color: "#333", marginBottom: "10px" }}>
                {post.title}
              </h3>
              <p
                style={{
                  color: "#555",
                  fontSize: "14px",
                  marginBottom: "10px",
                }}
              >
                {post.content}
              </p>
              <p
                style={{
                  color: "#007BFF",
                  fontWeight: "bold",
                  marginBottom: "10px",
                }}
              >
                Upvotes: {post.upvotes}
              </p>
              <p
                style={{
                  color: "#555",
                  fontSize: "12px",
                  marginBottom: "10px",
                }}
              >
                Posted{" "}
                {Math.floor(
                  (new Date() - new Date(post.created_at)) / (1000 * 60 * 60)
                )}{" "}
                hours ago
              </p>
              <button
                onClick={(e) => {
                  e.stopPropagation(); // Prevent navigating to discussions
                  const updatedPosts = posts.map((p) =>
                    p.id === post.id ? { ...p, upvotes: p.upvotes + 1 } : p
                  );
                  setPosts(updatedPosts);
                }}
                style={{
                  padding: "10px 20px",
                  backgroundColor: "#28a745",
                  color: "white",
                  border: "none",
                  borderRadius: "5px",
                  cursor: "pointer",
                  fontSize: "14px",
                  boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
                  transition: "background-color 0.3s ease",
                  marginBottom: "10px",
                }}
                onMouseOver={(e) =>
                  (e.target.style.backgroundColor = "#1e7e34")
                }
                onMouseOut={(e) => (e.target.style.backgroundColor = "#28a745")}
              >
                Like
              </button>
              <button
                onClick={(e) => {
                  e.stopPropagation(); // Prevent navigating to discussions
                  navigate(`/edit-post/${post.id}`); // Navigate to the editPost route
                }}
                style={{
                  padding: "10px 20px",
                  backgroundColor: "#007BFF",
                  color: "white",
                  border: "none",
                  borderRadius: "5px",
                  cursor: "pointer",
                  fontSize: "14px",
                  boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
                  transition: "background-color 0.3s ease",
                  marginBottom: "10px",
                }}
                onMouseOver={(e) =>
                  (e.target.style.backgroundColor = "#0056b3")
                }
                onMouseOut={(e) => (e.target.style.backgroundColor = "#007BFF")}
              >
                Edit Post
              </button>
              <button
                onClick={(e) => {
                  e.stopPropagation(); // Prevent navigating to discussions
                  const confirmDelete = window.confirm(
                    "Are you sure you want to delete this post?"
                  );
                  if (confirmDelete) {
                    const deletePost = async () => {
                      const { error } = await supabase
                        .from("Posts")
                        .delete()
                        .eq("id", post.id);

                      if (error) {
                        console.error("Error deleting post:", error);
                        alert("Failed to delete the post. Please try again.");
                      } else {
                        setPosts(posts.filter((p) => p.id !== post.id));
                        //alert("Post deleted successfully!");
                      }
                    };
                    deletePost();
                  }
                }}
                style={{
                  padding: "10px 20px",
                  backgroundColor: "#dc3545",
                  color: "white",
                  border: "none",
                  borderRadius: "5px",
                  cursor: "pointer",
                  fontSize: "14px",
                  boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
                  transition: "background-color 0.3s ease",
                }}
                onMouseOver={(e) =>
                  (e.target.style.backgroundColor = "#c82333")
                }
                onMouseOut={(e) => (e.target.style.backgroundColor = "#dc3545")}
              >
                Delete Post
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default App;
