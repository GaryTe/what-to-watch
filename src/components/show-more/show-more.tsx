import { useAppSelector, useAppDispatch } from '../../hooks/use-store/use-store';
import { dataCounter, dataSortListFilm } from '../../store/selectors/data-list-film/selectors';
import { showListFilm } from '../../store/reducers/get-list-film/get-list-film';

export function ShowMore(): JSX.Element {
  const dispatch = useAppDispatch();

  const valueCounter = useAppSelector(dataCounter);
  const valueSortListFilm = useAppSelector(dataSortListFilm);

  return(
    <div className="catalog__more">
      {
        valueSortListFilm !== null && valueCounter <= valueSortListFilm.length &&
        <button className="catalog__button" type="button" onClick={() => dispatch(showListFilm())}>Show more</button>
      }
    </div>
  );
}
