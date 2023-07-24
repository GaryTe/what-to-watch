import {PropsWithChildren} from 'react';
import {Link, useNavigate} from 'react-router-dom';
import { Path } from '../../const/const';
import { useAppSelector, useAppDispatch } from '../../hooks/use-store/use-store';
import { status, dataUser } from '../../store/selectors/data-authorization/selectors';
import { deleteAuthorization } from '../../store/api-actions/api-actions';

type HeaderProps = PropsWithChildren

function Header({children}: HeaderProps): JSX.Element {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const statusAuthorization = useAppSelector(status);
  const user = useAppSelector(dataUser);

  const exitAuthorization = () => {
    dispatch(deleteAuthorization());
    navigate(Path.Main);
  };

  return(
    <header className="page-header film-card__head">
      <div className="logo">
        <Link className="logo__link" to={Path.Main}>
          <span className="logo__letter logo__letter--1">W</span>
          <span className="logo__letter logo__letter--2">T</span>
          <span className="logo__letter logo__letter--3">W</span>
        </Link>
      </div>

      {children}
      <ul className="user-block">
        <li className="user-block__item">
          <div className="user-block__avatar">
            <img
              src={user?.avatarUrl ? user?.avatarUrl : 'img/avatar.jpg'}
              alt="User avatar"
              width="63"
              height="63"
              onClick={() => navigate(Path.Mylist)}
            />
          </div>
        </li>
        <li className="user-block__item">
          { statusAuthorization ?
            <a className="user-block__link" href="#todo" onClick={exitAuthorization}>Sign out</a>
            :
            <Link className="user-block__link" to={Path.Login}>Sign In</Link> }
        </li>
      </ul>
    </header>
  );
}

export default Header;
