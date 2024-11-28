import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface MovieState {
  searchTerm: string;
  page: number;
}

const initialState: MovieState = {
  searchTerm: '',
  page: 1,
};

const movieSlice = createSlice({
  name: 'movies',
  initialState,
  reducers: {
    setSearchTerm(state, action: PayloadAction<string>) {
      state.searchTerm = action.payload;
      state.page = 1; // Reset to the first page on new search
    },
    incrementPage(state) {
      state.page += 1;
    },
  },
});

export const { setSearchTerm, incrementPage } = movieSlice.actions;
export default movieSlice.reducer;
