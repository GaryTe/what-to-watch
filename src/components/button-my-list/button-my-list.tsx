import {useNavigate} from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../hooks/use-store/use-store';
import { status } from '../../store/selectors/data-authorization/selectors';
import { addFilmToWatch } from '../../store/api-actions/api-actions';
import { Path } from '../../const/const';

type ButtonMyListProps = {
  id: number;
  rating: number;
  isFavorite: boolean;
  path?: string;
}

function ButtonMyList({id, rating, isFavorite, path}: ButtonMyListProps): JSX.Element {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const statusAuthorization = useAppSelector(status);

  const addSelectedFilm = () => {
    statusAuthorization ?
      dispatch(addFilmToWatch({
        filmId: id,
        status: isFavorite ? 0 : 1
      }))
      :
      navigate(Path.Login, {state: path});
  };

  return(
    <button className="btn btn--list film-card__button" type="button" onClick={addSelectedFilm}>
      {!isFavorite ?
        <svg viewBox="0 0 19 20" width="19" height="20">
          <use xlinkHref="#add"></use>
        </svg>
        :
        <svg viewBox="0 0 18 14" width="18" height="14">
          <use xlinkHref="#in-list"></use>
        </svg> }
      <span>My list</span>
      <span className="film-card__count">{rating}</span>
    </button>
  );
}

export default ButtonMyList;
