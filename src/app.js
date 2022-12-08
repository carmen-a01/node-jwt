// import express from "express";
// import config from "./config";
// import morgan from "morgan";

// import authRoutes from "./routes/auth";
// import indexRoutes from "./routes/index";
// import tasksRoutes from "./routes/tasks";
const express = require("express");
const app = express();

// app.set("port", config.port);

// app.use(morgan("dev"));
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

app.use(require("./controllers/authController"));
module.exports = app;

// app.use(indexRoutes);
// app.use(authRoutes);
// app.use(tasksRoutes);

// export default app;
