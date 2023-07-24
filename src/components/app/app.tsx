import {BrowserRouter, Routes, Route} from 'react-router-dom';
import MainPage from '../../pages/main-page/main-page';
import DescriptionFilm from '../../pages/description-film/description-film';
import SignIn from '../../pages/sign-in/sign-in';
import PrivateRoute from '../private-route/private-route';
import MyList from '../../pages/my-list/my-list';
import AddReview from '../../pages/add-review/add-review';
import ScreenError from '../screen-error/screen-error';
import Player from '../../pages/player/player';
import { Path } from '../../const/const';

function App(): JSX.Element {

  return(
    <BrowserRouter>
      <Routes>
        <Route path={Path.Main}>
          <Route index element={<MainPage />} />
          <Route path={`${Path.Film}:id`} element={<DescriptionFilm />} />
          <Route path={`${Path.Film}:id${Path.Review}`} element={<AddReview />} />
          <Route path={`${Path.Player}:id`} element={<Player />} />
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
        <Route path='*' element={<ScreenError />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
