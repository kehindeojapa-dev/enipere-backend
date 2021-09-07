// Imports
import express from "express";
import mongoose from "mongoose";
import fileUpload from "express-fileupload";
import cors from "cors";

// App Config
const app = express();
const port = process.env.PORT || 9000;

// Middlewares
app.use(express.json());
// app.use((req, res, next) => {
//   res.setHeader("Access-Control-Allow-Origin", "*");
//   res.setHeader("Access-Control-Allow-Headers", "*");
//   next();
// });
app.use(cors());
app.use(express.static("Public"));
app.use(fileUpload());

// DB Config
const connection_url = "mongodb://127.0.0.1:27017/blogPostsDB";
const connection_url2 = "mongodb+srv://kehinde:rW9NiW4qpMbpE9oh@cluster0.zna6p.mongodb.net/enipereDB?retryWrites=true&w=majority";
mongoose
  .connect(connection_url2, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("MongoDB connection successful"))
  .catch((err) => console.log(err));

// API Routes
import basicRoutes from "./Routes/basic.js";
import usersRoute from "./Routes/usersRoute.js";
import commentsRoute from "./Routes/commentRoute.js";
// redirect (/server) requests to the routes/basic routes
app.use("/server", basicRoutes);
// redirect (/user) requests to the routes/usersRoute routes
app.use("/users", usersRoute);
// redirect (/comment) requests to the routes/commentRoute routes
app.use("/comments", commentsRoute);
// Port Listen
app.listen(port, () => console.log(`Server is listening at port ${port}`));
