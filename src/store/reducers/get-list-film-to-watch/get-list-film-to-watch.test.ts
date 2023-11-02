import { getListFilmToWatch } from './get-list-film-to-watch';
import { fetchListFilmToWatch } from '../../api-actions/api-actions';

describe('Test function "getListFilmToWatch"', () => {

  const state = { listMovies: null };

  const testingData = [{
    comment: 'Discerning travellers and Wes Anderson fans will luxuriate in the glorious Mittel-European kitsch of one of the director\'s funniest and most exquisitely designed movies in years.',
    date: 'Sun Oct 22 2023 10:24:47 GMT+0300 (Москва, стандартное время)',
    id: 1,
    rating: 8.9,
    user: {
      id: 4,
      name: 'Kate Muir'
    }}];

  test('Testing function "fetchListFilmToWatch" execution result "testingData"', () => {
    expect(getListFilmToWatch.reducer(state, {type: fetchListFilmToWatch.fulfilled.type, payload: testingData}))
      .toEqual({listMovies: testingData});
  });
});
