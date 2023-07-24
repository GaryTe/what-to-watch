import { createSlice } from '@reduxjs/toolkit';
import { fetchDataSimilaFilms } from '../../api-actions/api-actions';
import { DataSimilaFilms } from '../../../types/store/store';
import { NameSpace } from '../../../const/const';

const initialState: DataSimilaFilms = {
  listSimilaFilm: null
};

export const getSimilaListFilm = createSlice({
  name: NameSpace.SimilarFilms,
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(fetchDataSimilaFilms.fulfilled, (state, action) => {
        state.listSimilaFilm = action.payload.slice(0, 4);
      });
  }
});

export default getSimilaListFilm;
