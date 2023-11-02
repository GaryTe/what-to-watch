import {configureMockStore} from '@jedmao/redux-mock-store';
import thunk, { ThunkDispatch } from 'redux-thunk';
import { createAPI } from '../../server/api/api';
import {Action} from '@reduxjs/toolkit';
import { render, screen } from '@testing-library/react';
import {Provider} from 'react-redux';
import {BrowserRouter} from 'react-router-dom';
import MainPage from './main-page';


type DataFilm = {
  id: number;
  previewImage: string;
  name: string;
  previewVideoLink: string;
}

type Storage = {
  PROMO_FILM: {
    promoFilm: {
      previewImage: string;
      name: string;
      id: number;
      posterImage: string;
      genre: string;
      released: number;
      rating: number;
      isFavorite: boolean;
      videoLink: string;
    };
  };
  LOGIN: {
    statusAuthorization: boolean;
    dataUser: null;
  };
  LIST_FILM: {
    filter: string;
    dataFilm: Array<DataFilm>;
    counter: number;
    sortListFilm: Array<DataFilm>;
  };
};


const api = createAPI();
const middlewares = [thunk.withExtraArgument(api)];

const mockStore = configureMockStore<
Storage,
Action<string>,
ThunkDispatch<Storage, typeof api, Action>
>(middlewares);

const storage = mockStore({
  PROMO_FILM: {
    promoFilm: {
      previewImage: 'img/the-grand-budapest-hotel.jpg',
      name: 'The Grand Hotel',
      id: 1,
      posterImage: 'img/the-grand-budapest-hotel-poster.jpg',
      genre: 'Comedy',
      released: 2014,
      rating: 8.9,
      isFavorite: false,
      videoLink: 'https://some-link'
    }
  },
  LOGIN: {
    statusAuthorization: false,
    dataUser: null
  },
  LIST_FILM: {
    filter: 'All genres',
    dataFilm: [
      {
        id: 1,
        previewImage: 'img/the-grand-budapest-hotel.jpg',
        name: 'The Grand Budapest Hotel',
        previewVideoLink: 'https://some-link'
      },
      {
        id: 1,
        previewImage: 'img/the-grand-budapest-hotel.jpg',
        name: 'The Grand Budapest Hotel',
        previewVideoLink: 'https://some-link'
      }
    ],
    counter: 1,
    sortListFilm: [
      {
        id: 1,
        previewImage: 'img/the-grand-budapest-hotel.jpg',
        name: 'The Grand Budapest Hotel',
        previewVideoLink: 'https://some-link'
      },
      {
        id: 1,
        previewImage: 'img/the-grand-budapest-hotel.jpg',
        name: 'The Grand Budapest Hotel',
        previewVideoLink: 'https://some-link'
      }
    ]
  }
});

describe('Test page "MainPage"', () => {

  test('should render correctly page "MainPage"', () => {

    render(
      <Provider store={storage}>
        <BrowserRouter>
          <MainPage />
        </BrowserRouter>
      </Provider>
    );

    expect(screen.getByText('WTW')).toBeInTheDocument();
    expect(screen.getByRole('button', {name: 'Show more'})).toBeInTheDocument();

    const imgElementsList = screen.getAllByAltText('The Grand Hotel');
    imgElementsList.forEach((element) => expect(element).toBeInTheDocument());

    expect(screen.getByRole('link', {name: 'Sign In'})).toBeInTheDocument();
    expect(screen.getByRole('button', {name: 'Play'})).toBeInTheDocument();
    expect(screen.getByRole('button', {name: 'My list 8.9'})).toBeInTheDocument();
    expect(screen.getByRole('link', {name:'Dramas'})).toBeInTheDocument();
  });
});
