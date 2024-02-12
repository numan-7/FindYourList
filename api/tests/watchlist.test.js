/* eslint-disable no-undef */
/* eslint-disable @typescript-eslint/no-var-requires */
const request = require('supertest');
const { app, server } = require('../server.js');
const Watchlist = require('../models/Watchlist');
const mongoose = require('mongoose');
import { vi } from 'vitest'

describe('GET /watchlist', () => {
    it('should get all movies in the watchlist', async () => {
        const response = await request(app).get('/watchlist');
        expect(response.status).toBe(200);
        expect(Array.isArray(response.body)).toBe(true);
    });
});

describe('GET /watchlist with no data', () => {
  it('should return an empty array when no movies are in the watchlist', async () => {
      await Watchlist.deleteMany({});
      const response = await request(app).get('/watchlist');
      expect(response.status).toBe(200);
      expect(response.body).toEqual([]);
  });
});

describe('GET /watchlist error scenario', () => {
    beforeAll(() => {
        // Mock the find method to simulate a failure
        vi.spyOn(Watchlist, 'find').mockImplementation(() => {
            throw new Error('Simulated database error');
        });
    });

    afterAll(() => {
        Watchlist.find.mockRestore();
    });

    it('should handle errors when fetching watchlist fails', async () => {
        const response = await request(app).get('/watchlist');
        expect(response.status).toBe(500);
        expect(response.body.message).toBe('Simulated database error');
    });
});

describe('POST /watchlist/new', () => {
    it('should add a new movie to the watchlist', async () => {
        const movie = {
            "Title": "The Avengers",
            "Rated": "PG-13",
            "Runtime": "143 min",
            "Genre": "Action, Sci-Fi",
            "Plot": "Earth's mightiest heroes must come together and learn to fight as a team if they are going to stop the mischievous Loki and his alien army from enslaving humanity.",
            "Poster": "https://m.media-amazon.com/images/M/MV5BNDYxNjQyMjAtNTdiOS00NGYwLWFmNTAtNThmYjU5ZGI2YTI1XkEyXkFqcGdeQXVyMTMxODk2OTU@._V1_SX300.jpg",
            "imdbRating": "8.0",
            "imdbID": "tt0848228"
        };
        const response = await request(app)
            .post('/watchlist/new')
            .send(movie);
        expect(response.status).toBe(201);
        expect(response.body.Title).toBe(movie.Title);
    });
});

describe('POST /watchlist/new', () => {
  it('this should throw error when sending movie', async () => {
      const movie = {
        "NOTGOOD": "THIS SHOULD FAIL"
      };
      const response = await request(app)
          .post('/watchlist/new')
          .send(movie);
      expect(response.status).toBe(400);
  });
});

describe('DELETE /watchlist/delete/:id', () => {
    it('should delete a movie from the watchlist', async () => {
        const movie = new Watchlist({
            "Title": "The Avengers",
            "Rated": "PG-13",
            "Runtime": "143 min",
            "Genre": "Action, Sci-Fi",
            "Plot": "Earth's mightiest heroes must come together and learn to fight as a team if they are going to stop the mischievous Loki and his alien army from enslaving humanity.",
            "Poster": "https://m.media-amazon.com/images/M/MV5BNDYxNjQyMjAtNTdiOS00NGYwLWFmNTAtNThmYjU5ZGI2YTI1XkEyXkFqcGdeQXVyMTMxODk2OTU@._V1_SX300.jpg",
            "imdbRating": "8.0",
            "imdbID": "tt0848228"
        });
        await movie.save();
        const response = await request(app).delete(`/watchlist/delete/${movie._id}`);
        expect(response.status).toBe(200);
    });
});

describe('DELETE /watchlist/delete/:id for non-existent movie', () => {
    it('should return a 404 error for a non-existent movie', async () => {
            const fakeId = '5f8d0d55b54764421b7156d9';
            const response = await request(app).delete(`/watchlist/delete/${fakeId}`);
            expect(response.status).toBe(404);
            expect(response.body.message).toBe("Movie not found");
    });
});

describe('DELETE /watchlist/delete/:id error scenario', () => {
    beforeAll(() => {
        // Mock findByIdAndDelete to simulate a failure
        vi.spyOn(Watchlist, 'findByIdAndDelete').mockImplementation(() => {
            throw new Error('Simulated database error');
        });
    });

    afterAll(() => {
        Watchlist.findByIdAndDelete.mockRestore();
    });

    it('should handle errors when deleting a movie fails', async () => {
        const response = await request(app).delete('/watchlist/delete/fakeId');
        expect(response.status).toBe(500);
        expect(response.body.message).toBe('Simulated database error');
    });
});

afterAll(() => {
        mongoose.connection.close()
        server.close();
})