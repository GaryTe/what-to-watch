import { NameSpace } from '../../../const/const';
import { RootState } from '../../../types/store/store';
import { ListFilm } from '../../../types/types-response/types-response';

export const dataListFilm = (state: RootState): ListFilm | null => state[NameSpace.ListFilm].dataFilm;
export const dataCounter = (state: RootState): number => state[NameSpace.ListFilm].counter;
export const dataSortListFilm = (state: RootState): ListFilm | null => state[NameSpace.ListFilm].sortListFilm;
export const valueFilter = (state: RootState): string => state[NameSpace.ListFilm].filter;
