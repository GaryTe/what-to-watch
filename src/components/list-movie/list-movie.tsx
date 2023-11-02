import {AxiosInstance} from 'axios';
import {AsyncThunk} from '@reduxjs/toolkit';
import {Link, useNavigate} from 'react-router-dom';
import {useState} from 'react';
import VideoPreview from '../video-preview/video-preview';
import { RootState } from '../../types/store/store';
import { useAppSelector } from '../../hooks/use-store/use-store';
import { useRequestToServer } from '../../hooks/use-request-to-server/use-request-to-server';
import { ListFilm } from '../../types/types-response/types-response';
import { Path } from '../../const/const';

type FetchDataListFilm = AsyncThunk<ListFilm, undefined, {
  extra: AxiosInstance;
}>

type DataListFilm = (state: RootState) => ListFilm | null

type FetchDataSimilaFilms = AsyncThunk<ListFilm, number, {
  extra: AxiosInstance;
}>

type ListMovieProps = {
  action: FetchDataListFilm | FetchDataSimilaFilms;
  getDataFilms: DataListFilm;
  filmId?: number;
}

function ListMovie({action, getDataFilms, filmId}: ListMovieProps): JSX.Element {
  const [isIndicator, setIsIndicator] = useState<number | boolean>(false);
  const navigate = useNavigate();
  useRequestToServer<FetchDataListFilm | FetchDataSimilaFilms, null | number>(action, filmId);

  const listFilm = useAppSelector(getDataFilms);

  return(
    <div className="catalog__films-list">
      {listFilm && listFilm.map((dataFilm) => {
        const {id, previewImage, name, previewVideoLink} = dataFilm;

        return(
          <article
            key={id}
            className="small-film-card catalog__films-card"
          >
            <div
              className="small-film-card__image"
              onMouseOver={() => setIsIndicator(id)}
              onMouseOut={() => setIsIndicator(false)}
              onClick={() => navigate(`/${Path.Film}${id}`)}
            >
              {!isIndicator || isIndicator !== id ?
                <img src={previewImage} alt={name} width="280" height="175"/>
                :
                <VideoPreview valueVideo={previewVideoLink} id={id}/>}
            </div>
            <h3 className="small-film-card__title">
              <Link className="small-film-card__link" to={`/${Path.Film}${id}`}>{name}</Link>
            </h3>
          </article>
        );
      }
      )}
    </div>
  );
}

export default ListMovie;
