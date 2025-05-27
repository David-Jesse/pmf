export interface Movie {
    id: number;
    title: string;
    poster_path: string;
    release_date: string;
    vote_average: number;
    overview: string;
    runtime?: number;
    genres?: Array<{id: number; name: string}>;
}

export interface MovieDetails extends Movie {
    runtime: number;
    genres: Array<{id: number; name: string}>;
}