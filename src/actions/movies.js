import axios from './../api/axios';

const movieStart = () => ({
  type: 'MOVIE_START'
});

const movieSuccess = (movie) => ({
  type: 'MOVIE_SUCCESS',
  movie
});

const movieFailed = (error) => ({
  type: 'MOVIE_FAIL',
  error
});

export const getMovie = (movieId) => {
  return (dispatch) => {
    dispatch(movieStart());
    
    axios.get(`movies/${movieId}`).then(
      (response) => dispatch(movieSuccess(response.data)),
      (error) => dispatch(movieFailed(error))
    );
  }
};
