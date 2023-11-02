import { getSimilaListFilm } from './get-simila-films';
import { fetchDataSimilaFilms } from '../../api-actions/api-actions';

describe('Test function "getSimilaListFilm"', () => {

  const state = { listSimilaFilm: null };

  const getTestingDataFilm = () => ({
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
  });

  const testingData = Array.from({length: 6}, getTestingDataFilm);

  test('Testing function "fetchDataSimilaFilms" execution result "{listSimilaFilm: Array<Object>}"', () => {
    expect(getSimilaListFilm.reducer(state, {type: fetchDataSimilaFilms.fulfilled.type, payload: testingData}))
      .toEqual({listSimilaFilm: testingData.slice(0,4)});
  });
});
