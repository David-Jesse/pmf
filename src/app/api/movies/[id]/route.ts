import { NextRequest, NextResponse } from "next/server";
import { MovieDetails } from "@/types/movie";

export async function GET(
    request: NextRequest,
    {params}: {params: Promise<{id: string}>}
) {
    try {
        const {id} = await params

        if (!id) {
            return NextResponse.json(
                {error: 'Movie ID is required'},
                {status: 400}
            )
        }

        const API_KEY = process.env.TMDB_API_KEY;

        if(!API_KEY) {
            return NextResponse.json(
                {error: 'API Key not found'},
                {status: 500}
            )
        }

        const response = await fetch(
            `https://api.themoviedb.org/3/movie/${id}?api_key=${API_KEY}&language=en=US`
        )

        if (!response.ok) {
            return NextResponse.json(
                {error: 'Failed to fetch movie details'},
                {status: response.status}
            )
        }

        const movie = await response.json();

        const movieDetails: MovieDetails = {
            id: movie.id,
            title: movie.title,
            poster_path: movie.poster_path,
            release_date: movie.release_date,
            vote_average: movie.vote_average,
            overview: movie.overview,
            runtime: movie.runtime,
            genres: movie.genres
        }

        return NextResponse.json(movieDetails)
    } catch (error) {
        console.error('Error fetching movie details:', error)
        return NextResponse.json(
            {error: 'Failed to fetch movie details'},
            {status: 500}
        )
    }
}