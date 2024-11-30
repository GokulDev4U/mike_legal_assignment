import { useQuery } from 'react-query';
import axios from 'axios';

const fetchMovies = async (searchTerm: string, page: number) => {
  if (!searchTerm.trim()) {
    return [];
  }
  const query = searchTerm.trim() ? searchTerm : 'random';
  const apiKey = process.env.REACT_APP_OMDB_API_KEY;
  console.log('apiKey', apiKey);
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
  return response.data.Search || [];
};

export const useMovies = (searchTerm: string, page: number) => {
  return useQuery(['movies', searchTerm, page], () => fetchMovies(searchTerm, page), {
    keepPreviousData: true,
  });
};
