// api
const express = require('express');
const dotenv = require('dotenv').config();
// database
const mongoose = require('mongoose')
const cors = require('cors')

const app = express();

app.use(express.json());
app.use(cors());

const DB_BASE_URL = process.env.DB_BASE_URL

mongoose.connect(`${DB_BASE_URL}/watchlist`)
    .then( () => console.log("DB Connection Successful"))
    .catch(console.error);

const Watchlist = require('./models/Watchlist')

// gets all the movies in the watchlists
app.get('/watchlist', async (req, res) => {
    try {
        const watchlist = await Watchlist.find();
        res.status(200).json(watchlist);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

app.post('/watchlist/new', async (req, res) => {
    try {
        const movie = req.body;
        const watchlist = new Watchlist({
            Poster: movie.Poster,
            Title: movie.Title,
            Rated: movie.Rated,
            imdbRating: movie.imdbRating,
            Runtime: movie.Runtime,
            Genre: movie.Genre,
            imdbID: movie.imdbID,
            Plot: movie.Plot
        });
        await watchlist.save();
        res.status(201).json(watchlist);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});


app.delete('/watchlist/delete/:id', async (req, res) => {
    try {
        const result = await Watchlist.findByIdAndDelete(req.params.id);
        if (!result) {
            return res.status(404).json({ message: "Movie not found" });
        }
        res.status(200).json(result);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});


const server = app.listen(3001, () => console.log("Server started on 3001"));
module.exports = { app, server };
