import { NextRequest, NextResponse } from "next/server";
import { Movie } from "@/types/movie";

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const q = searchParams.get("q");

    if (!q || !q.trim()) {
      return NextResponse.json(
        { error: "Query parameter is required" },
        { status: 400 }
      );
    }

    const API_KEY = process.env.TMDB_API_KEY;

    if (!API_KEY) {
      return NextResponse.json({ error: "API Key not found" }, { status: 500 });
    }

    const response = await fetch(
      `https://api.themoviedb.org/3/search/movie?api_key=${API_KEY}&language=en-US&query=${encodeURIComponent(
        q
      )}&page=1&include_adult=false`
    );

    if (!response.ok) {
      return NextResponse.json(
        { error: "Failed to search movies" },
        { status: response.status }
      );
    }

    const data = await response.json();

    const movies: Movie[] = data.results.map((movie: any) => ({
      id: movie.id,
      title: movie.title,
      poster_path: movie.poster_path,
      release_date: movie.release_date,
      vote_average: movie.vote_average,
      overview: movie.overview,
    }));

    return NextResponse.json({ movies });
  } catch (error) {
    console.error("Error searching Movies:", error);
    return NextResponse.json(
      { error: "Failed to search movies" },
      { status: 500 }
    );
  }
}
