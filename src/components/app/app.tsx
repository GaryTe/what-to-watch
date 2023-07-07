import {BrowserRouter, Routes, Route} from 'react-router-dom';
import MainPage from '../../pages/main-page/main-page';
import DescriptionFilm from '../../pages/description-film/description-film';
import SignIn from '../../pages/sign-in/sign-in';
import PrivateRoute from '../private-route/private-route';
import MyList from '../../pages/my-list/my-list';
import { Path } from '../../const/const';

function App(): JSX.Element {
  return(
    <BrowserRouter>
      <Routes>
        <Route path={Path.Main}>
          <Route index element={<MainPage />} />
          <Route path={Path.Film}>
            <Route path=':id' element={<DescriptionFilm />} />
          </Route>
          <Route path={Path.Login} element={<SignIn />} />
          <Route
            path={Path.Mylist}
            element={
              <PrivateRoute>
                <MyList />
              </PrivateRoute>
            }
          />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
