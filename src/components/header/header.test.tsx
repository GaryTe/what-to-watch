import Header from './header';
import App from '../app/app';
import {Provider} from 'react-redux';
import {Action} from '@reduxjs/toolkit';
import {BrowserRouter} from 'react-router-dom';
import { configureMockStore } from '@jedmao/redux-mock-store';
import thunk, { ThunkDispatch } from 'redux-thunk';
import { createAPI } from '../../server/api/api';
import {render, screen, fireEvent} from '@testing-library/react';
import { Path } from '../../const/const';


type DataFilm = {
  id: number;
  previewImage: string;
  name: string;
};

type State = {
  LOGIN: {
    statusAuthorization: boolean;
    dataUser: null;
  };
  FAVORITE: {listMovies: Array<DataFilm>};
}

const api = createAPI();
const middlewares = [thunk.withExtraArgument(api)];

const mockStore = configureMockStore<
  State,
  Action<string>,
  ThunkDispatch<State, typeof api, Action>
>(middlewares);

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

const store = mockStore({
  LOGIN: {
    statusAuthorization: true,
    dataUser: null,
  },
  FAVORITE: {listMovies: [ferstDataFilm, secondDataFilm]}
});

describe('Test component "Header"', () => {
  test('should render correctly page "Header"', () => {
    render(
      <Provider store={store}>
        <BrowserRouter>
          <Header/>
        </BrowserRouter>
      </Provider>
    );

    expect(screen.getByAltText('User avatar')).toBeInTheDocument();
    expect(screen.getByText('Sign out')).toBeInTheDocument();
    expect(screen.queryByText('Sign In')).not.toBeInTheDocument();
  });
  test(`Click on the button component "Header",
  should render page "MyList" if statusAuthorization = true`,
  () => {
    render(
      <Provider store={store}>
        <BrowserRouter>
          <Header/>
        </BrowserRouter>
      </Provider>
    );

    document.addEventListener('click', () => window.history.replaceState(
      {},
      '',
      Path.Mylist
    ));

    fireEvent(screen.getByAltText('User avatar'),
      new Event('click',{
        bubbles: true,
        cancelable: true
      })
    );

    render(
      <Provider store={store}>
        <App />
      </Provider>
    );

    expect(screen.getByText('The Grand Budapest Hotel')).toBeInTheDocument();
    expect(screen.getByText('Aviator')).toBeInTheDocument();
  });
});
