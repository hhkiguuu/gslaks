require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const path = require("path");

const app = express();

mongoose.connect(process.env.MONGO_URI);

// ================= MODELS =================
const User = mongoose.model("User", new mongoose.Schema({
  discordId: String,
  profile: Object,
  swipebucks: Number,
  usernames: [String]
}));

const Username = mongoose.model("Username", new mongoose.Schema({
  name: String,
  ownerId: String,
  price: Number
}));

app.use(express.static("public"));
app.use(express.json());

// ================= HOME (UI) =================
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "/public/index.html"));
});

// ================= API: PROFILES =================
app.get("/api/profiles", async (req, res) => {
  const users = await User.find().limit(50);

  res.json(users.map(u => ({
    id: u.discordId,
    name: u.profile?.name,
    bio: u.profile?.bio,
    age: u.profile?.age
  })));
});

// ================= API: MARKET =================
app.get("/api/market", async (req, res) => {
  const items = await Username.find().limit(50);
  res.json(items);
});

// ================= API: LEADERBOARD =================
app.get("/api/leaderboard", async (req, res) => {
  const users = await User.find().sort({ swipebucks: -1 }).limit(10);

  res.json(users.map(u => ({
    id: u.discordId,
    balance: u.swipebucks
  })));
});

// ================= START =================
app.listen(process.env.PORT || 3000, () => {
  console.log("🌐 SwipeCore Web Online");
});
