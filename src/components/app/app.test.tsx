import App from './app';
import {configureMockStore} from '@jedmao/redux-mock-store';
import thunk, { ThunkDispatch } from 'redux-thunk';
import {Action} from '@reduxjs/toolkit';
import { createAPI } from '../../server/api/api';
import {Provider} from 'react-redux';
import {render, screen} from '@testing-library/react';


type DataFilm = {
  id: number;
  previewImage: string;
  name: string;
};

type State = {
  LOGIN: {statusAuthorization: boolean};
  FAVORITE: {listMovies: Array<DataFilm>};
}


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


const api = createAPI();
const middlewares = [thunk.withExtraArgument(api)];
const mockStore = configureMockStore<
State,
Action<string>,
ThunkDispatch<State, typeof api, Action>
>(middlewares);

const store = mockStore({
  LOGIN: {statusAuthorization: true},
  FAVORITE: {listMovies: [ferstDataFilm, secondDataFilm]}
});


const fakeApp = (
  <Provider store={store}>
    <App />
  </Provider>
);


jest.mock('../header/header', () =>
  function MockHeader() {
    return (
      <div data-testid="mockHeader">
      Заголовок!!!
      </div>
    );
  }
);

describe('Application Routing', () => {
  test('should render "MyList" when user navigate to "/mylist"', () => {
    window.history.replaceState(
      {},
      '',
      '/mylist'
    );
    render(fakeApp);

    expect(screen.getByText('Catalog')).toBeInTheDocument();
    expect(screen.getByText('Заголовок!!!')).toBeInTheDocument();
    expect(screen.getByAltText('The Grand Budapest Hotel')).toBeInTheDocument();
  });

  test('should render "SignIn" when user navigate to "/login"', () => {
    window.history.replaceState(
      {},
      '',
      '/login'
    );
    render(fakeApp);

    expect(screen.getByRole('button',{name: 'Sign in'})).toBeInTheDocument();
    expect(screen.getByLabelText('Email address', {selector: 'input'})).toBeInTheDocument();
    expect(screen.getByLabelText('Password', {selector: 'input'})).toBeInTheDocument();
  });

  test('should render "Player" when user navigate to "/player/2"', () => {
    window.history.replaceState(
      {},
      '',
      '/player/2'
    );
    render(fakeApp);

    expect(screen.getByRole('button',{name: 'Exit'})).toBeInTheDocument();
    expect(screen.getByRole('Play')).toBeInTheDocument();
    expect(screen.getByRole(/Full/)).toBeInTheDocument();
  });
});
