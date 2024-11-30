import React, { useState } from 'react';

interface MovieProps {
  movie: {
    Title: string;
    Year: string;
    Type: string;
    Director: string;
    Plot: string;
    Poster: string;
  };
}

const MovieItem: React.FC<MovieProps> = ({ movie }) => {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <div className="movie-item" onClick={() => setIsExpanded(!isExpanded)}>
      <h3>{movie.Title}</h3>
      {isExpanded && (
        <div className="movie-details">
          <p><strong>Year:</strong> {movie.Year}</p>
          <p><strong>Type:</strong> {movie.Type}</p>
          {/* Genre */}
          <p><strong>Director:</strong> {movie.Director}</p>
          <p><strong>Plot:</strong> {movie.Plot}</p>
          {movie.Poster && <img src={movie.Poster} alt={`${movie.Title} poster`} />}
        </div>
      )}
    </div>
  );
};

export default MovieItem;
