const initialState = {
  isLoading: false,
  movie: null,
  error: null
}

export default function(state = initialState, action) {
  switch(action.type) {
    case 'MOVIE_START':
      return {
        isLoading: true
      }
    case 'MOVIE_SUCCESS':
      return {
        isLoading: false,
        movie: action.movie
      }
    case 'MOVIE_FAIL':
      return {
        isLoading: false,
        error: action.error
      }
    default:
      return state;
  }
}
