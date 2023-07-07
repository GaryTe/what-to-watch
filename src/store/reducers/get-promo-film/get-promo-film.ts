import { createSlice } from '@reduxjs/toolkit';
import { fetchDataPromoFilm, addFilmToWatch } from '../../api-actions/api-actions';
import { DataPromoFilm } from '../../../types/store/store';
import { NameSpace } from '../../../const/const';

const initialState: DataPromoFilm = {
  promoFilm: null
};

export const getPromoFilm = createSlice({
  name: NameSpace.PromoFilm,
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(fetchDataPromoFilm.fulfilled, (state, action) => {
        state.promoFilm = action.payload;
      });
    builder
      .addCase(addFilmToWatch.fulfilled, (state, action) => {
        if(action.payload.name === state.promoFilm?.name) {
          state.promoFilm = action.payload;
        }
      });
  }
});
