import { useAppDispatch, useAppSelector } from '../../hooks/use-store/use-store';
import { filteringListFilm } from '../../store/reducers/get-list-film/get-list-film';
import { valueFilter } from '../../store/selectors/data-list-film/selectors';
import { Genre } from '../../const/const';

function ListGenres(): JSX.Element {
  const dispatch = useAppDispatch();

  const nameFilter = useAppSelector(valueFilter);
  return(
    <>
      {Object.values(Genre).map((genre) =>
        (
          <li
            key={genre}
            className={nameFilter === genre ? 'catalog__genres-item catalog__genres-item--active' : 'catalog__genres-item'}
          >
            <a href="#todo" className="catalog__genres-link" onClick={() => dispatch(filteringListFilm(genre))}>{genre}</a>
          </li>
        )
      )}
    </>
  );
}

export default ListGenres;
