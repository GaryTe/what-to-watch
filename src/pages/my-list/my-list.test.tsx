import { Provider } from 'react-redux';
import { configureMockStore } from '@jedmao/redux-mock-store';
import { Action } from '@reduxjs/toolkit';
import thunk, { ThunkDispatch } from 'redux-thunk';
import { createAPI } from '../../server/api/api';
import { BrowserRouter } from 'react-router-dom';
import {render, screen} from '@testing-library/react';
import MyList from './my-list';

type DataFilm = {
  id: number;
  previewImage: string;
  name: string;
};

const ferstDataFilm = {
  id: 1,
  previewImage: 'img/the-grand-budapest-hotel.jpg',
  name: 'The Grand Budapest Hotel'
};

const secondDataFilm = {
  id: 2,
  previewImage: 'img/the-grand-budapest-hotel.jpg',
  name: 'Aviator'
};


type KeyLogin = {
  statusAuthorization: boolean;
  dataUser: null;
}

type Storage = {
  FAVORITE: {
    listMovies: Array<DataFilm>;
  };
  LOGIN:KeyLogin;
};


const api = createAPI();

const middlewares = [thunk.withExtraArgument(api)];

const mockStore = configureMockStore<
Storage,
Action<string>,
ThunkDispatch<Storage, typeof api, Action>
>(middlewares);

const store = mockStore({
  FAVORITE: {
    listMovies: [ferstDataFilm, secondDataFilm]},
  LOGIN: {
    statusAuthorization: true,
    dataUser: null
  }
});

describe('Test page "MyList"', () => {

  test('should render correctly page "MyList"', () => {
    render(
      <Provider store={store}>
        <BrowserRouter>
          <MyList />
        </BrowserRouter>
      </Provider>
    );

    expect(screen.getByText('The Grand Budapest Hotel')).toBeInTheDocument();
    expect(screen.getByText('Aviator')).toBeInTheDocument();
  });
});
