import {useNavigate} from 'react-router-dom';
import ButtonMyList from '../button-my-list/button-my-list';
import ButtonAddReview from '../button-add-review/button-add-review';
import { PromoFilm } from '../../types/types-response/types-response';
import { Path } from '../../const/const';

type HeaderDescriptionFilmProps = {
  dataHeaderPromoFilm: PromoFilm;
}

function HeaderDescriptionFilm({dataHeaderPromoFilm}: HeaderDescriptionFilmProps): JSX.Element {
  const navigate = useNavigate();
  const {id, name, genre, released, rating, isFavorite, videoLink} = dataHeaderPromoFilm;

  return(
    <div className="film-card__wrap">
      <div className="film-card__desc">
        <h2 className="film-card__title">{name}</h2>
        <p className="film-card__meta">
          <span className="film-card__genre">{genre}</span>
          <span className="film-card__year">{released}</span>
        </p>

        <div className="film-card__buttons">
          <button
            className="btn btn--play film-card__button"
            type="button"
            onClick={() => navigate(`/${Path.Player}${id}`, {state: {videoLink, path: `/${Path.Film}${id}`}})}
          >
            <svg viewBox="0 0 19 19" width="19" height="19">
              <use xlinkHref="#play-s"></use>
            </svg>
            <span>Play</span>
          </button>
          <ButtonMyList id={id} rating={rating} isFavorite={isFavorite} path={`/${Path.Film}${id}`}/>
          <ButtonAddReview id={id} />
        </div>
      </div>
    </div>
  );
}

export default HeaderDescriptionFilm;
