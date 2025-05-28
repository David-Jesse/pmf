import { useEffect, useState } from "react";
import { Movie, MovieDetails } from "../types/movie";

interface MovieModalProps {
  movie: Movie;
  onClose: () => void;
  isOpen: boolean;
}

export default function MovieModal({
  movie,
  onClose,
  isOpen,
}: MovieModalProps) {
  const [movieDetails, setMovieDetails] = useState<MovieDetails | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (isOpen && movie) {
      fetchMovieDetails();
    }
  }, [isOpen, movie]);

  const fetchMovieDetails = async () => {
    setIsLoading(true);

    try {
      const response = await fetch(`/api/movies/${movie.id}`);
      if (response.ok) {
        const details = await response.json();
        setMovieDetails(details);
      }
    } catch (error) {
      console.error("Error fetching movie details:", error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener("keydown", handleEscape);
      document.body.style.overflow = "hidden";
      return () => {
        document.removeEventListener("keydown", handleEscape);
        document.body.style.overflow = "unset";
      };
    }
  }, [isOpen, onClose]);

  if (!isOpen) {
    return null;
  }

  const year = movie.release_date
    ? new Date(movie.release_date).getFullYear()
    : "Unknown";
  const genres = movieDetails?.genres?.map((g) => g.name).join(", ") || "Drama";
  const runtime = movieDetails?.runtime || 0;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Background overlay with blur effect */}
      <div
        className="absolute inset-0 bg-black/80 backdrop-blur-sm"
        onClick={onClose}
        aria-label="Close modal"
      />

      {/* Modal content - centered and on top */}
      <div className="relative bg-gray-800/95 backdrop-blur-md rounded-2xl p-8 max-w-2xl w-full mx-4 border border-gray-700/50 max-h-[90vh] overflow-y-auto shadow-2xl">
        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-400 hover:text-white text-2xl font-bold w-8 h-8 flex items-center justify-center rounded-full hover:bg-gray-700/50 transition-all duration-200"
          aria-label="Close modal"
        >
          ×
        </button>

        {isLoading ? (
          <div className="text-center py-8">
            <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-white mb-4"></div>
            <div className="text-white">Loading details...</div>
          </div>
        ) : (
          <>
            <h1 className="text-white text-4xl font-bold mb-4 pr-8">
              {movie.title}
            </h1>

            <div className="text-gray-300 text-lg mb-6 flex items-center space-x-2 flex-wrap">
              <span>{year}</span>
              <span>•</span>
              <span>{genres}</span>
              {runtime > 0 && (
                <>
                  <span>•</span>
                  <span>{runtime} min</span>
                </>
              )}
            </div>

            <p className="text-gray-400 text-lg leading-relaxed mb-8">
              {movie.overview}
            </p>

            <button
              onClick={onClose}
              className="w-full bg-blue-600 hover:bg-blue-700 text-white text-xl font-semibold py-4 px-6 rounded-xl transition-colors duration-200 ease-in-out"
            >
              Close
            </button>
          </>
        )}
      </div>
    </div>
  );
}
