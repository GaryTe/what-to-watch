import { getDescriptionFilm } from './get-description-film';
import {
  fetchDataWithDetailsFilm,
  addFilmToWatch
} from '../../api-actions/api-actions';

describe('Test function "getDescriptionFilm"', () => {

  const state = { descriptionFilm: null };

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

  test('Testing function "fetchDataWithDetailsFilm" in mode "pending" execution result "state"', () => {
    expect(getDescriptionFilm.reducer(state, {type: fetchDataWithDetailsFilm.pending.type}))
      .toEqual(state);
  });

  test('Testing function "fetchDataWithDetailsFilm" in mode "fulfilled" execution result "testingData"', () => {
    expect(getDescriptionFilm.reducer(state, {type: fetchDataWithDetailsFilm.fulfilled.type, payload: testingData}))
      .toEqual({descriptionFilm: testingData});
  });

  test('Testing function "addFilmToWatch" execution result "testingData"', () => {
    const changedState = getDescriptionFilm.reducer(state, {type: fetchDataWithDetailsFilm.fulfilled.type, payload: testingData});

    expect(getDescriptionFilm.reducer(changedState, {type: addFilmToWatch.fulfilled.type, payload: testingData}))
      .toEqual({descriptionFilm: testingData});
  });
});
