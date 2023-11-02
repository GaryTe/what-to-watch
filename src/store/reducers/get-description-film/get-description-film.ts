import { createSlice } from '@reduxjs/toolkit';
import { fetchDataWithDetailsFilm, addFilmToWatch } from '../../api-actions/api-actions';
import { DataDescriptionFilm } from '../../../types/store/store';
import { NameSpace } from '../../../const/const';

const initialState: DataDescriptionFilm = {
  descriptionFilm: null
};

export const getDescriptionFilm = createSlice({
  name: NameSpace.DetailsFilm,
  initialState,
  reducers: {},
  extraReducers:(builder) => {
    builder
      .addCase(fetchDataWithDetailsFilm.pending, (state) => {
        if(state.descriptionFilm) {
          state.descriptionFilm = null;
        }
      })
      .addCase(fetchDataWithDetailsFilm.fulfilled, (state, action) => {
        state.descriptionFilm = action.payload;
      });
    builder
      .addCase(addFilmToWatch.fulfilled, (state, action) => {
        if(action.payload.name === state.descriptionFilm?.name) {
          state.descriptionFilm = action.payload;
        }
      });
  }
});
