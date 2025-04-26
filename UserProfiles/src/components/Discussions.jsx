import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { supabase } from "../client.js";

const Discussions = () => {
  const { id } = useParams(); // Get the post ID from the URL
  const [post, setPost] = useState(null);
  const [newComment, setNewComment] = useState("");
  const [loading, setLoading] = useState(true);

  // Fetch the post and its comments
  useEffect(() => {
    const fetchPost = async () => {
      const { data, error } = await supabase
        .from("Posts")
        .select()
        .eq("id", id)
        .single();

      if (error) {
        console.error("Error fetching post:", error);
      } else {
        setPost(data);
      }
      setLoading(false);
    };

    fetchPost();
  }, [id]);

  // Add a new comment
  const handleAddComment = async () => {
    if (!newComment.trim()) {
      alert("Comment cannot be empty.");
      return;
    }

    const updatedComments = post.comments
      ? [
          ...post.comments,
          { content: newComment, created_at: new Date().toISOString() },
        ]
      : [{ content: newComment, created_at: new Date().toISOString() }];

    const { error } = await supabase
      .from("Posts")
      .update({ comments: updatedComments })
      .eq("id", id);

    if (error) {
      console.error("Error adding comment:", error);
      alert("Failed to add comment. Please try again.");
    } else {
      setPost({ ...post, comments: updatedComments });
      setNewComment(""); // Clear the input field
    }
  };

  if (loading) {
    return <p>Loading...</p>;
  }

  if (!post) {
    return <p>Post not found.</p>;
  }

  return (
    <div
      style={{
        maxWidth: "800px",
        margin: "0 auto",
        padding: "20px",
        fontFamily: "Arial, sans-serif",
      }}
    >
      <h1 style={{ textAlign: "center", color: "#333", marginBottom: "20px" }}>
        {post.title}
      </h1>
      <div
        style={{
          backgroundColor: "#f9f9f9",
          padding: "20px",
          borderRadius: "8px",
          boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
          marginBottom: "30px",
        }}
      >
        <p style={{ color: "#555", fontSize: "16px", marginBottom: "10px" }}>
          {post.content}
        </p>
        <p
          style={{ color: "#007BFF", fontWeight: "bold", marginBottom: "10px" }}
        >
          Upvotes: {post.upvotes}
        </p>
        <p style={{ color: "#555", fontSize: "14px" }}>
          Posted{" "}
          {Math.floor(
            (new Date() - new Date(post.created_at)) / (1000 * 60 * 60)
          )}{" "}
          hours ago
        </p>
      </div>

      <h2 style={{ color: "#333", marginBottom: "20px" }}>Comments</h2>
      {post.comments && post.comments.length > 0 ? (
        <ul style={{ listStyleType: "none", padding: "0" }}>
          {post.comments.map((comment, index) => (
            <li
              key={index}
              style={{
                backgroundColor: "#f1f1f1",
                padding: "15px",
                borderRadius: "8px",
                marginBottom: "10px",
                boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
              }}
            >
              <p
                style={{ color: "#333", fontSize: "14px", marginBottom: "5px" }}
              >
                {comment.content}
              </p>
              <p style={{ fontSize: "12px", color: "gray" }}>
                Posted at: {new Date(comment.created_at).toLocaleString()}
              </p>
            </li>
          ))}
        </ul>
      ) : (
        <p style={{ color: "#555", fontSize: "14px" }}>
          No comments yet. Be the first to comment!
        </p>
      )}

      <div
        style={{
          marginTop: "30px",
          backgroundColor: "#f9f9f9",
          padding: "20px",
          borderRadius: "8px",
          boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
        }}
      >
        <textarea
          value={newComment}
          onChange={(e) => setNewComment(e.target.value)}
          placeholder="Write a comment..."
          style={{
            width: "100%",
            height: "80px",
            marginBottom: "10px",
            padding: "10px",
            border: "1px solid #ddd",
            borderRadius: "5px",
            fontSize: "14px",
            boxShadow: "inset 0 2px 4px rgba(0, 0, 0, 0.1)",
          }}
        />
        <button
          onClick={handleAddComment}
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
          }}
          onMouseOver={(e) => (e.target.style.backgroundColor = "#0056b3")}
          onMouseOut={(e) => (e.target.style.backgroundColor = "#007BFF")}
        >
          Add Comment
        </button>
      </div>
    </div>
  );
};

export default Discussions;
