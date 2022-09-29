import "dotenv/config";
import cors from "cors";
import express from "express";
import mongoose from "mongoose";
import * as routes from "./routes/index.js";

mongoose
  .connect(process.env.NODE_ENV ? process.env.MONGODB_URI : process.env.LOCAL_URI)
  .then(() => {
    console.log("Connected to MongoDB");
  })
  .catch((err) => {
    console.log("ENV", process.env.NODE_ENV);
    console.log("DB_URI", process.env.MONGODB_URI);
    console.error(err);
  });

const app = express();
app.use(cors({ origin: true, credentials: true }));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/account", routes.account);
app.use("/profile", routes.profile);
app.use("/activity", routes.activity);
app.use("/listing", routes.listing);
app.use("/review", routes.review);
app.use("/restrict", routes.restrict);

app.get("/", (req, res) => {
  res.send("working");
});

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => console.log(`listening on ${PORT}`));
