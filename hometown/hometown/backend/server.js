require("dotenv").config();

const express = require("express");
const cors = require("cors");
const path = require("path");

const app = express();

// ================= DATABASE =================
require("./config/db");

// ================= MIDDLEWARE =================

// 🔥 IMPORTANT: Use this first for testing
app.use(cors()); 

// After testing, replace with:
// app.use(cors({
//   origin: "https://your-vercel-app.vercel.app",
//   credentials: true
// }));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// ================= STATIC FRONTEND =================
app.use(express.static(path.join(__dirname, "../frontend")));

// ================= ROUTES =================
app.use("/api/auth", require("./routes/authRoutes"));
app.use("/api/users", require("./routes/userRoutes"));
app.use("/api/community", require("./routes/communityRoutes"));
app.use("/api/posts", require("./routes/postRoutes"));
app.use("/api/comments", require("./routes/commentRoutes"));
app.use("/api/admin", require("./routes/adminRoutes"));
app.use("/api/events", require("./routes/eventRoutes"));
app.use("/api/notifications", require("./routes/notificationRoutes"));
app.use("/api/hometown", require("./routes/hometownRoutes"));

// ================= TEST ROUTES =================

// Root check
app.get("/", (req, res) => {
  res.send("✅ Server Running");
});

// API check
app.get("/api", (req, res) => {
  res.send("🚀 Hometown Hub API Running");
});

// ================= ERROR HANDLING =================

// 404 handler
app.use((req, res) => {
  res.status(404).json({
    success: false,
    message: "Route not found"
  });
});

// Global error handler
app.use((err, req, res, next) => {
  console.error("🔥 ERROR:", err);

  res.status(500).json({
    success: false,
    message: "Server Error"
  });
});

// ================= SERVER =================

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});