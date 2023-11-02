import {
  filterFilmsByGenre,
  getScoreFilm,
  gettingTranslatedDate,
  returnListNumber,
  chengeNoActive,
  translateTime
} from './util';
import {
  Genre,
  ScoreFilm
} from '../const/const';
import { ListFilm } from '../types/types-response/types-response';


describe('General check of utilitarian functions.', () => {

  describe('Test function "filterFilmsByGenre".', () => {
    const filmsList = [{
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
    }] as ListFilm;

    test('Call the function "filterFilmsByGenre" and get an array of objects by genre "Comedy".', () => {
      expect(filterFilmsByGenre(filmsList, Genre.Comedies)).toEqual(filmsList);
    });

    test('Call the function "filterFilmsByGenre" and get an empty object if the genre does not matcn.', () => {
      expect(filterFilmsByGenre(filmsList, Genre.Crime)).toEqual([]);
    });
  });

  describe('Test function "getScoreFilm".', () => {

    test('We pass the function "getScoreFilm" value 5 and resuit of the response "Good".', () => {
      expect(getScoreFilm(5)).toBe(ScoreFilm.Good);
    });

    test('We pass the function "getScoreFilm" value 0 and resuit of the response "Bad".', () => {
      expect(getScoreFilm(0)).toBe(ScoreFilm.Bad);
    });
  });

  describe('Test function "gettingTranslatedDate".', () => {

    test(`We pass the function "gettingTranslatedDate" value in format current date in ISO8601,
    function returns human readable format.`, () => {
      expect(gettingTranslatedDate('Fri Oct 20 2023 13:02:20 GMT+0300 (Москва, стандартное время)')).toBe('October 20, 2023');
    });
  });

  describe('Test function "returnListNumber".', () => {

    test('We pass the function "returnListNumber" value 5 and resuit of response an array of numbers.', () => {
      expect(returnListNumber(5)).toEqual([1,2,3,4,5,6]);
    });
  });

  describe('Test function "chengeNoActive"', () => {
    const review = 'Hi, everyone. I watched this movie, and me lick. I recommend watching this movie.';
    const mockSetNotActive = jest.fn((isBoolean: boolean) => isBoolean);

    test(`We pass the function "chengeNoActive" values: "rating = 2" and "text = more than 50 symbol",
     and resuit of response "false"`, () => {

      chengeNoActive(2, review, mockSetNotActive);
      expect(mockSetNotActive.mock.results[0].value).toBeFalsy();
    });

    test(`We pass the function "chengeNoActive" values: "rating = 0" and "text = more than 50 symbol",
     and resuit of response "true"`, () => {

      chengeNoActive(0, review, mockSetNotActive);
      expect(mockSetNotActive.mock.results[1].value).toBeTruthy();
    });
  });

  describe('Test function "translateTime"', () => {

    test('We pass the function "translateTime" value 120 seconds and resuit of response "-00:2:120"', () => {
      expect(translateTime(120)).toBe('-00:2:120');
    });

    test('We pass the function "translateTime" value 20 seconds and resuit of response "-00:00:20"', () => {
      expect(translateTime(20)).toBe('-00:00:20');
    });

    test('We pass the function "translateTime" value 5400 seconds and resuit of response "-2:90:5400"', () => {
      expect(translateTime(5400)).toBe('-2:90:5400');
    });
  });
});
