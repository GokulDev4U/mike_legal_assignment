import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../store/store";
import { setSearchTerm, incrementPage } from "../features/movieSlice";
import { useMovies } from "../query/useMovies";
import debounce from "lodash/debounce";
import MovieItem from "./MovieItem";

const MovieList: React.FC = () => {
  const dispatch = useDispatch();
  const { searchTerm, page } = useSelector((state: RootState) => state.movies);

  const { data: movies, error, isLoading } = useMovies(searchTerm, page);

  const handleSearch = debounce((e: React.ChangeEvent<HTMLInputElement>) => {
    dispatch(setSearchTerm(e.target.value));
  }, 300);

  const handleScroll = () => {
    if (window.innerHeight + document.documentElement.scrollTop === document.documentElement.offsetHeight) {
      dispatch(incrementPage());
    }
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center p-4">
      <div className="w-full max-w-4xl">
        <>
          <input
            type="text"
            placeholder="Search movies..."
            onChange={handleSearch}
            className="w-full p-2 mb-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />

          {isLoading && <p className="text-center text-blue-500">Loading...</p>}
          
          {error &&
            (error instanceof Error ? (
              <p className="text-center text-red-500">Error: {error.message}</p>
            ) : (
              <p className="text-center text-red-500">An unexpected error occurred</p>
            ))}

          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {movies?.map((movie: any) => (
              <MovieItem
                key={movie.imdbID}
                movie={movie}
              />
            ))}
        </div>
        </>
      </div>
    </div>
  );
};

export default MovieList;
