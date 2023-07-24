import {useNavigate} from 'react-router-dom';
import { useAppSelector } from '../../hooks/use-store/use-store';
import { status } from '../../store/selectors/data-authorization/selectors';
import { Path } from '../../const/const';

type ButtonAddReviewProps = {
  id: number;
}

function ButtonAddReview({id}: ButtonAddReviewProps): JSX.Element {
  const navigate = useNavigate();
  const statusAuthorization = useAppSelector(status);

  const chengePath = () => {
    if(statusAuthorization) {
      navigate(`/${Path.Film}${id}${Path.Review}`);
    } else {
      navigate(Path.Login, {state: `/${Path.Film}${id}${Path.Review}`});
    }
  };

  return(
    <button
      className="btn film-card__button"
      onClick={chengePath}
    >
      Add review
    </button>
  );
}

export default ButtonAddReview;
