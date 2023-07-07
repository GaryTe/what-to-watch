import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../types/store/store';
import { AppDispatch } from '../../types/reducer/reducer';

export const useAppDispatch: () => AppDispatch = useDispatch;
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
