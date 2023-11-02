import { getListFilm } from './get-list-film';
import { fetchDataListFilm } from '../../api-actions/api-actions';
import {
  filteringListFilm,
  showListFilm
} from './get-list-film';
import { Genre } from '../../../const/const';

describe('Test function "getListFilm"', () => {

  const state = {
    listFilm: null,
    sortListFilm: null,
    dataFilm: null,
    counter: 8,
    filter: 'All genres'
  };

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

  const testingData = Array.from({length: 16}, getTestingDataFilm);

  test(`Testing function "fetchDataListFilm" execution result "{
    listFilm: Array<Object>,
    sortListFilm: Array<Object>,
    dataFilm: Array<Object>,
    counter: 8,
    filter: 'All genres'
  }"`,
  () => {
    expect(getListFilm.reducer(state, {type: fetchDataListFilm.fulfilled.type, payload: testingData}))
      .toEqual({
        listFilm: testingData,
        sortListFilm: testingData,
        dataFilm: testingData.slice(0,8),
        counter: 8,
        filter: 'All genres'
      });
  });

  test(`Testing function "filteringListFilm" execution result "{
    listFilm: Array<Object>,
    sortListFilm: Array<Object>,
    dataFilm: Array<Object>,
    counter: 8,
    filter: 'Comedies'
  }"`,
  () => {
    const changedState = getListFilm.reducer(state, {type: fetchDataListFilm.fulfilled.type, payload: testingData});

    expect(getListFilm.reducer(changedState, filteringListFilm(Genre.Comedies)))
      .toEqual({
        listFilm: testingData,
        sortListFilm: testingData,
        dataFilm: testingData.slice(0,8),
        counter: 8,
        filter: 'Comedies'
      });
  });

  test(`Testing function "showListFilm" execution result "{
    listFilm: Array<Object>,
    sortListFilm: Array<Object>,
    dataFilm: Array<Object>,
    counter: 16,
    filter: 'Comedies'
  }"`,
  () => {
    const firstChangedState = getListFilm.reducer(state, {type: fetchDataListFilm.fulfilled.type, payload: testingData});
    const secondChangedState = getListFilm.reducer(firstChangedState, filteringListFilm(Genre.Comedies));

    expect(getListFilm.reducer(secondChangedState, showListFilm()))
      .toEqual({
        listFilm: testingData,
        sortListFilm: testingData,
        dataFilm: testingData.slice(0,16),
        counter: 16,
        filter: 'Comedies'
      });
  });
});
