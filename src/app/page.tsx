"use client";

import { useState, useEffect } from "react";
import Head from "next/head";
import { Movie } from "@/types/movie";
import MovieCard from "@/components/MovieCard";
import SearchBar from "@/components/SearchBar";
import MovieModal from "@/components/MovieModal";

export default function Home() {
  const [movies, setMovies] = useState<Movie[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isInitialLoad, setInitialLoad] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedMovie, setSelectedMovie] = useState<Movie | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    loadPopularMovies();
  }, []);

  const loadPopularMovies = async () => {
    setIsLoading(true);
    setError(null);

    try {
      const response = await fetch("/api/movie");
      if (!response.ok) {
        throw new Error("Failed to fetch popular movies");
      }

      const data = await response.json();
      setMovies(data.movies);
    } catch (error) {
      console.error("Error loading Movies:", error);
      setError("Failed to load movies. Please try again.");
    } finally {
      setIsLoading(false);
      setInitialLoad(false);
    }
  };

  const searchMovies = async (query: string) => {
    setIsLoading(true);
    setError(null);

    try {
      const response = await fetch(
        `/api/movies/search?q=${encodeURIComponent(query)}`
      );
      if (!response.ok) {
        throw new Error("Failed to search movies");
      }

      const data = await response.json();
      setMovies(data.movies);
    } catch (error) {
      console.error("Error searching Movies:", error);
      setError("Failed to search movies. Please try again");
      setMovies([]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleMovieClick = (movie: Movie) => {
    setSelectedMovie(movie);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedMovie(null);
  };

  return (
    <>
      <Head>
        <title>MovieFinder</title>
        <meta name="description" content="Find your favorite movies" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <div className="min-h-screen bg-gray-900">
        <div className="w-[70%] mx-auto px-4 py-8">
          {/* Header */}
          <div className="text-center mb-12">
            <div className="flex items-center justify-center mb-8">
              <div className="text-4xl mr-3">🎬</div>
              <h1 className="text-3xl lg:text-5xl font-bold text-white">MovieFinder</h1>
            </div>

            <SearchBar onSearch={searchMovies} isLoading={isLoading} />
          </div>

          {/* Error state */}
          {error && (
            <div className="text-center py-12">
              <div className="text-red-400 text-xl mb-4">{error}</div>
              <button
                onClick={loadPopularMovies}
                className="bg-red-600 hover:bg-red-700 text-white px-6 py-2 rounded-lg transition-colors duration-200"
              >
                Try Again
              </button>
            </div>
          )}

          {/* Loading State */}
          {isLoading && (
            <div className="text-center py-12">
              <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-white mb-4"></div>
              <div className="text-white text-xl">
                {isInitialLoad ? "Loading movies..." : "Searching movies..."}
              </div>
            </div>
          )}

          {/* Movies Grid */}
          {!isLoading && !error && movies?.length > 0 && (
            <div className="grid grid-cols-1 grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
              {movies.map((movie) => (
                <MovieCard
                  key={movie.id}
                  movie={movie}
                  onClick={handleMovieClick}
                />
              ))}
            </div>
          )}

          {/* Empty State */}
          {!isLoading && !error && !isInitialLoad && movies?.length === 0 && (
            <div className="text-center py-12">
              <div className="text-gray-400 text-xl mb-4">No movies found</div>
              <div className="text-gray-500">Search for something else</div>
            </div>
          )}
        </div>

        {/* Movie Modal */}
        {selectedMovie && (
          <MovieModal
            movie={selectedMovie}
            isOpen={isModalOpen}
            onClose={closeModal}
          />
        )}
      </div>
    </>
  );
}
