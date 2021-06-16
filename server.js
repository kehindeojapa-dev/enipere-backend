// Imports
import express from "express";
import mongoose from "mongoose";
import bodyParser from "body-parser";

// App Config
const app = express();
const port = process.env.PORT || 9000;

// Middlewares
app.use(express.json());
app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Headers", "*");
  next();
});

// DB Config
const connection_url = "mongodb://127.0.0.1:27017/blogPostsDB";
mongoose
  .connect(connection_url, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("MongoDB connection successful"))
  .catch((err) => console.log(err));

// API Routes
import basicRoutes from "./Routes/basic.js";
// redirect (/server) requests to the routes/basic routes
app.use("/server", basicRoutes);

// Port Listen
app.listen(port, () => console.log(`Server is listening at port ${port}`));
