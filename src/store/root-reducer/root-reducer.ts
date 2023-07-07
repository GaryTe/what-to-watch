import { combineReducers } from '@reduxjs/toolkit';
import { getPromoFilm } from '../reducers/get-promo-film/get-promo-film';
import { getListFilm } from '../reducers/get-list-film/get-list-film';
import { getDescriptionFilm } from '../reducers/get-description-film/get-description-film';
import { getComments } from '../reducers/get-comments/get-comments';
import { getSimilaListFilm } from '../reducers/get-simila-films/get-simila-films';
import { getDataAuthorization } from '../reducers/get-data-authorization/get-data-authorization';
import { getListFilmToWatch } from '../reducers/get-list-film-to-watch/get-list-film-to-watch';
import { NameSpace } from '../../const/const';


export const rootReducer = combineReducers ({
  [NameSpace.PromoFilm]: getPromoFilm.reducer,
  [NameSpace.ListFilm]: getListFilm.reducer,
  [NameSpace.DetailsFilm]: getDescriptionFilm.reducer,
  [NameSpace.Comments]: getComments.reducer,
  [NameSpace.SimilarFilms]: getSimilaListFilm.reducer,
  [NameSpace.Login]: getDataAuthorization.reducer,
  [NameSpace.Favorite]: getListFilmToWatch.reducer
});
