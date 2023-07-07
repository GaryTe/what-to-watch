import { NameSpace } from '../../../const/const';
import { RootState } from '../../../types/store/store';
import { PromoFilm } from '../../../types/types-response/types-response';

export const dataFilm = (state: RootState): PromoFilm | null => state[NameSpace.DetailsFilm].descriptionFilm;
