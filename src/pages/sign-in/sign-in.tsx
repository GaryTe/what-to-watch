import {Link, useNavigate, useLocation} from 'react-router-dom';
import {useForm, SubmitHandler} from 'react-hook-form';
import { dataUser } from '../../types/request/request';
import { postAuthorizatioDataUser } from '../../store/api-actions/api-actions';
import { useAppDispatch } from '../../hooks/use-store/use-store';
import { Path } from '../../const/const';

type Location = {
  state: string | null;
  key: string;
}

type dataRegistration = {
  userEmail: string;
  userPassword: string;
}

function SignIn(): JSX.Element {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const {state} = useLocation() as Location;

  const {register, handleSubmit, formState:{errors}} = useForm<dataRegistration>();

  const goToMainPage = async (data: dataUser) => {
    try {
      await dispatch(postAuthorizatioDataUser(data));
      const path = state ? state : Path.Main;
      navigate(path);
    } catch (error) {
      throw new Error ('Даные для авторизации не получины на сервере.');
    }
  };

  const dataUsreForAuthorization: SubmitHandler<dataRegistration> = (data) => {
    const dataForAuthorization: dataUser = {
      email: data.userEmail,
      password: data.userPassword
    };

    goToMainPage(dataForAuthorization);
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
        <form action="#" className="sign-in__form" onSubmit={handleSubmit(dataUsreForAuthorization)}>
          <div className="sign-in__fields">
            <div className="sign-in__field">
              <input
                className="sign-in__input"
                type="email"
                placeholder="Email address"
                id="user-email"
                {...register('userEmail', { required: 'В видите корректный email'})}
              />
              <label className="sign-in__label visually-hidden" htmlFor="user-email">Email address</label>
              <p className="custom-input__error">{errors.userEmail?.message}</p>
            </div>
            <div className="sign-in__field">
              <input
                className="sign-in__input"
                type="password"
                placeholder="Password"
                id="user-password"
                {...register('userPassword', {required: 'Параль состоит минимум из одной буквы и цифры.', pattern: /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{2,}$/ })}
              />
              <label className="sign-in__label visually-hidden" htmlFor="user-password">Password</label>
              <p className="custom-input__error">{errors.userPassword?.message}</p>
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
