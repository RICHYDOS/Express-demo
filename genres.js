const express = require("express");
const Joi = require("joi");
const app = express();
app.use(express.json());

const genres = [
    "Action",
    "Comedy",
    "Romance",
    "Romcom",
    "Thriller",
    "Horror",
    "Adventure",
]

app.get("/api/genres", (req, res) => {
    return res.send(genres);
});

app.post("/api/genres", (req, res) => {

    const genre = req.body;
    genres.push(genre);
    return res.send(genre);
});

app.listen(3000, () => console.log("Server Running!"));