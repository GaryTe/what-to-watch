import {createAsyncThunk} from '@reduxjs/toolkit';
import {AxiosInstance} from 'axios';
import { PromoFilm, ListFilm, Comments, statusAuthorization } from '../../types/types-response/types-response';
import { dataUser, DataForPost, DataForAddNewComment } from '../../types/request/request';
import { APIRoute } from '../../const/const';
import { saveToken, dropToken } from '../../server/token/token';

export const fetchDataPromoFilm = createAsyncThunk<PromoFilm, undefined, {
  extra: AxiosInstance;
}>(
  'data/responsePromoFilm',
  async (_arg, {extra: api}) => {
    const {data} = await api.get<PromoFilm>(APIRoute.PromoFilm);
    return data;
  },
);

export const fetchDataListFilm = createAsyncThunk<ListFilm, undefined, {
  extra: AxiosInstance;
}>(
  'data/responseListFilm',
  async (_arg, {extra: api}) => {
    const {data} = await api.get<ListFilm>(APIRoute.ListFilm);
    return data;
  },
);

export const fetchDataWithDetailsFilm = createAsyncThunk<PromoFilm, string, {
  extra: AxiosInstance;
}>(
  'data/responseWithDetailsFilm',
  async (filmId: string, {extra: api}) => {
    const {data} = await api.get<PromoFilm>(`${APIRoute.DetailsFilm}${filmId}`);
    return data;
  },
);

export const fetchDataComments = createAsyncThunk<Comments, number, {
  extra: AxiosInstance;
}>(
  'data/responseComments',
  async (filmId: number, {extra: api}) => {
    const {data} = await api.get<Comments>(`${APIRoute.Comments}${filmId}`);
    return data;
  },
);

export const fetchDataSimilaFilms = createAsyncThunk<ListFilm, number, {
  extra: AxiosInstance;
}>(
  'data/responseListFilm',
  async (filmId: number, {extra: api}) => {
    const {data} = await api.get<ListFilm>(`${APIRoute.DetailsFilm}${filmId}${APIRoute.SimilarFilms}`);
    return data;
  },
);

export const postAuthorizatioDataUser = createAsyncThunk<statusAuthorization, dataUser, {
  extra: AxiosInstance;
}>(
  'data/responseStatusAuthorization',
  async (dataForAuthorization: dataUser, {extra: api}) => {
    const {data} = await api.post<statusAuthorization>(APIRoute.Login, dataForAuthorization);
    saveToken(data.token);
    return data;
  },
);

export const deleteAuthorization = createAsyncThunk<void, undefined, {
  extra: AxiosInstance;
}>(
  'user/deleteAuthorization',
  async (_arg, {extra: api}) => {
    try {
      await api.delete(APIRoute.Logout);
      dropToken();
    } catch(error) {
      throw new Error ('Удалить аккаунт не удалось.');
    }
  },
);

export const checkAuthorization = createAsyncThunk<statusAuthorization, undefined, {
  extra: AxiosInstance;
}>(
  'user/checkAuthorization',
  async (_arg, {extra: api}) => {
    const {data} = await api.get<statusAuthorization>(APIRoute.Login);
    if(data) {
      return data;
    }
    throw new Error ('Данные не получины; при проверки авторизации.');
  }
);

export const fetchListFilmToWatch = createAsyncThunk<ListFilm, undefined, {
  extra: AxiosInstance;
}>(
  'data/responseListFilmToWatch',
  async (_arg, {extra: api}) => {
    const {data} = await api.get<ListFilm>(APIRoute.Favorite);
    return data;
  },
);

export const addFilmToWatch = createAsyncThunk<PromoFilm, DataForPost, {
  extra: AxiosInstance;
}>(
  'data/addFilmToWatch',
  async ({filmId, status}, {extra: api}) => {
    const {data} = await api.post<PromoFilm>(`${APIRoute.Favorite}/${filmId}/${status}`);
    return data;
  },
);

export const postDataForAddNewComments = createAsyncThunk<Comments, DataForAddNewComment, {
  extra: AxiosInstance;
}>(
  'user/dataForAddNewComments',
  async ({comment, rating, filmId}, {extra: api}) => {
    const {data} = await api.post<Comments>(`${APIRoute.Comments}${filmId}`, {comment, rating});
    return data;
  },
);
