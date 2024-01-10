import React, { useState } from "react";
import "../styles/Card.css";
import axios from "axios";

const Card = () => {
  const [username, setUsername] = useState("");
  const [userData, setUserData] = useState(null);

  const handleSearch = async () => {
    try {
      const response = await axios.get(
        `https://api.github.com/users/${username}`
      );
      setUserData(response.data);
    } catch (error) {
      console.error("Error fetching GitHub data", error);
    }
  };

  return (
    <div>
      <h1 id="h1">GitHub User Card</h1>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          handleSearch();
        }}
      >
        <label>
          Enter GitHub Username:
          </label>
          <input id="input"
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        
        <button type="submit">Search</button>
      </form>

      {userData && (
        <div className="user-card">
          <img src={userData.avatar_url} alt="User Avatar" />
          <h2>{userData.login}</h2>
          <p>Name: {userData.name}</p>
          <p>Public Repos: {userData.public_repos}</p>
          <p>Public Gists: {userData.public_gists}</p>
          <p>
            Profile Created:{" "}
            {new Date(userData.created_at).toISOString().split("T")[0]}
          </p>
        </div>
      )}
    </div>
  );
};

export default Card;
