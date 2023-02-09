const { v4: uuidv4 } = require("uuid");
const cors = require("cors");
const express = require("express");
const { Pool } = require("pg");

const app = express();
app.use(cors());
app.use(express.json());

const port = process.env.PORT || 5000;

const pool = new Pool({
  user: "postgres",
  host: "localhost",
  database: "videos",
  port: 5432,
});

app.get("/", (req, res) => {
  pool
    .query("SELECT * FROM videosdata")
    .then((result) => {
      const videos = result.rows;
        res.status(200).send(videos);
    })
    .catch((error) => {
      console.error(error);
      res.status(500).json(error);
    });
});

app.post("/", async (req, res) => {
  const video = { ...req.body };
  Object.assign(video, {
    id: uuidv4(),
    rating: Math.round(Math.random() * 100000),
  });
  await pool.query("INSERT INTO videosdata values($1, $2, $3, $4)", [
    video.id,
    video.title,
    video.url,
    video.rating,
  ]);
  res.status(200).send(video);
});

app.delete("/:id", async (req, res) => {
  await pool
    .query("DELETE FROM videosdata where id like ($1) RETURNING *", [
      req.params.id,
    ])
    .then((result) => {
      const deletedVideo = result.rows;
      res.status(200).send(deletedVideo);
    });
});

app.listen(port, () => console.log(`Listening on port ${port}`));
