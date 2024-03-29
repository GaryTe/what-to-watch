import { getPromoFilm } from './get-promo-film';
import {
  fetchDataPromoFilm,
  addFilmToWatch
} from '../../api-actions/api-actions';

describe('Test function "getPromoFilm"', () => {

  const state = { promoFilm: null };

  const testingData = {
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
  };

  test('Testing function "fetchDataPromoFilm" execution result "testingData"', () => {
    expect(getPromoFilm.reducer(state, {type: fetchDataPromoFilm.fulfilled.type, payload: testingData}))
      .toEqual({promoFilm: testingData});
  });

  test('Testing function "addFilmToWatch" execution result "testingData"', () => {
    const changedState = getPromoFilm.reducer(state, {type: fetchDataPromoFilm.fulfilled.type, payload: testingData});

    expect(getPromoFilm.reducer(changedState, {type: addFilmToWatch.fulfilled.type, payload: testingData}))
      .toEqual({promoFilm: testingData});
  });
});
