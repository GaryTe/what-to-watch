import { NameSpace } from '../../../const/const';
import { RootState } from '../../../types/store/store';
import { statusAuthorization } from '../../../types/types-response/types-response';

export const dataUser = (state: RootState): statusAuthorization | null => state[NameSpace.Login].dataUser;
export const status = (state: RootState): boolean => state[NameSpace.Login].statusAuthorization;
