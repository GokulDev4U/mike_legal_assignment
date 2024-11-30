import React, { useState } from "react";

interface MovieProps {
  movie: {
    Title: string;
    Year: string;
    Type: string;
    Director: string;
    Plot: string;
    Poster: string;
    Actors: string;
    Awards: string;
    BoxOffice: string;
    Country: string;
    Genre: string;
  };
}

const MovieItem: React.FC<MovieProps> = ({ movie }) => {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <div className="bg-white border border-gray-300 rounded-lg shadow-md mb-4">
      {/* Accordion Header */}
      <div
        className="flex justify-between items-center p-4 cursor-pointer hover:bg-gray-100"
        onClick={() => setIsExpanded(!isExpanded)}
      >
        <div>
          <h3 className="text-lg font-semibold text-gray-800">{movie.Title}</h3>
          <p className="text-sm text-gray-500">
            <strong>Year:</strong> {movie.Year} <span>|</span> <strong>Type:</strong> {movie.Type}
          </p>
        </div>
        <button
          className={`transform transition-transform ${
            isExpanded ? "rotate-180" : ""
          } text-gray-600`}
        >
          ▼
        </button>
      </div>

      {/* Accordion Content */}
      {isExpanded && (
        <div className="p-4 border-t border-gray-300 bg-gray-50">
          <div className="flex flex-col md:flex-row">
            {/* Poster */}
            {movie.Poster && (
              <div className="flex-shrink-0 w-full md:w-1/3 mb-4 md:mb-0">
                <img
                  src={movie.Poster}
                  alt={`${movie.Title} poster`}
                  className="rounded-lg shadow-md w-full h-auto"
                />
              </div>
            )}

            {/* Details */}
            <div className="md:ml-4">
              <p className="text-sm text-gray-600 mb-1">
                <strong>Genre:</strong> {movie.Genre}
              </p>
              <p className="text-sm text-gray-600 mb-1">
                <strong>Director:</strong> {movie.Director}
              </p>
              <p className="text-sm text-gray-600 mb-1">
                <strong>Actors:</strong> {movie.Actors}
              </p>
              <p className="text-sm text-gray-600 mb-2">
                <strong>Awards:</strong> {movie.Awards}
              </p>
              <p className="text-sm text-gray-600 mb-1">
                <strong>BoxOffice:</strong> {movie.BoxOffice}
              </p>
              <p className="text-sm text-gray-600 mb-2">
                <strong>Country:</strong> {movie.Country}
              </p>
              <p className="text-sm text-gray-600">
                <strong>Plot:</strong> {movie.Plot}
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default MovieItem;
