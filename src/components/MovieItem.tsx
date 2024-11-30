import React, { useState } from "react";
import { useMovieDetails } from "../query/useMovies";

interface MovieProps {
  movie: {
    imdbID: string;
    Title: string;
    Year: string;
    Type: string;
    Poster: string;
  };
}

const MovieItem: React.FC<MovieProps> = ({ movie }) => {
  const [isExpanded, setIsExpanded] = useState(false);

  // Fetch detailed data when the card is expanded
  const { data: detailedMovie, isLoading, isError } = useMovieDetails(isExpanded ? movie.imdbID : "");

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
          {isLoading && <p className="text-sm text-gray-500">Loading details...</p>}
          {isError && <p className="text-sm text-red-500">Failed to load movie details.</p>}
          {!isLoading && !isError && detailedMovie && (
            <div className="flex flex-col md:flex-row">
              {/* Poster */}
              {movie.Poster && movie.Poster !== "N/A" && (
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
                  <strong>Genre:</strong> {detailedMovie.Genre || "N/A"}
                </p>
                <p className="text-sm text-gray-600 mb-1">
                  <strong>Director:</strong> {detailedMovie.Director || "N/A"}
                </p>
                <p className="text-sm text-gray-600 mb-1">
                  <strong>Actors:</strong> {detailedMovie.Actors || "N/A"}
                </p>
                <p className="text-sm text-gray-600 mb-2">
                  <strong>Awards:</strong> {detailedMovie.Awards || "N/A"}
                </p>
                <p className="text-sm text-gray-600 mb-1">
                  <strong>Box Office:</strong> {detailedMovie.BoxOffice || "N/A"}
                </p>
                <p className="text-sm text-gray-600 mb-2">
                  <strong>Country:</strong> {detailedMovie.Country || "N/A"}
                </p>
                <p className="text-sm text-gray-600">
                  <strong>Plot:</strong> {detailedMovie.Plot || "No plot available."}
                </p>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default MovieItem;
