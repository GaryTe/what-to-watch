import { getDataAuthorization } from './get-data-authorization';
import {
  postAuthorizatioDataUser,
  deleteAuthorization,
  checkAuthorization
} from '../../api-actions/api-actions';

describe('Test function "getDataAuthorization"', () => {

  const state = { statusAuthorization: false, dataUser: null };

  const testingData = {
    avatarUrl: 'img/1.png',
    email: 'Oliver.conner@gmail.com',
    id: 1,
    name: 'Oliver.conner',
    token: 'T2xpdmVyLmNvbm5lckBnbWFpbC5jb20='
  };

  test('Testing function "postAuthorizatioDataUser" execution result "testingData"', () => {
    expect(getDataAuthorization.reducer(state, {type: postAuthorizatioDataUser.fulfilled.type, payload: testingData}))
      .toEqual({statusAuthorization: true, dataUser: testingData});
  });

  test('Testing function "deleteAuthorization" execution result "state"', () => {
    expect(getDataAuthorization.reducer(state, {type: deleteAuthorization.fulfilled.type}))
      .toEqual(state);
  });

  test('Testing function "checkAuthorization" execution result "testingData"', () => {
    expect(getDataAuthorization.reducer(state, {type: checkAuthorization.fulfilled.type, payload: testingData}))
      .toEqual({statusAuthorization: true, dataUser: testingData});
  });
});
