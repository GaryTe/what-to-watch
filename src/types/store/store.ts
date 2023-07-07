import { store } from '../../store/store/store';
import { PromoFilm, ListFilm, Comments, statusAuthorization} from '../types-response/types-response';

export type DataPromoFilm = {
  promoFilm: PromoFilm | null;
}

export type DataListFilm = {
  listFilm: ListFilm | null;
  sortListFilm: ListFilm | null;
  dataFilm: ListFilm | null;
  counter: number;
  filter: string;
}

export type DataDescriptionFilm = {
  descriptionFilm: PromoFilm | null;
}

export type DataComments = {
  comments: Comments | null;
}

export type DataSimilaFilms = {
  listSimilaFilm: ListFilm | null;
}

export type DataAuthorization = {
  statusAuthorization: boolean;
  dataUser: statusAuthorization | null;
}

export type MoviesToWatch = {
  listMovies: ListFilm | null;
}

export type RootState = ReturnType<typeof store.getState>;
