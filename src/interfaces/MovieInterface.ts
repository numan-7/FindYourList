/* v8 ignore next 40 */
export interface MovieInterface {
    _id?: string;
    Poster: string;
    Title: string;
    Rated: string;
    imdbRating: string;
    Runtime: string;
    Genre: string;
    imdbID: string;
    Plot: string;
    __v?: number;
}

export interface MovieReturnInterface {
    Actors: string;
    Awards: string;
    BoxOffice: string;
    Country: string;
    DVD: string;
    Director: string;
    Genre: string;
    Language: string;
    Metascore: string;
    Plot: string;
    Poster: string;
    Production: string;
    Rated: string;
    Ratings: { Source: string; Value: string }[];
    Released: string;
    Response: string;
    Runtime: string;
    Title: string;
    Type: string;
    Website: string;
    Writer: string;
    Year: string;
    imdbID: string;
    imdbRating: string;
    imdbVotes: string;
  }