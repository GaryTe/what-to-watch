import {useEffect} from 'react';
import { useAppDispatch } from '../use-store/use-store';

export const useRequestToServer = <A,B>(action: A, payload?: B) => {
  const dispatch = useAppDispatch();


  useEffect(() => {
    if(typeof action !== 'function') {
      throw new Error ('Parameter "action" must be a function');
    }

    let isMounted = true;

    if (isMounted) {
      dispatch(action(payload && payload));
    }

    return () => {
      isMounted = false;
    };
  }, [action, dispatch, payload]);
};
