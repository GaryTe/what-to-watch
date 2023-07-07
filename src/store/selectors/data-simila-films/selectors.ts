import { NameSpace } from '../../../const/const';
import { RootState } from '../../../types/store/store';
import { ListFilm } from '../../../types/types-response/types-response';

export const dataSimilaFilms = (state: RootState): ListFilm | null => state[NameSpace.SimilarFilms].listSimilaFilm;
