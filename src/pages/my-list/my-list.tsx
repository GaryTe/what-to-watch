import {Link, useNavigate} from 'react-router-dom';
import {AxiosInstance} from 'axios';
import {AsyncThunk} from '@reduxjs/toolkit';
import Header from '../../components/header/header';
import { useAppSelector } from '../../hooks/use-store/use-store';
import { dataListFilmToWatch } from '../../store/selectors/data-list-film-to-watch/selectors';
import { Path } from '../../const/const';
import { useRequestToServer } from '../../hooks/use-request-to-server/use-request-to-server';
import { fetchListFilmToWatch } from '../../store/api-actions/api-actions';
import { ListFilm } from '../../types/types-response/types-response';

type FetchListFilmToWatch = AsyncThunk<ListFilm, undefined, {
  extra: AxiosInstance;
}>

function MyList(): JSX.Element {
  const navigate = useNavigate();
  useRequestToServer<FetchListFilmToWatch, null>(fetchListFilmToWatch);
  const listFilm = useAppSelector(dataListFilmToWatch);

  return(
    <div className="user-page">
      <section className="catalog">
        <h2 className="catalog__title visually-hidden">Catalog</h2>
        <Header>
          <h1 className="page-title user-page__title" style={{position: 'relative'}}>
            My list
            <span className="user-page__film-count">{listFilm?.length}</span>
          </h1>
        </Header>
        <div className="catalog__films-list">
          {listFilm?.map((film) => {
            const {id, previewImage, name} = film;

            return (
              <article key={id} className="small-film-card catalog__films-card">
                <div className="small-film-card__image" onClick={() => navigate(`/${Path.Film}${id}`)}>
                  <img src={previewImage} alt={name} width="280" height="175" />
                </div>
                <h3 className="small-film-card__title">
                  <Link className="small-film-card__link" to={`/${Path.Film}${id}`}>{name}</Link>
                </h3>
              </article>);
          }
          )}
        </div>
      </section>

      <footer className="page-footer">
        <div className="logo">
          <a href="main.html" className="logo__link logo__link--light">
            <span className="logo__letter logo__letter--1">W</span>
            <span className="logo__letter logo__letter--2">T</span>
            <span className="logo__letter logo__letter--3">W</span>
          </a>
        </div>

        <div className="copyright">
          <p>© 2019 What to watch Ltd.</p>
        </div>
      </footer>
    </div>
  );
}

export default MyList;
