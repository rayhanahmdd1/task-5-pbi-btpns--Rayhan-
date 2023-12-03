import { createApp } from "vue";
import App from "./App.vue";

const express = require("express");
const bodyParser = require("body-parser");

const app = express();
app.use(bodyParser.json());

// Database mock (temporary)
let users = [];

// Endpoint for user signup
app.post("/signup", (req, res) => {
  const { username, password } = req.body;
  // Perform signup logic here (e.g., add user to database)
  // For simplicity, let's just store the user in memory for this example
  users.push({ username, password });
  res.status(200).send("Signup successful");
});

// Endpoint for user login
app.post("/login", (req, res) => {
  const { username, password } = req.body;
  // Perform login logic here (e.g., verify user credentials)
  // For simplicity, let's assume username and password match
  // Generate a token for the logged-in user
  const token = generateToken(username);
  res.status(200).json({ token });
});

// Endpoint for adding/updating profile picture
app.post("/profile-picture", authenticateUser, (req, res) => {
  const { token, profilePicture } = req.body;
  const user = getUserFromToken(token);
  if (!user) {
    res.status(401).send("Unauthorized");
    return;
  }
  // Update profile picture logic here (e.g., store picture URL in user data)
  user.profilePicture = profilePicture;
  res.status(200).send("Profile picture added/updated successfully");
});

// Endpoint for deleting profile picture
app.delete("/profile-picture", authenticateUser, (req, res) => {
  const { token } = req.body;
  const user = getUserFromToken(token);
  if (!user) {
    res.status(401).send("Unauthorized");
    return;
  }
  // Delete profile picture logic here (e.g., remove picture URL from user data)
  user.profilePicture = null;
  res.status(200).send("Profile picture deleted successfully");
});

// Middleware to authenticate user based on token
function authenticateUser(req, res, next) {
  const { token } = req.body;
  // Perform token verification logic here (e.g., check if token is valid)
  // For simplicity, let's skip token verification for this example
  // You should implement proper token verification/validation logic here
  if (token) {
    next();
  } else {
    res.status(401).send("Unauthorized");
  }
}

// Helper function to generate a token (mock function)
function generateToken(username) {
  return `token_${username}`;
}

// Helper function to get user from token (mock function)
function getUserFromToken(token) {
  // Mock implementation: find user based on token
  // Replace this with actual logic to retrieve user from database using token
  return users.find((user) => user.token === token);
}

// Start the server
const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

createApp(App).mount("#app");
