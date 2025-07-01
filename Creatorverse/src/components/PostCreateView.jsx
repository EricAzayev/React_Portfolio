import React, { useState } from "react";
import { supabase } from "../client.js";

const PostCreateView = () => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");

  const handleSubmit = async () => {
    if (!title || !content) {
      alert("Please fill out all fields.");
      return;
    }

    try {
      const { error } = await supabase.from("Posts").insert({
        title,
        content,
        upvotes: 0, // Default upvotes to 0
      });

      if (error) {
        console.error("Error creating post:", error);
        alert("Failed to create post. Please try again.");
        return;
      }

      alert("Post created successfully!");
      setTitle(""); // Clear the title input
      setContent(""); // Clear the content input
      //navigate("/");
    } catch (err) {
      console.error("Unexpected error:", err);
      alert("An unexpected error occurred. Please try again.");
    }
  };

  return (
    <div>
      <h1>Create Post</h1>
      <div>
        <label>
          Title:
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Enter the post title"
          />
        </label>
      </div>
      <div>
        <label>
          Content:
          <textarea
            value={content}
            onChange={(e) => setContent(e.target.value)}
            placeholder="Enter the post content"
          />
        </label>
      </div>
      <button onClick={handleSubmit}>Create Post</button>
    </div>
  );
};

export default PostCreateView;
