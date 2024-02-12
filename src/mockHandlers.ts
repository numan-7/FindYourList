/* v8 ignore next 287 */
import { setupServer } from 'msw/node';
import { HttpResponse, http } from 'msw';
import { rest } from "msw";

const watchlistMockData = [
  {
    "_id": "65c9424bbc63fe39631c663d",
    "Title": "The Avengers",
    "Rated": "PG-13",
    "Runtime": "143 min",
    "Genre": "Action, Sci-Fi",
    "Plot": "Earth's mightiest heroes must come together and learn to fight as a team if they are going to stop the mischievous Loki and his alien army from enslaving humanity.",
    "Poster": "https://m.media-amazon.com/images/M/MV5BNDYxNjQyMjAtNTdiOS00NGYwLWFmNTAtNThmYjU5ZGI2YTI1XkEyXkFqcGdeQXVyMTMxODk2OTU@._V1_SX300.jpg",
    "imdbRating": "8.0",
    "imdbID": "tt0848228"
  }
];
  
const updatedWatchlistMockData = [
  {
    "_id": "65c9424bbc63fe39631c663d",
    "Title": "The Avengers",
    "Rated": "PG-13",
    "Runtime": "143 min",
    "Genre": "Action, Sci-Fi",
    "Plot": "Earth's mightiest heroes must come together and learn to fight as a team if they are going to stop the mischievous Loki and his alien army from enslaving humanity.",
    "Poster": "https://m.media-amazon.com/images/M/MV5BNDYxNjQyMjAtNTdiOS00NGYwLWFmNTAtNThmYjU5ZGI2YTI1XkEyXkFqcGdeQXVyMTMxODk2OTU@._V1_SX300.jpg",
    "imdbRating": "8.0",
    "imdbID": "tt0848228"
  },
  {
    "_id": "12z9424bbc63fe39631c663d",
    "Title": "Avengers: Endgame",
    "Rated": "PG-13",
    "Runtime": "181 min",
    "Genre": "Action, Adeventure, Drama",
    "Plot": "After the devastating events of Avengers: Infinity War (2018), the universe is in ruins. With the help of remaining allies, the Avengers assemble once more in order to reverse Thanos' actions and restore balance to the universe.",
    "Poster": "https://m.media-amazon.com/images/M/MV5BMTc5MDE2ODcwNV5BMl5BanBnXkFtZTgwMzI2NzQ2NzM@._V1_SX300.jpg",
    "imdbRating": "8.4",
    "imdbID": "tt4154796"
  }
]

const omdbapiMockData = {
  "Search": [
    {
      "Title": "The Avengers",
      "Year": "2012",
      "imdbID": "tt0848228",
      "Type": "movie",
      "Poster": "https://m.media-amazon.com/images/M/MV5BNDYxNjQyMjAtNTdiOS00NGYwLWFmNTAtNThmYjU5ZGI2YTI1XkEyXkFqcGdeQXVyMTMxODk2OTU@._V1_SX300.jpg"
    },
    {
      "Title": "Avengers: Endgame",
      "Year": "2019",
      "imdbID": "tt4154796",
      "Type": "movie",
      "Poster": "https://m.media-amazon.com/images/M/MV5BMTc5MDE2ODcwNV5BMl5BanBnXkFtZTgwMzI2NzQ2NzM@._V1_SX300.jpg"
      },
  ],
  "totalResults": "2",
  "Response": "True"
};

const omdbapiBadMockData = {
  "Search": [
  ],
  "totalResults": "0",
  "Response": "False"
};

const omdbapiMockData2 = {
  "Search": [
    {
      "Title": "One Piece Film: Red",
      "Year": "2022",
      "imdbID": "tt16183464",
      "Type": "movie",
      "Poster": "https://m.media-amazon.com/images/M/MV5BODY4OWM5M2UtM2Y1Yi00YjAyLTlhMDktMDkzZjFmMjI5MmI5XkEyXkFqcGdeQXVyMTA1NjQyNjkw._V1_SX300.jpg"
    },
    {
      "Title": "One Piece Film Z",
      "Year": "2012",
      "imdbID": "tt2375379",
      "Type": "movie",
      "Poster": "https://m.media-amazon.com/images/M/MV5BZTZlOTc0MmMtMDBmNy00MzU4LWE2Y2MtMWEwN2Y2YThhYzJiXkEyXkFqcGdeQXVyNTAyODkwOQ@@._V1_SX300.jpg"
    }
  ],
  "totalResults": "2",
  "Response": "True"
}

const avengersMockData = {
  "Title": "The Avengers",
  "Year": "2012",
  "Rated": "PG-13",
  "Released": "04 May 2012",
  "Runtime": "143 min",
  "Genre": "Action, Sci-Fi",
  "Director": "Joss Whedon",
  "Writer": "Joss Whedon, Zak Penn",
  "Actors": "Robert Downey Jr., Chris Evans, Scarlett Johansson",
  "Plot": "Earth's mightiest heroes must come together and learn to fight as a team if they are going to stop the mischievous Loki and his alien army from enslaving humanity.",
  "Language": "English, Russian",
  "Country": "United States",
  "Awards": "Nominated for 1 Oscar. 38 wins & 81 nominations total",
  "Poster": "https://m.media-amazon.com/images/M/MV5BNDYxNjQyMjAtNTdiOS00NGYwLWFmNTAtNThmYjU5ZGI2YTI1XkEyXkFqcGdeQXVyMTMxODk2OTU@._V1_SX300.jpg",
  "Ratings": [
  {
  "Source": "Internet Movie Database",
  "Value": "8.0/10"
  },
  {
  "Source": "Rotten Tomatoes",
  "Value": "91%"
  },
  {
  "Source": "Metacritic",
  "Value": "69/100"
  }
  ],
  "Metascore": "69",
  "imdbRating": "8.0",
  "imdbVotes": "1,449,383",
  "imdbID": "tt0848228",
  "Type": "movie",
  "DVD": "22 Jun 2014",
  "BoxOffice": "$623,357,910",
  "Production": "N/A",
  "Website": "N/A",
  "Response": "True"
};

const endGameMockData = {
  "Title": "Avengers: Endgame",
  "Year": "2019",
  "Rated": "PG-13",
  "Released": "26 Apr 2019",
  "Runtime": "181 min",
  "Genre": "Action, Adventure, Drama",
  "Director": "Anthony Russo, Joe Russo",
  "Writer": "Christopher Markus, Stephen McFeely, Stan Lee",
  "Actors": "Robert Downey Jr., Chris Evans, Mark Ruffalo",
  "Plot": "After the devastating events of Avengers: Infinity War (2018), the universe is in ruins. With the help of remaining allies, the Avengers assemble once more in order to reverse Thanos' actions and restore balance to the universe.",
  "Language": "English, Japanese, Xhosa, German",
  "Country": "United States",
  "Awards": "Nominated for 1 Oscar. 70 wins & 133 nominations total",
  "Poster": "https://m.media-amazon.com/images/M/MV5BMTc5MDE2ODcwNV5BMl5BanBnXkFtZTgwMzI2NzQ2NzM@._V1_SX300.jpg",
  "Ratings": [
  {
  "Source": "Internet Movie Database",
  "Value": "8.4/10"
  },
  {
  "Source": "Rotten Tomatoes",
  "Value": "94%"
  },
  {
  "Source": "Metacritic",
  "Value": "78/100"
  }
  ],
  "Metascore": "78",
  "imdbRating": "8.4",
  "imdbVotes": "1,246,637",
  "imdbID": "tt4154796",
  "Type": "movie",
  "DVD": "30 Jul 2019",
  "BoxOffice": "$858,373,000",
  "Production": "N/A",
  "Website": "N/A",
  "Response": "True"
}

const opRed = {
  "Title": "One Piece Film: Red",
  "Year": "2022",
  "Rated": "PG-13",
  "Released": "04 Nov 2022",
  "Runtime": "115 min",
  "Genre": "Animation, Action, Adventure",
  "Director": "Gorô Taniguchi",
  "Writer": "Brooklyn El-Omar, Tsutomu Kuroiwa, Eiichirô Oda",
  "Actors": "Mayumi Tanaka, Kazuya Nakai, Akemi Okamura",
  "Plot": "For the first time ever, Uta - the most beloved singer in the world - will reveal herself to the world at a live concert. The voice that the whole world has been waiting for is about to resound.",
  "Language": "Japanese, English",
  "Country": "Japan",
  "Awards": "2 wins & 5 nominations",
  "Poster": "https://m.media-amazon.com/images/M/MV5BODY4OWM5M2UtM2Y1Yi00YjAyLTlhMDktMDkzZjFmMjI5MmI5XkEyXkFqcGdeQXVyMTA1NjQyNjkw._V1_SX300.jpg",
  "Ratings": [
  {
  "Source": "Internet Movie Database",
  "Value": "6.7/10"
  },
  {
  "Source": "Rotten Tomatoes",
  "Value": "95%"
  },
  {
  "Source": "Metacritic",
  "Value": "69/100"
  }
  ],
  "Metascore": "69",
  "imdbRating": "6.7",
  "imdbVotes": "18,605",
  "imdbID": "tt16183464",
  "Type": "movie",
  "DVD": "N/A",
  "BoxOffice": "$12,775,324",
  "Production": "N/A",
  "Website": "N/A",
  "Response": "True"
}

const opZ = {
  "Title": "One Piece Film Z",
  "Year": "2012",
  "Rated": "TV-14",
  "Released": "15 Dec 2012",
  "Runtime": "108 min",
  "Genre": "Animation, Action, Adventure",
  "Director": "Tatsuya Nagamine",
  "Writer": "Eiichirô Oda, Osamu Suzuki",
  "Actors": "Mayumi Tanaka, Kazuya Nakai, Akemi Okamura",
  "Plot": "A former Marine stands in the way of the Straw Hat Pirates.",
  "Language": "Japanese",
  "Country": "Japan",
  "Awards": "4 nominations",
  "Poster": "https://m.media-amazon.com/images/M/MV5BZTZlOTc0MmMtMDBmNy00MzU4LWE2Y2MtMWEwN2Y2YThhYzJiXkEyXkFqcGdeQXVyNTAyODkwOQ@@._V1_SX300.jpg",
  "Ratings": [
  {
  "Source": "Internet Movie Database",
  "Value": "7.7/10"
  }
  ],
  "Metascore": "N/A",
  "imdbRating": "7.7",
  "imdbVotes": "9,416",
  "imdbID": "tt2375379",
  "Type": "movie",
  "DVD": "25 Nov 2020",
  "BoxOffice": "N/A",
  "Production": "N/A",
  "Website": "N/A",
  "Response": "True"
}

export const server = setupServer(
  
  http.get('http://localhost:3001/watchlist', () => {
    return HttpResponse.json(watchlistMockData);
  }),

  http.post('http://localhost:3001/watchlist/new', () => {
    return HttpResponse.json(updatedWatchlistMockData);
  }),

  http.get('http://www.omdbapi.com/*', ({request}) => {
    const url = new URL(request.url);
    const imdbID = url.searchParams.get('i');
    const page = url.searchParams.get('page');
    if (imdbID === 'tt4154796') {
      return HttpResponse.json(endGameMockData);
    } else if (imdbID === 'tt0848228') {
      return HttpResponse.json(avengersMockData);
    } else if (imdbID === 'tt16183464') {
      return HttpResponse.json(opRed);
    } else if (imdbID === 'tt2375379') {
      return HttpResponse.json(opZ);
    } else if (url.searchParams.has('s') && page && parseInt(page) > 1) {
      return HttpResponse.json(omdbapiMockData2);
    } else if (url.searchParams.get('s') === 'NOTVALIDMOVIELOOOOOOOOOOOOOOL') {
      return HttpResponse.json(omdbapiBadMockData);
    }
    else if (url.searchParams.has('s')) {
      return HttpResponse.json(omdbapiMockData);
    }
    return HttpResponse.status(404);
  }),

  http.delete('http://localhost:3001/watchlist/delete/*', ({ params }) => {
    const id  = params[0];
    return HttpResponse.json({ _id: id });
  })

);