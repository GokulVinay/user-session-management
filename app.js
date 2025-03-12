require("dotenv").config();
const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const session = require("express-session");
const RedisStore = require("connect-redis").default;
const redisClient = require("./config/redis");
const authRoutes = require("./routes/authRoutes");

const app = express();

// 🛠️ Middleware
app.use(cors());
app.use(bodyParser.json());

// 🔐 Redis Session Configuration
app.use(
  session({
    store: new RedisStore({ client: redisClient }),
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    cookie: { secure: false, httpOnly: true, maxAge: 86400000 },
  })
);

// 🚀 Mount Routes
app.use("/api/auth", authRoutes);

module.exports = app;
