const request = require('supertest');
const { app, server } = require('../server.js');
const Watchlist = require('../models/Watchlist');
const User = require('../models/User');
const jwt = require('jsonwebtoken');
const mongoose = require('mongoose');

const movie = {
    "Title": "The Avengers",
    "Rated": "PG-13",
    "Runtime": "143 min",
    "Genre": "Action, Sci-Fi",
    "Plot": "Earth's mightiest heroes must come together and learn to fight as a team if they are going to stop the mischievous Loki and his alien army from enslaving humanity.",
    "Poster": "https://example.com/shortened-poster-url.jpg",
    "imdbRating": "8.0",
    "imdbID": "tt0848228"
};

const createUserAndToken = async () => {
    const user = new User({
        googleId: `testGoogleId_${Date.now()}`,
        email: `test_${Date.now()}@example.com`,
        name: 'Test User'
    });
    await user.save();

    const token = jwt.sign({ userId: user._id.toString() }, process.env.JWT_SECRET || 'defaultSecret', { expiresIn: '24h' });
    return { user, token };
};

beforeEach(async () => {
    await User.deleteMany({});
    await Watchlist.deleteMany({});
});

afterEach(async () => {
    await User.deleteMany({});
    await Watchlist.deleteMany({});
});

// Test for Invalid User ID (Malformed or Non-Existent)
describe('Bad User ID tests', () => {

    it('should return a 403 error for an invalid JWT token (malformed)', async () => {
        const response = await request(app)
            .get('/watchlist')
            .set('Authorization', 'Bearer invalidtoken');
        expect(response.status).toBe(403);
    });

    it('should return a 401 error for a token with a non-existent userId', async () => {
        const fakeUserId = new mongoose.Types.ObjectId();
        const token = jwt.sign({ userId: fakeUserId.toString() }, process.env.JWT_SECRET || 'defaultSecret', { expiresIn: '24h' });
        
        const response = await request(app)
            .get('/watchlist')
            .set('Authorization', `Bearer ${token}`);
        expect(response.status).toBe(401);
    });

});

// Tests for GET, POST, DELETE
describe('GET /watchlist', () => {
    it('should get an empty watchlist for a new user', async () => {
        const { token } = await createUserAndToken();
        const response = await request(app)
            .get('/watchlist')
            .set('Authorization', `Bearer ${token}`);
        expect(response.status).toBe(200);
        expect(response.body).toEqual([]);
    });

    it('should return a 401 error for missing token', async () => {
        const response = await request(app)
            .get('/watchlist');
        expect(response.status).toBe(401);
    });
});

describe('POST /watchlist/new', () => {
    it('should add a new movie to the watchlist with a userId', async () => {
        const { token } = await createUserAndToken();
        const response = await request(app)
            .post('/watchlist/new')
            .set('Authorization', `Bearer ${token}`)
            .send({ movie });
        expect(response.status).toBe(201);
        expect(response.body.Title).toBe(movie.Title);
    });

    it('should return a 400 error for missing movie data', async () => {
        const { token } = await createUserAndToken();
        const response = await request(app)
            .post('/watchlist/new')
            .set('Authorization', `Bearer ${token}`)
            .send({ movie: {} });
        expect(response.status).toBe(400);
    });

    it('should return a 401 error for missing token', async () => {
        const response = await request(app)
            .post('/watchlist/new')
            .send({ movie });
        expect(response.status).toBe(401);
    });
});

describe('DELETE /watchlist/delete/:id', () => {
    it('should delete a movie from the watchlist for the authenticated user', async () => {
        const { user, token } = await createUserAndToken();
        const watchlistMovie = new Watchlist({ ...movie, userId: user._id });
        await watchlistMovie.save();
        const response = await request(app)
            .delete(`/watchlist/delete/${watchlistMovie._id}`)
            .set('Authorization', `Bearer ${token}`);
        expect(response.status).toBe(200);
    });

    it('should return a 404 for a non-existent movie', async () => {
        const { token } = await createUserAndToken();
        const fakeId = new mongoose.Types.ObjectId();
        const response = await request(app)
            .delete(`/watchlist/delete/${fakeId}`)
            .set('Authorization', `Bearer ${token}`);
        expect(response.status).toBe(404);
        expect(response.body.message).toBe('Movie not found');
    });

    it('should return a 401 error for missing token', async () => {
        const fakeId = new mongoose.Types.ObjectId();
        const response = await request(app)
            .delete(`/watchlist/delete/${fakeId}`);
        expect(response.status).toBe(401);
    });
});

afterAll(() => {
    mongoose.connection.close();
    server.close();
});
