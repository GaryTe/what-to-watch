import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Path } from '../../const/const';
import './error.css';
import './error-message.css';

function ScreenError (): JSX.Element {
  const navigate = useNavigate();

  const handleErrorClose = () => {
    setTimeout(() => navigate(Path.Main), 2000);
  };

  useEffect (() => {
    let isMounted = true;

    if(isMounted) {
      handleErrorClose();
    }

    return () => {
      isMounted = false;
    };
  }
  );

  return (
    <div className="error">
      <p className="error-message">Page does not exist</p>
    </div>
  );
}

export default ScreenError;
