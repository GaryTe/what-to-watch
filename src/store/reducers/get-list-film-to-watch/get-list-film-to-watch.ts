import { createSlice } from '@reduxjs/toolkit';
import { fetchListFilmToWatch } from '../../api-actions/api-actions';
import { MoviesToWatch } from '../../../types/store/store';
import { NameSpace } from '../../../const/const';

const initialState: MoviesToWatch = {
  listMovies: null,
};

export const getListFilmToWatch = createSlice({
  name: NameSpace.Favorite,
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(fetchListFilmToWatch.fulfilled, (state, action) => {
        state.listMovies = action.payload;
      });
  }
});
