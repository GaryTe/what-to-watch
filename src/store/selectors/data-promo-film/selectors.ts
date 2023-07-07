import { NameSpace } from '../../../const/const';
import { RootState } from '../../../types/store/store';
import { PromoFilm } from '../../../types/types-response/types-response';

export const dataPromoFilm = (state: RootState): PromoFilm | null => state[NameSpace.PromoFilm].promoFilm;
