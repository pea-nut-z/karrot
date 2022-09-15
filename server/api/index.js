import express from "express";
import ShortUniqueId from "short-unique-id";

const uid = new ShortUniqueId({ length: 4 });

const app = express();

app.get("/api", (req, res) => {
  const path = `/api/item/${uid()}`;
  res.setHeader("Content-Type", "text/html");
  res.setHeader("Cache-Control", "s-max-age=1, stale-while-revalidate");
  res.end(`Hello! Go to item: <a href="${path}">${path}</a>`);
});

app.get("/api/item/:slug", (req, res) => {
  const { slug } = req.params;
  res.end(`Item: ${slug}`);
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`listening on ${PORT}`));
