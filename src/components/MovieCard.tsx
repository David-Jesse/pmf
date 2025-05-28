import Image from "next/image";
import { Movie } from "../types/movie";

interface MovieCardProps {
  movie: Movie;
  onClick: (movie: Movie) => void;
}

export default function MovieCard({ movie, onClick }: MovieCardProps) {
  const year = movie.release_date
    ? new Date(movie.release_date).getFullYear()
    : "Unknown";
  const rating = movie.vote_average ? movie.vote_average.toFixed(1) : "N/A";

  return (
    <div
      className="group cursor-pointer transition-transform duration-200 hover:scale-105 "
      onClick={() => onClick(movie)}
    >
      <div className="relative aspect-[2/3] overflow-hidden rounded-lg bg-gray-800">
        {movie.poster_path ? (
          <Image
            src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
            alt={movie.title}
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 25vw, 20vw"
            onError={(e) => {
              (e.target as HTMLImageElement).src = "/placeholder.png";
            }}
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center bg-gray-700">
            <div className="text-gray-400 text-center">
              <div className="text-4xl mb-2">🎬</div>
              <div className="text-sm">No Image</div>
            </div>
          </div>
        )}
      </div>

      <div className="mt-3 text-center">
        <h3 className="text-white font-medium text-lg leading-tight mb-1 line-clamp-2">
          {movie.title}
        </h3>
        <div className="text-gray-400 text-sm space-x-2">
          <span>{year}</span>
          <span className="text-yellow-400 font-semibold">{rating}</span>
        </div>
      </div>
    </div>
  );
}
