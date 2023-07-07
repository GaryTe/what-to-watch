import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { fetchDataListFilm } from '../../api-actions/api-actions';
import { DataListFilm } from '../../../types/store/store';
import { filterFilmsByGenre } from '../../../util/util';
import { NameSpace } from '../../../const/const';

const initialState: DataListFilm = {
  listFilm: null,
  sortListFilm: null,
  dataFilm: null,
  counter: 8,
  filter: 'All genres'
};

export const getListFilm = createSlice({
  name: NameSpace.ListFilm,
  initialState,
  reducers: {
    filteringListFilm: (state, action: PayloadAction<string>) => {
      state.filter = action.payload;
      state.counter = 8;
      if(state.listFilm === null) {return;}
      state.sortListFilm = filterFilmsByGenre(state.listFilm, action.payload);
      state.dataFilm = state.sortListFilm.slice(0,8);
    },
    showListFilm: (state) => {
      if(state.sortListFilm === null) {return;}
      state.counter += 8;
      state.dataFilm = state.sortListFilm.slice(0,state.counter);
    }
  },
  extraReducers(builder) {
    builder
      .addCase(fetchDataListFilm.fulfilled, (state, action) => {
        state.listFilm = action.payload;
        state.sortListFilm = action.payload;
        state.dataFilm = action.payload.slice(0,8);
      });
  }
});

export const {filteringListFilm, showListFilm} = getListFilm.actions;
