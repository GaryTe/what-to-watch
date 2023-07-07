import { createSlice } from '@reduxjs/toolkit';
import { fetchDataComments } from '../../api-actions/api-actions';
import { DataComments } from '../../../types/store/store';
import { NameSpace } from '../../../const/const';

const initialState: DataComments = {
  comments: null
};

export const getComments = createSlice({
  name: NameSpace.Comments,
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(fetchDataComments.fulfilled, (state, action) => {
        state.comments = action.payload;
      });
  }
});
