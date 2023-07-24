import {Link} from 'react-router-dom';
import {useParams} from 'react-router-dom';
import {AsyncThunk} from '@reduxjs/toolkit';
import {AxiosInstance} from 'axios';
import {useState} from 'react';
import CoverMovie from '../../components/cover-movie/cover-movie';
import HeaderDescriptionFilm from '../../components/header-description-film/header-description-film';
import OverviewPage from '../../components/overview-page/overview-page';
import DatailsPage from '../../components/details-page/details-page';
import ReviewsPage from '../../components/reviews-page/reviews-page';
import ListMovie from '../../components/list-movie/list-movie';
import Header from '../../components/header/header';
import ScreenError from '../../components/screen-error/screen-error';
import { useRequestToServer } from '../../hooks/use-request-to-server/use-request-to-server';
import { fetchDataWithDetailsFilm } from '../../store/api-actions/api-actions';
import { fetchDataSimilaFilms } from '../../store/api-actions/api-actions';
import { dataSimilaFilms } from '../../store/selectors/data-simila-films/selectors';
import { PromoFilm } from '../../types/types-response/types-response';
import { useAppSelector } from '../../hooks/use-store/use-store';
import { dataFilm } from '../../store/selectors/data-description-film/selectors';
import { filmsList } from '../../store/selectors/data-list-film/selectors';
import { NameTab, Path } from '../../const/const';
import { useScrollToTop } from '../../hooks/use-scroll-to-top/use-scroll-to-top';


type FetchDataWithDetailsFilm = AsyncThunk<PromoFilm, string, {
  extra: AxiosInstance;
}>

function DescriptionFilm(): JSX.Element {
  const [tab, setTab] = useState(NameTab.Overview);
  const films = useAppSelector(filmsList);
  const {id} = useParams();
  const searchFilm = films?.map((movie) => movie.id === Number(id));

  useRequestToServer<FetchDataWithDetailsFilm, string>(fetchDataWithDetailsFilm, id);
  const detailsFilm = useAppSelector(dataFilm);
  useScrollToTop();

  return searchFilm ? (
    <>
      <section className="film-card film-card--full">
        <div className="film-card__hero">
          {detailsFilm && <CoverMovie dataCoverMovie={detailsFilm}/>}

          <h1 className="visually-hidden">WTW</h1>

          <Header />

          {detailsFilm && <HeaderDescriptionFilm dataHeaderPromoFilm={detailsFilm}/>}
        </div>

        <div className="film-card__wrap film-card__translate-top">
          <div className="film-card__info">
            <div className="film-card__poster film-card__poster--big">
              <img src={detailsFilm?.posterImage} alt={detailsFilm?.name} width="218" height="327" />
            </div>

            <div className="film-card__desc">
              <nav className="film-nav film-card__nav">
                <ul className="film-nav__list">
                  <li className={tab === NameTab.Overview ? 'film-nav__item film-nav__item--active' : 'film-nav__item'}>
                    <div className="film-nav__link" onClick={() => setTab(NameTab.Overview)}>Overview</div>
                  </li>
                  <li className={tab === NameTab.Details ? 'film-nav__item film-nav__item--active' : 'film-nav__item'}>
                    <div className="film-nav__link" onClick={() => setTab(NameTab.Details)}>Details</div>
                  </li>
                  <li className={tab === NameTab.Reviews ? 'film-nav__item film-nav__item--active' : 'film-nav__item'}>
                    <div className="film-nav__link" onClick={() => setTab(NameTab.Reviews)}>Reviews</div>
                  </li>
                </ul>
              </nav>

              {detailsFilm && tab === NameTab.Overview && <OverviewPage dataOverview={detailsFilm}/>}
              {detailsFilm && tab === NameTab.Details && <DatailsPage dataDatails={detailsFilm}/>}
              {detailsFilm && tab === NameTab.Reviews && <ReviewsPage filmId={detailsFilm.id}/>}
            </div>
          </div>
        </div>
      </section>

      <div className="page-content">
        <section className="catalog catalog--like-this">
          <h2 className="catalog__title">More like this</h2>

          <div className="catalog__films-list">
            {detailsFilm && <ListMovie action={fetchDataSimilaFilms} getDataFilms={dataSimilaFilms} filmId={detailsFilm.id}/>}
          </div>
        </section>

        <footer className="page-footer">
          <div className="logo">
            <Link to={Path.Main} className="logo__link logo__link--light">
              <span className="logo__letter logo__letter--1">W</span>
              <span className="logo__letter logo__letter--2">T</span>
              <span className="logo__letter logo__letter--3">W</span>
            </Link>
          </div>

          <div className="copyright">
            <p>© 2019 What to watch Ltd.</p>
          </div>
        </footer>
      </div>
    </>
  ) : (<ScreenError />);
}

export default DescriptionFilm;
