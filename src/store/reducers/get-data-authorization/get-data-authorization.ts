import { createSlice } from '@reduxjs/toolkit';
import { postAuthorizatioDataUser, deleteAuthorization, checkAuthorization } from '../../api-actions/api-actions';
import { DataAuthorization } from '../../../types/store/store';
import { NameSpace } from '../../../const/const';

const initialState: DataAuthorization = {
  statusAuthorization: false,
  dataUser: null
};

export const getDataAuthorization = createSlice({
  name: NameSpace.Login,
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(postAuthorizatioDataUser.fulfilled, (state, action) => {
        state.statusAuthorization = true;
        state.dataUser = action.payload;
      });
    builder
      .addCase(deleteAuthorization.fulfilled, (state) => {
        state.statusAuthorization = false;
        state.dataUser = null;
      });
    builder
      .addCase(checkAuthorization.fulfilled, (state, action) => {
        state.statusAuthorization = true;
        state.dataUser = action.payload;
      });
  }
});
