import { PromoFilm } from '../../types/types-response/types-response';

type CoverMovieProps = {
  dataCoverMovie: PromoFilm;
}

function CoverMovie({dataCoverMovie}: CoverMovieProps): JSX.Element {
  return(
    <div className="film-card__bg">
      <img src={dataCoverMovie.previewImage} alt={dataCoverMovie.name} />
    </div>
  );
}

export default CoverMovie;
