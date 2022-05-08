import './App.css';
import {useEffect, useState} from 'react'
import MovieCard from './components/MovieCard';
import Typography from '@mui/material/Typography';
import {useSelector, useDispatch} from 'react-redux';
import { Box } from '@mui/material/';
import axios from 'axios';

import FilterBox from './components/FilterBox';
import MovieActions, {MovieSelectors} from './redux/MovieRedux'

function App() {
  const [loadingGenre, setLoadingGenre] = useState(true);
  const [loadingMovieList, setLoadingMovieList] = useState(true);
  const [movieList, setMovieList] = useState([]);
  const [loadingMessage, setLoadingMessage] = useState('Loading data...');
  const dispatch = useDispatch();
  const filteredGenres = useSelector(MovieSelectors.selectFilteredGenres);
  const filterRate = useSelector(MovieSelectors.selectFilterRate);
  useEffect( () => {
    axios.get(process.env.REACT_APP_GENRE_LIST_API).then((res => {
      dispatch(MovieActions.setGenreList(res.data.genres));
      setLoadingGenre(false);
    })).catch((e) => {
      setLoadingMessage('Failed to fetch data from API.');
    });

    axios.get(process.env.REACT_APP_MOVIE_LIST_API).then((res => {
      setMovieList(res.data.results);
      setLoadingMovieList(false);
    })).catch((e) => {
      setLoadingMessage('Failed to fetch data from API.');
    });
  }, []);
  return (
    <Box>
      <Typography className='header' variant='h2'>TheMovieDB Test</Typography>
      {
        loadingGenre && loadingMovieList?
          <Typography className='loadingData' variant='h5'>{loadingMessage}</Typography> :
          <Box className="mainContainer">
            <FilterBox/>
            <Box className='cardContainer'>
              {movieList.map( ( movie ) => {
                if ( movie.vote_average >= filterRate ) {
                  if ( filteredGenres.length === 0 || movie.genre_ids.some( (genreId) => {
                    return filteredGenres.find( (filteredGenre) => {
                      return filteredGenre === genreId;
                    });
                  })) {
                    return <MovieCard imgPath={process.env.REACT_APP_IMAGE_URL_PREFIX + movie.backdrop_path} title={movie.title} vote={movie.vote_average} genreIds={movie.genre_ids} overview={movie.overview} key={movie.id}></MovieCard>
                  }
                }
                return '';
              })}
            </Box>
          </Box>
      }
    </Box>
  );
}

export default App;
