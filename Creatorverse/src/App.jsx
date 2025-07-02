import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom"; // Import useNavigate
import { supabase } from "./client.js";
import "./App.css";
import { FaInstagram, FaYoutube, FaEdit, FaInfoCircle } from "react-icons/fa"; // Add FaInfoCircle

function App() {
  const [users, setUsers] = useState([]);
  const [posts, setPosts] = useState([]); // State for posts
  const [searchQuery, setSearchQuery] = useState(""); // State for search query
  const navigate = useNavigate(); // Initialize useNavigate

  const [currentUserId, setCurrentUserId] = useState(null);

  // Fetch users from Supabase
  const fetchUsers = async () => {
    const { data, error } = await supabase.from("Creators").select();
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

  const handleInfoClick = (name, id) => {
    console.log(name + id);
    navigate(`/info/${name}/${id}`);
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
    <div id="wrapper">
      <div id="front-page">
        <h1>Welcome to the Creatorverse</h1>
        <div className="left-right">
          {/* Bring the user to the front page */}
          <button
            onClick={() => {
              document
                .getElementById("creators-section")
                .scrollIntoView({ behavior: "smooth" });
            }}
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
            View Creators
          </button>
          {/* Add Creator */}
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
        </div>
      </div>
      {/* End of Title Page */}

      {/* Creators Section */}
      <div
        id="creators-section"
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(2, minmax(0, 1fr))",
          gap: "36px",
          justifyContent: "center",
          marginTop: "40px",
          maxWidth: "900px",
          marginLeft: "auto",
          marginRight: "auto",
        }}
      >
        {users.map((user, index) => (
          <div
            key={index}
            style={{
              backgroundImage: `url(${user.pfp})`,
              backgroundSize: "cover",
              backgroundPosition: "center",
              borderRadius: "18px",
              width: "380px",
              height: "340px",
              boxShadow: "0 8px 28px rgba(0,0,0,0.18)",
              position: "relative",
              color: "white",
              display: "flex",
              flexDirection: "column",
              justifyContent: "flex-end",
              cursor: "pointer",
              overflow: "hidden",
              margin: "0 auto",
            }}
            // onClick={() => handleEditClick(user.id)}
          >
            <div
              style={{
                background: "rgba(0,0,0,0.55)",
                padding: "24px",
                borderBottomLeftRadius: "18px",
                borderBottomRightRadius: "18px",
                height: "70%",
                display: "flex",
                flexDirection: "column",
                justifyContent: "flex-end",
              }}
            >
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  marginBottom: 12,
                }}
              >
                <FaInfoCircle
                  style={{
                    marginRight: 10,
                    cursor: "pointer",
                    fontSize: "1.2rem",
                    color: "#00bcd4",
                  }}
                  title="Profile Info"
                  onClick={() => handleInfoClick(user.name, user.id)}
                />
                <span
                  style={{
                    fontWeight: 700,
                    fontSize: "1.35rem",
                    flex: 1,
                  }}
                >
                  {user.name}
                </span>
                <FaEdit
                  style={{
                    marginLeft: 12,
                    cursor: "pointer",
                    fontSize: "1.2rem",
                  }}
                  onClick={(e) => {
                    e.stopPropagation();
                    handleEditClick(user.id);
                  }}
                  title="Edit"
                />
              </div>
              <div
                style={{
                  display: "flex",
                  gap: 20,
                  marginBottom: 14,
                }}
              >
                <a
                  href={
                    user.instagram &&
                    user.instagram !== "NONE" &&
                    user.instagram !== "SKIP"
                      ? user.instagram
                      : "#"
                  }
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{
                    color: "#E1306C",
                    opacity:
                      user.instagram &&
                      user.instagram !== "NONE" &&
                      user.instagram !== "SKIP"
                        ? 1
                        : 0.4,
                    fontSize: "1.7rem",
                  }}
                  onClick={(e) => {
                    if (!user.instagram || user.instagram === "NONE") {
                      e.preventDefault();
                      alert("This user does not have an Instagram account");
                    } else if (user.instagram === "SKIP") {
                      e.preventDefault();
                      alert(
                        "This user has skipped providing an Instagram account"
                      );
                    }
                    e.stopPropagation();
                  }}
                  title="Instagram"
                >
                  <FaInstagram />
                </a>
                <a
                  href={user.youtube.replace(
                    "https://www.youtube.com/embed/",
                    "https://youtu.be/"
                  )}
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{
                    color: "#FF0000",
                    opacity: user.youtube ? 1 : 0.4,
                    fontSize: "1.7rem",
                  }}
                  onClick={(e) => {
                    if (!user.youtube) e.preventDefault();
                    e.stopPropagation();
                  }}
                  title="YouTube"
                >
                  <FaYoutube />
                </a>
              </div>
              <div
                style={{
                  fontSize: "1.00rem",
                  color: "#f3f3f3",
                  minHeight: "48px",
                  maxHeight: "72px",
                  overflow: "hidden",
                  textOverflow: "ellipsis",
                  display: "-webkit-box",
                  WebkitLineClamp: 3, // Show up to 3 lines
                  WebkitBoxOrient: "vertical",
                  whiteSpace: "normal",
                  marginBottom: "25px",
                }}
              >
                {user.bio}
              </div>
            </div>
          </div>
        ))}
      </div>
      {/* End of the Creators Section */}

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
                  navigate(`/edit-post/${post.id}`);
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
