import ButtonMyList from './button-my-list';
import App from '../app/app';
import { Path } from '../../const/const';
import {Provider} from 'react-redux';
import {BrowserRouter} from 'react-router-dom';
import {configureMockStore} from '@jedmao/redux-mock-store';
import thunk, { ThunkDispatch } from 'redux-thunk';
import {Action} from '@reduxjs/toolkit';
import { createAPI } from '../../server/api/api';
import {render, screen, fireEvent} from '@testing-library/react';
import { addFilmToWatch } from '../../store/api-actions/api-actions';


type State = {
  LOGIN: {statusAuthorization: boolean};
}

const api = createAPI();
const middlewares = [thunk.withExtraArgument(api)];

const mockStore = configureMockStore<
  State,
  Action<string>,
  ThunkDispatch<State, typeof api, Action>
>(middlewares);

const status = {
  LOGIN: {statusAuthorization: false}
};

describe('Test component "ButtonMyList"', () => {
  test('should render component "ButtonMyList"', () => {
    const store = mockStore(status);

    render(
      <Provider store={store}>
        <BrowserRouter>
          <ButtonMyList id={1} rating={3} isFavorite={false} path={`/${Path.Film}${1}${Path.Review}`}/>
        </BrowserRouter>
      </Provider>
    );

    expect(screen.getByRole('button')).toBeInTheDocument();
  });
  test(`Click on the button component "ButtonMyList",
  should render page "SignIn" if statusAuthorization = false"`, () => {
    const store = mockStore(status);

    render(
      <Provider store={store}>
        <BrowserRouter>
          <ButtonMyList id={1} rating={3} isFavorite={false} path={`/${Path.Film}${1}${Path.Review}`}/>
        </BrowserRouter>
      </Provider>
    );

    document.addEventListener('click', () => window.history.replaceState(
      {},
      '',
      '/login'
    ));

    fireEvent(screen.getByRole('button'),
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

    expect(screen.getByLabelText('Email address', {selector: 'input'})).toBeInTheDocument();
    expect(screen.getByLabelText('Password', {selector: 'input'})).toBeInTheDocument();
  });
  test(`Click on the button component "ButtonMyList",
  returns action if statusAuthorization = true`, () => {
    const store = mockStore(status);

    render(
      <Provider store={store}>
        <BrowserRouter>
          <ButtonMyList id={1} rating={3} isFavorite={false} path={`/${Path.Film}${1}${Path.Review}`}/>
        </BrowserRouter>
      </Provider>
    );

    document.addEventListener('click', () => store.dispatch({type: 'addFilmToWatch'}));

    fireEvent(screen.getByRole('button'),
      new Event('click',{
        bubbles: true,
        cancelable: true
      })
    );

    const actions = store.getActions()[0];
    expect(actions.type).toBe('addFilmToWatch');
  });
});
