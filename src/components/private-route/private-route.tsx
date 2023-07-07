import {Navigate} from 'react-router-dom';
import { useAppSelector } from '../../hooks/use-store/use-store';
import { status } from '../../store/selectors/data-authorization/selectors';
import { Path } from '../../const/const';

type PrivateRouteProps = {
  children: JSX.Element;
}

function PrivateRoute({children}: PrivateRouteProps): JSX.Element {
  const statusAuthorization = useAppSelector(status);

  return(
    statusAuthorization
      ? children
      : <Navigate to={Path.Login} state={Path.Mylist}/>
  );
}

export default PrivateRoute;
