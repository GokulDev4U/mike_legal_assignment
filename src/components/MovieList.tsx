import React, { useCallback, useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../store/store";
import { setSearchTerm, incrementPage } from "../features/movieSlice";
import { useMovies } from "../query/useMovies";
import debounce from "lodash/debounce";
import MovieItem from "./MovieItem";

const MovieList: React.FC = () => {
  const dispatch = useDispatch();
  const { searchTerm, page } = useSelector((state: RootState) => state.movies);

  // Local state to store all fetched movies
  const [allMovies, setAllMovies] = useState<any[]>([]);

  const { data: movies, error, isLoading } = useMovies(searchTerm, page);

  const handleSearch = debounce((e: React.ChangeEvent<HTMLInputElement>) => {
    dispatch(setSearchTerm(e.target.value));
    dispatch(incrementPage()); // Reset to the first page on new search
    setAllMovies([]); // Clear previous movies
  }, 300);

  const handleScroll = useCallback(() => {
    if (window.innerHeight + document.documentElement.scrollTop >= document.documentElement.offsetHeight - 1) {
      dispatch(incrementPage());
    }
  },[dispatch]);

  useEffect(() => {
    // Append newly fetched movies to the existing list
    if (movies) {
      setAllMovies((prevMovies) => [...prevMovies, ...movies]);
    }
  }, [movies]);

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [handleScroll]);

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

          {/* <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3"> */}
          <div className="flex flex-wrap gap-4">
            {allMovies.map((movie: any) => (
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
