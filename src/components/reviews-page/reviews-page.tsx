import {AsyncThunk} from '@reduxjs/toolkit';
import {AxiosInstance} from 'axios';
import { useAppSelector } from '../../hooks/use-store/use-store';
import { useRequestToServer } from '../../hooks/use-request-to-server/use-request-to-server';
import { dataComments } from '../../store/selectors/data-comments/selectors';
import { fetchDataComments } from '../../store/api-actions/api-actions';
import { Comments } from '../../types/types-response/types-response';
import { gettingTranslatedDate } from '../../util/util';

type FetchDataComments = AsyncThunk<Comments, number, {
  extra: AxiosInstance;
}>

type ReviewsPageProps = {
  filmId: number;
}

function ReviewsPage({filmId}: ReviewsPageProps): JSX.Element {
  useRequestToServer<FetchDataComments, number>(fetchDataComments, filmId);
  const comments = useAppSelector(dataComments);

  return(
    <div className="film-card__reviews film-card__row">
      <div className="film-card__reviews-col">
        {comments && comments.map((comment) =>
          (
            <div key={comment.id} className="review">
              <blockquote className="review__quote">
                <p className="review__text">{comment.comment}</p>

                <footer className="review__details">
                  <cite className="review__author">{comment.user.name}</cite>
                  <time className="review__date" dateTime="2016-12-24">{gettingTranslatedDate(comment.date)}</time>
                </footer>
              </blockquote>

              <div className="review__rating">{comment.rating}</div>
            </div>
          ))}
      </div>
    </div>
  );
}

export default ReviewsPage;
