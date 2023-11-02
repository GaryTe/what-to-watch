import { configureMockStore } from '@jedmao/redux-mock-store';
import thunk, { ThunkDispatch } from 'redux-thunk';
import { createAPI } from '../../server/api/api';
import {Action} from '@reduxjs/toolkit';
import {render, screen, fireEvent} from '@testing-library/react';
import DescriptionFilm from './description-film';
import {BrowserRouter} from 'react-router-dom';
import {Provider} from 'react-redux';


type DataFilm = {
  id: number;
  previewImage: string;
  name: string;
  previewVideoLink: string;
}

type DataComment = {
  comment: string;
  date: string;
  id: number;
  rating: number;
  user: {
    id: number;
    name: string;
  };
}

type Storage = {
  LIST_FILM: {
    listFilm: Array<DataFilm>;
  };
  DETAILS_FILM:{
      descriptionFilm:{
      previewImage: string;
      name: string;
      id: number;
      posterImage: string;
      genre: string;
      released: number;
      rating: number;
      isFavorite: boolean;
      videoLink: string;
      scoresCount: number;
      description: string;
      director: string;
      starring: Array<string>;
      runTime: number;
  };};
  LOGIN: {
    statusAuthorization: boolean;
    dataUser: null;
  };
  COMMENTS: {
    comments:Array<DataComment>;
  };
  SIMILAR_FILMS: {
    listSimilaFilm: Array<DataFilm>;
  };
}

const api = createAPI();
const middlewares = [thunk.withExtraArgument(api)];

const mockStore = configureMockStore<
  Storage,
  Action<string>,
  ThunkDispatch<Storage, typeof api, Action>
>(middlewares);

const storege = mockStore({
  LIST_FILM: {
    listFilm: [
      {
        id: 1,
        previewImage: 'img/the-grand-budapest-hotel.jpg',
        name: 'The Grand Budapest Hotel',
        previewVideoLink: 'https://some-link'
      },
      {
        id: 2,
        previewImage: 'img/the-grand-budapest-hotel.jpg',
        name: 'The Grand Budapest Hotel',
        previewVideoLink: 'https://some-link'
      }
    ]
  },
  DETAILS_FILM: {
    descriptionFilm: {
      previewImage: 'img/the-grand-budapest-hotel.jpg',
      name: 'The Grand',
      id: 1,
      posterImage: 'img/the-grand-budapest-hotel-poster.jpg',
      genre: 'Comedy',
      released: 2014,
      rating: 8.9,
      isFavorite: false,
      videoLink: 'https://some-link',
      scoresCount: 240,
      description: 'In the 1930s, the Grand Budapest Hotel is a popular European ski resort, presided over by concierge Gustave H. (Ralph Fiennes). Zero, a junior lobby boy, becomes Gustave\'s friend and protege.',
      director: 'Wes Anderson',
      starring: [
        'Bill Murray'
      ],
      runTime: 99,
    }
  },
  LOGIN: {
    statusAuthorization: false,
    dataUser: null
  },
  COMMENTS: {
    comments:[
      {
        comment: 'Discerning travellers and Wes Anderson fans will luxuriate in the glorious Mittel-European kitsch of one of the director\'s funniest and most exquisitely designed movies in years.',
        date: 'Fri Oct 27 2023 11:29:39 GMT+0300 (Москва, стандартное время)',
        id: 1,
        rating: 8.9,
        user: {
          id: 4,
          name: 'Kate Muir'
        }
      },
      {
        comment: 'Discerning travellers and Wes Anderson fans will luxuriate in the glorious Mittel-European kitsch of one of the director\'s funniest and most exquisitely designed movies in years.',
        date: 'Fri Oct 27 2023 11:29:39 GMT+0300 (Москва, стандартное время)',
        id: 2,
        rating: 8.9,
        user: {
          id: 4,
          name: 'Vlad Vankov'
        }
      }
    ]
  },
  SIMILAR_FILMS: {
    listSimilaFilm: [
      {
        id: 1,
        previewImage: 'img/the-grand-budapest-hotel.jpg',
        name: 'The Grand Budapest Hotel',
        previewVideoLink: 'https://some-link'
      },
      {
        id: 2,
        previewImage: 'img/the-grand-budapest-hotel.jpg',
        name: 'The Grand Budapest Hotel',
        previewVideoLink: 'https://some-link'
      }
    ]
  }
});

describe('Test page "DescriptionFilm"', () => {

  test('should render correctly page "DescriptionFilm"', () => {

    render(
      <Provider store={storege}>
        <BrowserRouter>
          <DescriptionFilm />
        </BrowserRouter>
      </Provider>
    );

    expect(screen.getByRole('heading', {name: 'More like this'})).toBeInTheDocument();

    const imgElementsList = screen.getAllByAltText('The Grand');
    imgElementsList.forEach((element) => expect(element).toBeInTheDocument());

    expect(screen.getByRole('link', {name: 'Sign In'})).toBeInTheDocument();
    expect(screen.getByRole('button', {name: 'Play'})).toBeInTheDocument();
    expect(screen.getByRole('button', {name: 'My list 8.9'})).toBeInTheDocument();
    expect(screen.getByRole('button', {name: 'Add review'})).toBeInTheDocument();
    expect(screen.queryByText('Vlad Vankov')).not.toBeInTheDocument();
  });

  test('Click the button "Reviews", retern name "Vlad Vankov"', () => {

    render(
      <Provider store={storege}>
        <BrowserRouter>
          <DescriptionFilm />
        </BrowserRouter>
      </Provider>
    );

    fireEvent(screen.getByText('Reviews'),
      new MouseEvent('click', {
        bubbles: true,
        cancelable: true,
      }));
    expect(screen.getByText('Vlad Vankov')).toBeInTheDocument();
  });
});
