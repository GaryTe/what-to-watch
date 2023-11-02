import ListMovie from './list-movie';
import {Provider} from 'react-redux';
import {BrowserRouter} from 'react-router-dom';
import {Action} from '@reduxjs/toolkit';
import { configureMockStore } from '@jedmao/redux-mock-store';
import thunk, { ThunkDispatch } from 'redux-thunk';
import { createAPI } from '../../server/api/api';
import {render, screen} from '@testing-library/react';
import { fetchDataListFilm } from '../../store/api-actions/api-actions';
import { dataListFilm } from '../../store/selectors/data-list-film/selectors';


type DataFilm = {
  id: number;
  previewImage: string;
  name: string;
  previewVideoLink: string;
};

type State = {
  LIST_FILM: {
    dataFilm: Array<DataFilm>;
  };
};

const api = createAPI();
const middlewares = [thunk.withExtraArgument(api)];

const mockStore = configureMockStore<
  State,
  Action<string>,
  ThunkDispatch<State, typeof api, Action>
>(middlewares);

const state = mockStore({
  LIST_FILM: {
    dataFilm: [
      {
        id: 1,
        previewImage: 'img/the-grand-budapest-hotel.jpg',
        name: 'The Grand Budapest Hotel',
        previewVideoLink: 'https://some-link'
      },
      {
        id: 2,
        previewImage: 'img/the-grand-budapest-hotel.jpg',
        name: 'Hotel',
        previewVideoLink: 'https://some-link'
      }
    ]
  }
});

describe('Test component "ListMovie"', () => {
  test('should render correctly component "ListMovie"', () => {
    render(
      <Provider store={state}>
        <BrowserRouter>
          <ListMovie action={fetchDataListFilm} getDataFilms={dataListFilm}/>
        </BrowserRouter>
      </Provider>
    );

    expect(screen.getByAltText('Hotel')).toBeInTheDocument();
    expect(screen.queryByRole('video')).not.toBeInTheDocument();
  });
});
