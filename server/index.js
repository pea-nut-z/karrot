import express from "express";

const app = express();

app.get("/getRequest/:name", (req, res) => {
  res.send(`Testing name: ${req.params.name}`);
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`listening on ${PORT}`));
