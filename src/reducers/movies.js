const initialState = {
  isLoading: false,
  movies: [],
  error: null,
  displayedMovieId: null
};

export default function(state = initialState, action) {
  switch(action.type) {
    case 'MOVIE_START':
      return {...state, isLoading: true, displayedMovieId: +action.movieId};
    case 'MOVIE_SUCCESS':
      return {
        ...state,
        isLoading: false,
        movies: [...state.movies, action.movie]
      };
    case 'MOVIE_FAIL':
      return {
        ...state,
        isLoading: false,
        error: action.error
      };
    case 'ALL_MOVIES_SUCCESS':
      return {...state, movies: action.movies};
    default:
      return state;
  }
}
