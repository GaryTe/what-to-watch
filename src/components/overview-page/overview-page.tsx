import { getScoreFilm } from '../../util/util';
import { PromoFilm } from '../../types/types-response/types-response';

type OverviewPageProps = {
  dataOverview: PromoFilm;
}

function OverviewPage({dataOverview}: OverviewPageProps): JSX.Element {
  const {rating, scoresCount, description, director, starring} = dataOverview;
  return(
    <>
      <div className="film-rating">
        <div className="film-rating__score">{rating}</div>
        <p className="film-rating__meta">
          <span className="film-rating__level">{getScoreFilm(rating)}</span>
          <span className="film-rating__count">{scoresCount} ratings</span>
        </p>
      </div>

      <div className="film-card__text">
        {description}
        <p className="film-card__director"><strong>Director: {director}</strong></p>

        <p className="film-card__starring"><strong>Starring: {starring.map((actor) => `${actor},`)}</strong></p>
      </div>
    </>
  );
}

export default OverviewPage;
