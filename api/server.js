// api
const express = require('express');
// database
const mongoose = require('mongoose')
const cors = require('cors')

const app = express();

app.use(express.json());
app.use(cors());

mongoose.connect("mongodb://0.0.0.0:27017/watchlist")
    .then( () => console.log("DB Connection Successful"))
    .catch(console.error);

const Watchlist = require('./models/Watchlist')

// gets all the movies in the watchlists
app.get('/watchlist', async(req, res) => {
    const watchlist = await Watchlist.find();
    res.json(watchlist);
});

app.post('/watchlist/new', async(req, res) => {
    const watchlist = new Watchlist({
        Poster: req.body.movie.Poster,
        Title: req.body.movie.Title,
        Rated: req.body.movie.Rated,
        imdbRating: req.body.movie.imdbRating,
        Runtime: req.body.movie.Runtime,
        Genre: req.body.movie.Genre,
        imdbID: req.body.movie.imdbID,
        Plot: req.body.movie.Plot
    });
    watchlist.save();
    res.json(watchlist);
});

app.delete('/watchlist/delete/:id', async(req, res) => {
    const result = await Watchlist.findByIdAndDelete(req.params.id);
    res.json(result);
});

app.listen(3001, () => console.log("Server started on 3001"));