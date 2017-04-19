import axios from './../api/axios';

const movieStart = (movieId) => ({
  type: 'MOVIE_START',
  movieId
});

const movieSuccess = (movie) => ({
  type: 'MOVIE_SUCCESS',
  movie
});

const movieFailed = (error) => ({
  type: 'MOVIE_FAIL',
  error
});

const getAllMoviesSuccess = (movies) => ({
  type: 'ALL_MOVIES_SUCCESS',
  movies
});

export const getMovie = (movieId) => {
  return (dispatch) => {
    dispatch(movieStart(movieId));

    axios.get(`movies/${movieId}`).then(
      (response) => dispatch(movieSuccess(response.data)),
      (error) => dispatch(movieFailed(error))
    );
  }
};

export const getAllMovies = (forceReload = false) => {
  return (dispatch, getState) => {
    const state = getState();

    if (!forceReload && state.movies.movies.length) {
      return;
    }

    // TODO implement search mechanism
    // TODO implement isLoading indicator
    axios.get('/movies').then(
      (response) => dispatch(getAllMoviesSuccess(response.data))
    );
  }
};
