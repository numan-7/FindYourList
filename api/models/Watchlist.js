const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const WatchlistSchema = new Schema({
    userId: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    Poster: {
        type: String,
        required: true
    },
    Title: {
        type: String,
        required: true
    },
    Rated: {
        type: String,
        required: true
    },
    imdbRating: {
        type: String,
        required: true
    },
    Runtime: {
        type: String,
        required: true
    },
    Genre: {
        type: String,
        required: true
    },
    imdbID: {
        type: String,
        required: true
    },
    Plot: {
        type: String,
        required: true
    }
});

const Watchlist = mongoose.model("Watchlist", WatchlistSchema);
module.exports = Watchlist;