import { NextRequest, NextResponse } from "next/server";
import { Movie } from "@/types/movie";

export async function GET(request: NextRequest) {
    try {
        const API_KEY = process.env.TMDB_API_KEY;

        if (!API_KEY) {
            return NextResponse.json(
                {error: 'API Key not found'},
                {status: 500}
            )
        }

        const response = await fetch (
            `https://api.themoviedb.org/3/movie/popular?api_key=${API_KEY}&language=en-US&page=1`
        )

        if (!response.ok) {
            return NextResponse.json(
                {error: 'Failed to fetch popular movies'},
                {status: 500}
            )
        }

        const data = await response.json();

        const movies: Movie[] = data.results.map((movie: any) => ({
            id: movie.id,
            title: movie.title,
            poster_path: movie.poster_path,
            release_date: movie.release_date,
            vote_average: movie.vote_average,
            overview: movie.overview,
        }))

        return NextResponse.json({movies}, {status: 200})
    } catch (error) {
        console.error('Error loading movies:', error)
        return NextResponse.json(
            {error: 'Failed to fetch popular movies'},
            {status: 500}
        )
    }
}