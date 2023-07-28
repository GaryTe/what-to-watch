import {useRef, useState} from 'react';
import {Link, useNavigate, useLocation} from 'react-router-dom';
import {toast} from 'react-toastify';
import { dataUser } from '../../types/request/request';
import { postAuthorizatioDataUser } from '../../store/api-actions/api-actions';
import { useAppDispatch } from '../../hooks/use-store/use-store';
import { Path } from '../../const/const';

type Location = {
  state: string | null;
  key: string;
}

function SignIn(): JSX.Element {
  const refEmail = useRef<HTMLInputElement | null>(null);
  const refPassword = useRef<HTMLInputElement | null>(null);
  const [validation, setValidation] = useState({
    email: 1,
    password: 1
  });
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const {state} = useLocation() as Location;

  const goToMainPage = async (data: dataUser) => {
    try {
      await dispatch(postAuthorizatioDataUser(data));
      const path = state ? state : Path.Main;
      navigate(path);
    } catch (error) {
      throw new Error ('Даные для авторизации не получины на сервере.');
    }
  };

  const dataUsreForAuthorization = () => {
    if(refEmail.current?.value && refPassword.current?.value && validation.email && validation.password) {
      const dataForAuthorization: dataUser = {
        email: refEmail.current.value,
        password: refPassword.current.value
      };

      goToMainPage(dataForAuthorization);
    } else {
      toast.error('Check the correctness of the entered data.',
        {
          theme: 'colored',
          autoClose: 4000
        }
      );
    }
  };

  return(
    <div className="user-page">
      <header className="page-header user-page__head">
        <div className="logo">
          <Link to={Path.Main} className="logo__link">
            <span className="logo__letter logo__letter--1">W</span>
            <span className="logo__letter logo__letter--2">T</span>
            <span className="logo__letter logo__letter--3">W</span>
          </Link>
        </div>

        <h1 className="page-title user-page__title">Sign in</h1>
      </header>

      <div className="sign-in user-page__content">
        <form
          action="#"
          className="sign-in__form"
          onSubmit={(evt) => {
            evt.preventDefault();
            dataUsreForAuthorization();
          }}
        >
          <div className="sign-in__fields">
            <div className="sign-in__field">
              <input
                className="sign-in__input"
                name='user-email'
                type="email"
                placeholder="email"
                id="user-email"
                autoComplete="off"
                onChange={(evt) => {
                  if(evt.target.value && !validation.email) {
                    setValidation({...validation, email: 1});
                  }
                  if(evt.target.value.length === 1) {
                    setValidation({...validation, email: 1});
                  }
                  if(evt.target.value.length === 0) {
                    setValidation({...validation, email: 0});
                  }
                }}
                ref={refEmail}
              />
              <label className="sign-in__label visually-hidden" htmlFor="user-email">Email address</label>
              {!validation.email ? <p className="custom-input__error">В видите корректный email</p> : <p ></p>}
            </div>
            <div className="sign-in__field">
              <input
                className="sign-in__input"
                name='user-password'
                type="password"
                placeholder="password"
                id="user-password"
                autoComplete="off"
                onChange={(evt) => {
                  if(/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{2,}$/.test(evt.target.value)) {
                    setValidation({...validation, password: 1});
                  } else {
                    setValidation({...validation, password: 0});
                  }
                }}
                ref={refPassword}
              />
              <label className="sign-in__label visually-hidden" htmlFor="user-password">Password</label>
              {!validation.password ? <p className="custom-input__error">Параль состоит минимум из одной буквы и цифры.</p> : <p></p>}
            </div>
          </div>
          <div className="sign-in__submit">
            <button className="sign-in__btn" type="submit">Sign in</button>
          </div>
        </form>
      </div>

      <footer className="page-footer">
        <div className="logo">
          <a href="main.html" className="logo__link logo__link--light">
            <span className="logo__letter logo__letter--1">W</span>
            <span className="logo__letter logo__letter--2">T</span>
            <span className="logo__letter logo__letter--3">W</span>
          </a>
        </div>

        <div className="copyright">
          <p>© 2019 What to watch Ltd.</p>
        </div>
      </footer>
    </div>
  );
}

export default SignIn;
