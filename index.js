const express = require("express");
const cors = require("cors");
const app = express();
const knex = require("./db");

app.use(cors());

// app.use("/", express.static(__dirname + "/frontend/dist")); //これをやるかbuildの設定をやるかの違いかな？

app.get("/api/comic", async (req, res) => {
  const comic = await knex.select("comic_name", "comic_volume").table("comic");
  res.json(comic);
});

app.use("/", express.json());

app.post("/api/comic", async (req, res) => {
  const body = req.body;
  await knex("comic").insert(body);
  res.end();
});

app.delete("/api/comic/delete", async (req, res) => {
  const body = req.body;
  await knex("comic").del().where("comic_name", body.comic_name);
  console.log("削除します");
});

app.patch("/api/comic/update", async (req, res) => {
  const body = req.body;
  await knex("comic")
    .update({
      comic_volume: body["new_volume"],
    })
    .where("comic_name", body["comic_name"]);
});

app.listen(3000, () => {
  console.log("server is runnning 3000");
});
