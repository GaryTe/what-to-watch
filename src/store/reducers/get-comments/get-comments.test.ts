import { getComments } from './get-comments';
import { fetchDataComments, postDataForAddNewComments } from '../../api-actions/api-actions';

describe('Test function "getComments"', () => {
  const state = { comments: null};
  const testingData = [{
    comment: 'Discerning travellers and Wes Anderson fans will luxuriate in the glorious Mittel-European kitsch of one of the director\'s funniest and most exquisitely designed movies in years.',
    date: 'Sun Oct 22 2023 10:24:47 GMT+0300 (Москва, стандартное время)',
    id: 1,
    rating: 8.9,
    user: {
      id: 4,
      name: 'Kate Muir'
    }}];

  test('Testing function "fetchDataComments" execution result "testingData"', () => {

    expect(getComments.reducer(state, {type: fetchDataComments.fulfilled.type, payload: testingData}))
      .toEqual({comments: testingData});
  });

  test('Testing function "postDataForAddNewComments" execution result "testingData"', () => {
    expect(getComments.reducer(state, {type: postDataForAddNewComments.fulfilled.type, payload: testingData}))
      .toEqual({comments: testingData});
  });
});
