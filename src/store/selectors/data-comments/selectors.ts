import { NameSpace } from '../../../const/const';
import { RootState } from '../../../types/store/store';
import { Comments } from '../../../types/types-response/types-response';

export const dataComments = (state: RootState): Comments | null => state[NameSpace.Comments].comments;
