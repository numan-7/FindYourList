const express = require('express');
const Watchlist = require('../models/Watchlist');
const authenticateJWT = require('../middleware/authenticateJWT');
const router = express.Router();
const mongoose = require('mongoose');

router.get('/', async (req, res) => {
    try {
        console.log(req.user)
        const watchlist = await Watchlist.find({ userId: req.user._id });
        res.status(200).json(watchlist)
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

router.post('/new', async (req, res) => {
    try {
        const { movie } = req.body;
        const watchlist = new Watchlist({
            userId: req.user._id,
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
        res.status(400).json({ message: error });
    }
});

router.delete('/delete/:id', async (req, res) => {
    try {
        const result = await Watchlist.findOneAndDelete({ _id: req.params.id, userId: req.user._id });
        if (!result) {
            return res.status(404).json({ message: "Movie not found" });
        }
        res.status(200).json(result);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

module.exports = router;
