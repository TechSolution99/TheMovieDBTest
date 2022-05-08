// import * as React from 'react';
import { useState } from 'react';
import { CircularProgress } from '@mui/material';
import Card from '@mui/material/Card';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import Rating from '@mui/material/Rating';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button'
import { useSelector, useDispatch } from 'react-redux';
import MovieActions, { MovieSelectors } from '../../redux/MovieRedux';
import './styles.css';

export default function MovieCard(props) {
    const [isImgLoaded, setIsImgLoaded] = useState(false);
    const {imgPath, title, vote, genreIds, overview} = props;
    const genreList = useSelector(MovieSelectors.selectGenreList);
    const dispatch = useDispatch();
    const addGenreToFilter = (genreId) => {
        dispatch(MovieActions.addFilteredGenre(genreId));
    }
    const onMovieImgLoad = () => {
        setIsImgLoaded(true)
    }
    return (
        <Card className='card'>
            { !isImgLoaded ? <CircularProgress className='imgLoading'></CircularProgress> : '' }
            <div className='cardMedia'>
                <CardMedia
                    component='img'
                    height={225}
                    image={imgPath}
                    loading='lazy'
                    onLoad={onMovieImgLoad}
                />
            </div>
            <Typography className='movieOverview' variant='body2'>
                {overview}
            </Typography>
            <CardContent>
                <Typography variant='h6'>{title}</Typography>
                <Box sx={{
                    display: 'flex',
                }}>
                    <Rating name="half-rating-read" defaultValue={1} precision={1} max={1} readOnly />
                    <Typography>{vote}</Typography>
                </Box>            
                {
                    genreIds.map( (genreId, index) => {
                        const genreName = genreList.find((genre) => {
                            return genre.id === genreId;
                        });
                        return <Button size="small" variant='contained' key={index} onClick={ () => { addGenreToFilter(genreId) }} style={{
                            margin:'5px 5px 0 0'
                        }}>{genreName?genreName.name:''}</Button>;
                    })
                }
            </CardContent>
        </Card>
    );
}
