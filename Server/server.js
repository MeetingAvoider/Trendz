const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const cookieParser = require("cookie-parser");
const cors = require("cors");
const authRouter = require("./routes/authRouter");
dotenv.config();

//to instantiate express contructor
const app = express();

//cors configuration
app.use(
  cors({
    origin: "http://localhost:5173",
    methods: ["GET", "POST", "PATCH", "PUT", "DELETE"],
    allowedHeaders: [
      "Content-Type",
      "Authorization",
      "Cache-Control",
      "Expires",
      "Pragma",
    ],
    credentials: true,
  })
);

//cookie
app.use(cookieParser());
app.use(express.json());
app.use("/api/auth", authRouter);
app.all("*", (req, res, next) => {
  res.status(404).json({
    status: "failed",
    message: `There is no ${req.url} page.`,
  });
});

//connect mongodb
mongoose
  .connect(process.env.DBSTR)
  .then(() => {
    console.log("Database connected successfully:");
  })
  .catch((err) => {
    console.log(err.message);
  });

const port = 5000;
app.get("/home", (req, res) => {
  res.status(200).json({
    status: "Successfully:",
  });
});
app.listen(port, () => {
  console.log(`Server is listening on localhost:${port}`);
});
