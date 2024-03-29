import DatailsPage from './details-page';
import { PromoFilm } from '../../types/types-response/types-response';
import {Provider} from 'react-redux';
import {BrowserRouter} from 'react-router-dom';
import { configureMockStore } from '@jedmao/redux-mock-store';
import thunk from 'redux-thunk';
import {render, screen} from '@testing-library/react';

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

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);
const store = mockStore();

describe('Test component "DatailsPage"', () => {
  test('should render component "DatailsPage"', () => {
    render(
      <Provider store={store}>
        <BrowserRouter>
          <DatailsPage dataDatails={promoFilm}/>
        </BrowserRouter>
      </Provider>
    );

    expect(screen.getByText('Wes Anderson')).toBeInTheDocument();
    expect(screen.getByText('Starring')).toBeInTheDocument();
    expect(screen.getByText('Comedy')).toBeInTheDocument();
    expect(screen.getByText('2014')).toBeInTheDocument();
  });
});
