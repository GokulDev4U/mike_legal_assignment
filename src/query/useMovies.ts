import { useQuery } from 'react-query';
import axios from 'axios';

// Fetch the list of movies based on search term and page
const fetchMovies = async (searchTerm: string, page: number) => {
  const query = searchTerm.trim() || "action";
  const apiKey = process.env.REACT_APP_OMDB_API_KEY;

  // Fetch the list of movies
  const response = await axios.get(`https://www.omdbapi.com/`, {
    params: {
      s: query,
      page,
      apiKey,
    },
  });

  if (response.data.Error) {
    throw new Error(response.data.Error);
  }

  const movies = response.data.Search || [];
  return movies;
};

// Fetch detailed information for each movie
const fetchMovieDetails = async (imdbID: string) => {
  const apiKey = process.env.REACT_APP_OMDB_API_KEY;
  const response = await axios.get(`https://www.omdbapi.com/`, {
    params: {
      i: imdbID,
      apiKey,
    },
  });

  if (response.data.Error) {
    throw new Error(response.data.Error);
  }

  return response.data;
};

export const useMovies = (searchTerm: string, page: number) => {
  return useQuery(
    ["movies", searchTerm || "action", page],
    () => fetchMovies(searchTerm, page),
    {
      keepPreviousData: true,
    }
  );
};

export const useMovieDetails = (imdbID: string) => {
  return useQuery(
    ["movieDetails", imdbID],
    () => fetchMovieDetails(imdbID),
    {
      enabled: !!imdbID,  // Query only runs if imdbID is provided
    }
  );
};

