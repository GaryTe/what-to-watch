import ButtonAddReview from './button-add-review';
import App from '../app/app';
import {configureMockStore} from '@jedmao/redux-mock-store';
import thunk, { ThunkDispatch } from 'redux-thunk';
import {Provider} from 'react-redux';
import {BrowserRouter} from 'react-router-dom';
import {Action} from '@reduxjs/toolkit';
import {render, screen, fireEvent} from '@testing-library/react';
import { createAPI } from '../../server/api/api';


jest.mock('../../components/header/header', () =>
  function MockHeader() {
    return (
      <div data-testid="mockHeader">
      Заголовок!!!
      </div>
    );
  }
);

type DataFilm = {
  id: number;
  previewImage: string;
  name: string;
  posterImage: string;
}

type State = {
  LOGIN: {statusAuthorization: boolean};
  DETAILS_FILM: {
    descriptionFilm: DataFilm;
  };
};

const api = createAPI();
const middlewares = [thunk.withExtraArgument(api)];
const mockStore = configureMockStore<
State,
Action<string>,
ThunkDispatch<State, typeof api, Action>
>(middlewares);

let store = mockStore({
  LOGIN: {statusAuthorization: false},
  DETAILS_FILM: {
    descriptionFilm: {
      id: 1,
      previewImage: 'img/the-grand-budapest-hotel.jpg',
      name: 'The Grand Budapest Hotel',
      posterImage: 'img/the-grand-budapest-hotel-poster.jpg'
    },
  }
});

const fakeApp = (
  <Provider store={store}>
    <App />
  </Provider>
);

describe('Test component "ButtonAddReview"', () => {

  test('should render component "ButtonAddReview"', () => {

    render(
      <Provider store={store}>
        <BrowserRouter>
          <ButtonAddReview id={2}/>
        </BrowserRouter>
      </Provider>
    );

    expect(screen.getByRole('button', {name: 'Add review'})).toBeInTheDocument();
  });

  test(`Click on the button component "ButtonAddReview",
  should render page "SignIn" if statusAuthorization = false`
  , () => {

    render(
      <Provider store={store}>
        <BrowserRouter>
          <ButtonAddReview id={2}/>
        </BrowserRouter>
      </Provider>
    );

    document.addEventListener('click', () => window.history.replaceState(
      {},
      '',
      '/login'
    ));
    const button = screen.getByRole('button', {name: 'Add review'});
    fireEvent(button,
      new Event('click',{
        bubbles: true,
        cancelable: true
      })
    );
    //button.dispatchEvent(event);

    render(fakeApp);

    expect(screen.getByLabelText('Email address', {selector: 'input'})).toBeInTheDocument();
    expect(screen.getByLabelText('Password', {selector: 'input'})).toBeInTheDocument();
  });

  test(`Click on the button component "ButtonAddReview",
  should render page "AddReview" if statusAuthorization = true`
  , () => {
    store = mockStore({
      ...store,
      LOGIN: {statusAuthorization: true},
    });

    render(
      <Provider store={store}>
        <BrowserRouter>
          <ButtonAddReview id={2}/>
        </BrowserRouter>
      </Provider>
    );

    document.addEventListener('click', () => window.history.replaceState(
      {},
      '',
      '/films/2/review'
    ));
    const button = screen.getByRole('button', {name: 'Add review'});
    fireEvent(button,
      new Event('click',{
        bubbles: true,
        cancelable: true
      })
    );
    //button.dispatchEvent(event);

    render(fakeApp);

    const imgElementsList = screen.getAllByAltText('The Grand Budapest Hotel');
    imgElementsList.forEach((element) => expect(element).toBeInTheDocument());

    expect(screen.getByText('Заголовок!!!')).toBeInTheDocument();
    expect(screen.getByText('Кнопка заблокирована.')).toBeInTheDocument();
  });
});
