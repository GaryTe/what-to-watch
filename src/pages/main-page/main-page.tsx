import {AxiosInstance} from 'axios';
import {AsyncThunk} from '@reduxjs/toolkit';
import HeaderPromoFilm from '../../components/header-promo-film/header-promo-film';
import ListGenres from '../../components/list-genres/list-genres';
import ListMovie from '../../components/list-movie/list-movie';
import CoverMovie from '../../components/cover-movie/cover-movie';
import Header from '../../components/header/header';
import { useRequestToServer } from '../../hooks/use-request-to-server/use-request-to-server';
import { fetchDataListFilm } from '../../store/api-actions/api-actions';
import { fetchDataPromoFilm } from '../../store/api-actions/api-actions';
import { dataListFilm } from '../../store/selectors/data-list-film/selectors';
import { useAppSelector } from '../../hooks/use-store/use-store';
import { ShowMore } from '../../components/show-more/show-more';
import { dataPromoFilm } from '../../store/selectors/data-promo-film/selectors';
import { PromoFilm } from '../../types/types-response/types-response';

type FetchDataPromoFilm = AsyncThunk<PromoFilm, undefined, {
  extra: AxiosInstance;
}>;

function MainPage(): JSX.Element {
  useRequestToServer<FetchDataPromoFilm, null>(fetchDataPromoFilm);
  const promoFilm = useAppSelector(dataPromoFilm);

  return(
    <>
      <section className="film-card">
        {promoFilm && <CoverMovie dataCoverMovie={promoFilm}/>}

        <h1 className="visually-hidden">WTW</h1>

        <Header />

        {promoFilm && <HeaderPromoFilm dataHeaderPromoFilm={promoFilm}/>}
      </section>

      <div className="page-content">
        <section className="catalog">
          <h2 className="catalog__title visually-hidden">Catalog</h2>

          <ul className="catalog__genres-list">
            {<ListGenres />}
          </ul>

          {<ListMovie action={fetchDataListFilm} getDataFilms={dataListFilm}/>}

          {<ShowMore />}
        </section>

        <footer className="page-footer">
          <div className="logo">
            <a className="logo__link logo__link--light" href="#todo">
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
    </>
  );
}

export default MainPage;
