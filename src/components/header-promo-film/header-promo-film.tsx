import {useNavigate} from 'react-router-dom';
import ButtonMyList from '../button-my-list/button-my-list';
import { PromoFilm } from '../../types/types-response/types-response';
import { Path } from '../../const/const';

type HeaderPromoFilmProps = {
  dataHeaderPromoFilm: PromoFilm;
}

function HeaderPromoFilm({dataHeaderPromoFilm}: HeaderPromoFilmProps): JSX.Element {
  const navigate = useNavigate();

  const {id, posterImage, name, genre, released, rating, isFavorite, videoLink} = dataHeaderPromoFilm;

  return(
    <div className="film-card__wrap">
      <div className="film-card__info">
        <div className="film-card__poster">
          <img src={posterImage} alt={name} width="218" height="327" />
        </div>

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
              onClick={() => navigate(`${Path.Player}${id}`, {state: {videoLink, path: Path.Main}})}
            >
              <svg viewBox="0 0 19 19" width="19" height="19">
                <use xlinkHref="#play-s"></use>
              </svg>
              <span>Play</span>
            </button>
            <ButtonMyList id={id} rating={rating} isFavorite={isFavorite}/>
          </div>
        </div>
      </div>
    </div>
  );
}

export default HeaderPromoFilm;
