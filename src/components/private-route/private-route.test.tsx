import PrivateRoute from './private-route';
import {Provider} from 'react-redux';
import {
  BrowserRouter,
  Routes,
  Route
} from 'react-router-dom';
import {Action} from '@reduxjs/toolkit';
import { configureMockStore } from '@jedmao/redux-mock-store';
import thunk, { ThunkDispatch } from 'redux-thunk';
import { createAPI } from '../../server/api/api';
import {render, screen} from '@testing-library/react';
import MyList from '../../pages/my-list/my-list';
import SignIn from '../../pages/sign-in/sign-in';
import { Path } from '../../const/const';


jest.mock('../../pages/my-list/my-list', () => function mockMyList (): JSX.Element {
  return(
    <div>
        MyList
    </div>
  );
});

jest.mock('../../pages/sign-in/sign-in', () => function mockSignIn(): JSX.Element {
  return(
    <div>
        SignIn
    </div>
  );
});

type State = {
  LOGIN: {
    statusAuthorization: boolean;
  };
};

const api = createAPI();
const middlewares = [thunk.withExtraArgument(api)];

const mockStore = configureMockStore<
  State,
  Action,
  ThunkDispatch<State, typeof api, Action>
>(middlewares);

describe('Test render component "PrivateRoute"', () => {
  test('should render mockPage "SignIn"', () => {
    const store = mockStore({
      LOGIN: {
        statusAuthorization: false
      }
    });

    window.history.replaceState(
      {},
      '',
      Path.Mylist
    );

    render(
      <Provider store={store}>
        <BrowserRouter>
          <Routes>
            <Route path={Path.Login} element={<SignIn />} />
            <Route
              path={Path.Mylist}
              element={
                <PrivateRoute>
                  <MyList />
                </PrivateRoute>
              }
            />
          </Routes>
        </BrowserRouter>
      </Provider>
    );


    expect(screen.getByText('SignIn')).toBeInTheDocument();
    expect(screen.queryByText('MyList')).not.toBeInTheDocument();
  });
  test('should render mockPage "Mylist"', () => {
    const store = mockStore({
      LOGIN: {
        statusAuthorization: true
      }
    });

    window.history.replaceState(
      {},
      '',
      Path.Mylist
    );

    render(
      <Provider store={store}>
        <BrowserRouter>
          <Routes>
            <Route path={Path.Login} element={<SignIn />} />
            <Route
              path={Path.Mylist}
              element={
                <PrivateRoute>
                  <MyList />
                </PrivateRoute>
              }
            />
          </Routes>
        </BrowserRouter>
      </Provider>
    );

    expect(screen.getByText('MyList')).toBeInTheDocument();
    expect(screen.queryByText('SignIn')).not.toBeInTheDocument();
  });
});
