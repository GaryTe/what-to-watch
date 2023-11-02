import {
  fetchDataListFilm,
  fetchDataPromoFilm,
  fetchDataWithDetailsFilm,
  fetchDataComments,
  fetchDataSimilaFilms,
  postAuthorizatioDataUser,
  deleteAuthorization,
  checkAuthorization,
  fetchListFilmToWatch,
  addFilmToWatch,
  postDataForAddNewComments
} from './api-actions';
import {configureMockStore} from '@jedmao/redux-mock-store';
import thunk, {ThunkDispatch} from 'redux-thunk';
import { RootState } from '../../types/store/store';
import { Action } from '@reduxjs/toolkit';
import MockAdapter from 'axios-mock-adapter';
import { createAPI } from '../../server/api/api';
import { APIRoute } from '../../const/const';
import { getToken } from '../../server/token/token';

describe('Test all asyns function.', () => {

  const api = createAPI();
  const mockAPI = new MockAdapter(api);

  const middlewares = [thunk.withExtraArgument(api)];
  const mockStore = configureMockStore<
  RootState,
  Action<string>,
  ThunkDispatch<RootState, typeof api, Action>
>(middlewares);
  const store = mockStore();

  beforeEach(() => {
    store.clearActions();
  });

  test('async function "fetchDataListFilm", returns "[{}, {}, {}]" if the response 200', async () => {

    mockAPI
      .onGet(APIRoute.ListFilm)
      .reply(200, [{}, {}, {}]);

    const respons = await store.dispatch(fetchDataListFilm());
    expect(respons.payload).toEqual([{}, {}, {}]);

    const actions = store.getActions().map(({type}) => type);

    expect(actions).toEqual([
      'data/responseListFilm/pending',
      'data/responseListFilm/fulfilled'
    ]);
  });

  test('async function "fetchDataPromoFilm", returns "{}" if the response 200', async () => {

    mockAPI
      .onGet(APIRoute.PromoFilm)
      .reply(200, {});

    const response = await store.dispatch(fetchDataPromoFilm());
    expect(response.payload).toEqual({});

    const actions = store.getActions().map(({type}) => type);
    expect(actions).toEqual([
      'data/responsePromoFilm/pending',
      'data/responsePromoFilm/fulfilled'
    ]);
  });

  test('async function "fetchDataWithDetailsFilm", returns "{}" if the response 200', async () => {

    mockAPI
      .onGet(`${APIRoute.DetailsFilm}1`)
      .reply(200, {});

    const response = await store.dispatch(fetchDataWithDetailsFilm('1'));
    expect(response.payload).toEqual({});

    const actions = store.getActions().map(({type}) => type);
    expect(actions).toEqual([
      'data/responseWithDetailsFilm/pending',
      'data/responseWithDetailsFilm/fulfilled'
    ]);
  });

  test('async function "fetchDataComments", returns "[{}, {}, {}]" if the response 200', async () => {

    mockAPI
      .onGet(`${APIRoute.Comments}1`)
      .reply(200, [{}, {}, {}]);

    const response = await store.dispatch(fetchDataComments(1));
    expect(response.payload).toEqual([{}, {}, {}]);

    const actions = store.getActions().map(({type}) => type);
    expect(actions).toEqual([
      'data/responseComments/pending',
      'data/responseComments/fulfilled'
    ]);
  });

  test('async function "fetchDataSimilaFilms", returns "[{}, {}, {}]" if the response 200', async () => {

    mockAPI
      .onGet(`${APIRoute.DetailsFilm}1${APIRoute.SimilarFilms}`)
      .reply(200, [{}, {}, {}]);

    const response = await store.dispatch(fetchDataSimilaFilms(1));
    expect(response.payload).toEqual([{}, {}, {}]);

    const actions = store.getActions().map(({type}) => type);
    expect(actions).toEqual([
      'data/responseListFilm/pending',
      'data/responseListFilm/fulfilled'
    ]);
  });

  test('async function "postAuthorizatioDataUser", returns "{token: T2xpdmVyLmNvbm5lckBnbWFpbC5jb20=}" if the response 200', async () => {

    const dataUser = { email: 'Oliver.conner@gmail.com', password: '12345678' };

    mockAPI
      .onPost(APIRoute.Login, dataUser)
      .reply(200, {token: 'T2xpdmVyLmNvbm5lckBnbWFpbC5jb20='});

    await store.dispatch(postAuthorizatioDataUser(dataUser));
    expect(getToken()).toBe('T2xpdmVyLmNvbm5lckBnbWFpbC5jb20=');

    const actions = store.getActions().map(({type}) => type);
    expect(actions).toEqual([
      'data/responseStatusAuthorization/pending',
      'data/responseStatusAuthorization/fulfilled'
    ]);
  });

  test('async function "deleteAuthorization", returns call function if the response 200', async () => {

    mockAPI
      .onDelete(APIRoute.Logout)
      .reply(200);

    Storage.prototype.getItem = jest.fn();

    await store.dispatch(deleteAuthorization());
    expect(Storage.prototype.getItem).toBeCalledTimes(1);

    const actions = store.getActions().map(({type}) => type);
    expect(actions).toEqual([
      'user/deleteAuthorization/pending',
      'user/deleteAuthorization/fulfilled'
    ]);
  });

  test('async function "checkAuthorization", returns "{}" if the response 200', async () => {

    mockAPI
      .onGet(APIRoute.Login)
      .reply(200, {});

    const response = await store.dispatch(checkAuthorization());
    expect(response.payload).toEqual({});

    const action = store.getActions().map(({type}) => type);
    expect(action).toEqual([
      'user/checkAuthorization/pending',
      'user/checkAuthorization/fulfilled'
    ]);
  });

  test('async function "fetchListFilmToWatch", returns "[{}, {}, {}]" if the response 200', async () => {

    mockAPI
      .onGet(APIRoute.Favorite)
      .reply(200, [{}, {}, {}]);

    const response = await store.dispatch(fetchListFilmToWatch());
    expect(response.payload).toEqual([{}, {}, {}]);

    const actions = store.getActions().map(({type}) => type);
    expect(actions).toEqual([
      'data/responseListFilmToWatch/pending',
      'data/responseListFilmToWatch/fulfilled'
    ]);
  });

  test('async function "addFilmToWatch", returns "{}" if the response 200', async () => {

    const dataForPost = { filmId: 1, status: 0 };

    mockAPI
      .onPost(`${APIRoute.Favorite}/${dataForPost.filmId}/${dataForPost.status}`)
      .reply(200, {});

    const response = await store.dispatch(addFilmToWatch(dataForPost));
    expect(response.payload).toEqual({});

    const actions = store.getActions().map(({type}) => type);
    expect(actions).toEqual([
      'data/addFilmToWatch/pending',
      'data/addFilmToWatch/fulfilled'
    ]);
  });

  test('async function "postDataForAddNewComments", returns "[{}, {}, {}]" if the response 200', async () => {

    const dataForAddNewComment = { comment: 'Good !', rating: 5, filmId: 1 };

    mockAPI
      .onPost(`${APIRoute.Comments}${dataForAddNewComment.filmId}`,
        {comment: dataForAddNewComment.comment, rating: dataForAddNewComment.rating}
      )
      .reply(200, [{}, {}, {}]);

    const response = await store.dispatch(postDataForAddNewComments(dataForAddNewComment));
    expect(response.payload).toEqual([{}, {}, {}]);

    const actions = store.getActions().map(({type}) => type);
    expect(actions).toEqual([
      'user/dataForAddNewComments/pending',
      'user/dataForAddNewComments/fulfilled'
    ]);
  });
});
