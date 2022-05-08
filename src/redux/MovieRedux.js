import { createReducer, createActions } from 'reduxsauce';

/* --------------------- Types and Action Creators ---------------- */
const { Types, Creators } = createActions({
  setGenreList: ['genreList'],
  setMovieList: ['movieList'],
  setFilterRate: ['filterRate'],
  addFilteredGenre: ['genre'],
  removeFilteredGenre: ['genre'],
});

export const MovieTypes = Types;

export default Creators;

/* --------------------- Selectors ---------------- */
export const MovieSelectors = {
  selectGenreList: state => state.movie.genreList,
  selectMovieList: state => state.movie.movieList,
  selectFilteredGenres: state => state.movie.filteredGenres,
  selectFilterRate: state => state.movie.filterRate,
};

/* --------------------- Initial State ----------------- */
export const INITIAL_STATE = {
  genreList: [],
  movieList: [],
  filteredGenres: [],
  filterRate: 0
};

/* ------------------- Reducers --------------------- */
export const setGenreList = (state, { genreList }) => ({
  ...state,
  genreList
});
export const setMovieList = (state, { movieList }) => ({
  ...state,
  movieList
});
export const setFilterRate = (state, { filterRate }) => {
  return ({
  ...state,
  filterRate
  })
};
export const addFilteredGenre = (state, { genre }) => {
  let filteredGenres = [...state.filteredGenres, genre];
  return ({
  ...state,
  filteredGenres
  })
};
export const removeFilteredGenre = (state, { genre }) => {
  const filteredGenres = state.filteredGenres.filter( (g) => g !== genre );
  return ({
  ...state,
  filteredGenres
  })
};

export const reducer = createReducer(INITIAL_STATE, {
  [Types.SET_GENRE_LIST]: setGenreList,
  [Types.SET_MOVIE_LIST]: setMovieList,
  [Types.SET_FILTER_RATE]: setFilterRate,
  [Types.ADD_FILTERED_GENRE]: addFilteredGenre,
  [Types.REMOVE_FILTERED_GENRE]: removeFilteredGenre,
});
