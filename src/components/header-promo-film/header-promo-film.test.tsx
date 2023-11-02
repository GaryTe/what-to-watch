import HeaderPromoFilm from './header-promo-film';
import App from '../app/app';
import {Provider} from 'react-redux';
import {BrowserRouter} from 'react-router-dom';
import {configureMockStore} from '@jedmao/redux-mock-store';
import thunk from 'redux-thunk';
import {render, screen, fireEvent} from '@testing-library/react';
import { PromoFilm } from '../../types/types-response/types-response';
import { Path } from '../../const/const';


jest.mock('../button-my-list/button-my-list', () =>
  function ButtonMyList(): JSX.Element {
    return(
      <div>
    ButtonMyList
      </div>
    );
  });

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);
const store = mockStore();

const promoFilm = {
  id: 1,
  name: 'The Grand Budapest Hotel',
  posterImage: 'img/the-grand-budapest-hotel-poster.jpg',
  previewImage: 'img/the-grand-budapest-hotel.jpg',
  backgroundImage: 'img/the-grand-budapest-hotel-bg.jpg',
  backgroundColor: '#ffffff',
  videoLink: 'https://some-link',
  previewVideoLink: 'https://some-link',
  description: 'In the 1930s, the Grand Budapest Hotel is a popular European ski resort, presided over by concierge Gustave H. (Ralph Fiennes). Zero, a junior lobby boy, becomes Gustave\'s friend and protege.',
  rating: 8.9,
  scoresCount: 240,
  director: 'Wes Anderson',
  starring: [
    'Bill Murray'
  ],
  runTime: 99,
  genre: 'Comedy',
  released: 2014,
  isFavorite: false
} as PromoFilm;

describe('Test component "HeaderPromoFilm"', () => {
  test('should render correctly page "HeaderPromoFilm"', () => {
    render(
      <Provider store={store}>
        <BrowserRouter>
          <HeaderPromoFilm dataHeaderPromoFilm={promoFilm}/>
        </BrowserRouter>
      </Provider>
    );

    expect(screen.getByAltText('The Grand Budapest Hotel')).toBeInTheDocument();
    expect(screen.getByRole('button')).toBeInTheDocument();
    expect(screen.getByText('ButtonMyList')).toBeInTheDocument();
  });
  test(`Click on the button component "HeaderPromoFilm",
  should render page "Player".`, () => {
    render(
      <Provider store={store}>
        <BrowserRouter>
          <HeaderPromoFilm dataHeaderPromoFilm={promoFilm}/>
        </BrowserRouter>
      </Provider>
    );

    document.addEventListener('click', () => window.history.replaceState(
      {},
      '',
      `/${Path.Player}${1}`
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

    expect(screen.getByRole('Play')).toBeInTheDocument();
    expect(screen.getByRole(/Full/)).toBeInTheDocument();
  });
});
