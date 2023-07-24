import {Fragment, useState, useRef, useEffect} from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../../components/header/header';
import { useAppSelector, useAppDispatch } from '../../hooks/use-store/use-store';
import { dataFilm } from '../../store/selectors/data-description-film/selectors';
import { returnListNumber, chengeNoActive } from '../../util/util';
import { postDataForAddNewComments } from '../../store/api-actions/api-actions';
import { DataForAddNewComment } from '../../types/request/request';
import { Path } from '../../const/const';

function AddReview(): JSX.Element {
  const [notActive, setNotActive] = useState<boolean>(true);
  const [number, setNumber] = useState<number>(0);
  const refReviewText = useRef<HTMLTextAreaElement | null>(null);
  const [isLockForm, setIsLockForm] = useState<boolean>(false);

  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const detailsFilm = useAppSelector(dataFilm);

  useEffect(() => {
    if(number === 0) {return;}

    let isMounted = true;

    if (isMounted) {
      chengeNoActive(number, refReviewText.current?.value, setNotActive);
    }

    return () => {
      isMounted = false;
    };
  }, [number]);

  const postDataUser = async (dataUser: DataForAddNewComment) => {
    try {
      await dispatch(postDataForAddNewComments(dataUser)).unwrap();
      detailsFilm && navigate(`/${Path.Film}${detailsFilm.id}`);
    } catch (error) {
      setIsLockForm(false);
      throw new Error ('Данные не отправлены, для формерования отзова !!!');
    }
  };

  const creatingUserData = () =>{
    if(refReviewText.current && detailsFilm) {
      const dataUser = {
        comment: refReviewText.current.value,
        rating: number,
        filmId: detailsFilm.id
      };

      setIsLockForm(true);
      postDataUser(dataUser);
    }
  };

  return(
    <section className="film-card film-card--full">
      <div className="film-card__header">
        <div className="film-card__bg">
          <img src={detailsFilm?.previewImage} alt={detailsFilm?.name} />
        </div>

        <h1 className="visually-hidden">WTW</h1>

        <Header />

        <div className="film-card__poster film-card__poster--small">
          <img src={detailsFilm?.posterImage} alt={detailsFilm?.name} width="218" height="327" />
        </div>
      </div>

      <div className="add-review">
        <form
          action="#"
          className="add-review__form"
          onSubmit={(evt) => {
            evt.preventDefault();
            creatingUserData();
          }}
        >
          <fieldset style={{borderStyle: 'none'}} disabled={isLockForm}>
            <p style={{color: 'red'}}>Поле обязательно для заполнения.</p>
            <div className="rating">
              <div className="rating__stars">
                {returnListNumber(9).map((id, index) => {
                  const rating = 10 - index;

                  return (
                    <Fragment key={id}>
                      <input
                        className="rating__input"
                        id={`star-${rating}`}
                        type="radio"
                        value={rating}
                        checked={number === rating}
                        onChange={() => {
                          setNumber(rating);
                        }}
                      >
                      </input>
                      <label
                        className="rating__label"
                        htmlFor={`star-${rating}`}
                      >
                      Rating{rating}
                      </label>
                    </Fragment>
                  );
                }
                )}
              </div>
            </div>
            <p style={{color: 'red'}}>Поле обязательно для заполнения. Длина текста больше 50 символов.</p>
            <div className="add-review__text">
              <textarea
                className="add-review__textarea"
                id="review-text"
                placeholder="Review text"
                ref={refReviewText}
                onChange={() =>
                  chengeNoActive(number, refReviewText.current?.value, setNotActive)}
              >
              </textarea>
              <div className="add-review__submit">
                <p style={{color: 'red'}}>Кнопка {notActive ? 'заблокирована.' : 'разблокирована.'}</p>
                <button className="add-review__btn" type="submit" disabled={notActive}>Post</button>
              </div>

            </div>
          </fieldset>
        </form>
      </div>
    </section>
  );
}

export default AddReview;
