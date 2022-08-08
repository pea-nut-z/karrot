import "dotenv/config";
// import cors from "cors";
import express from "express";
import mongoose from "mongoose";
import * as routes from "./routes/index.js";
import * as actions from "./actions.js";

mongoose
  .connect(process.env.DATABASE_URL)
  .then(() => console.log("DB Connected"))
  .catch((err) => console.error(err));

const app = express();
// app.use(cors({ origin: true, credentials: true }));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/myAccount", routes.myAccount);
app.use("/listing", routes.listing);

app.get("/homeListings", async (req, res) => {
  const listings = await actions.getHomeListings();
  res.json({ listings });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`listening on ${PORT}`));
