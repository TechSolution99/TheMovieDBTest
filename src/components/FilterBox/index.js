import { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import Button from '@mui/material/Button'
import Box from '@mui/material/Box';
import { Typography } from '@mui/material';
import Rating from '@mui/material/Rating';
import MovieActions,{ MovieSelectors } from '../../redux/MovieRedux'
import { styled } from '@mui/material/styles';
import IconButton from '@mui/material/IconButton';
import Collapse from '@mui/material/Collapse';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

const ExpandMore = styled((props) => {
    const { expand, ...other } = props;
    return <IconButton {...other} />;
    })
(
    ({ theme, expand }) => ({
        transform: !expand ? 'rotate(0deg)' : 'rotate(180deg)',
        marginLeft: 'auto',
        transition: theme.transitions.create('transform', {
            duration: theme.transitions.duration.shortest,
        }),
    })
);

export default function FilterBox(props) {
    const filterRate = useSelector(MovieSelectors.selectFilterRate);
    const filteredGenres = useSelector(MovieSelectors.selectFilteredGenres);
    const genreList = useSelector(MovieSelectors.selectGenreList);
    const [rateHover, setRateHover] = useState(-1);
    const [filterExpanded, setFilterExpanded] = useState(true);
  
    const handleExpandFilterClick = () => {
        setFilterExpanded(!filterExpanded);
    };

    const dispatch = useDispatch();
    const toggleFilterGenre = (genreId) => {
        const isFiltered = filteredGenres.find( (g) => {
            return g === genreId;
        })
        if ( isFiltered ) {
            dispatch(MovieActions.removeFilteredGenre(genreId));
        }
        else {
            dispatch(MovieActions.addFilteredGenre(genreId));
        }
    }
    return <Box sx={{
        textAlign: 'left',
        border: '1px solid lightgray',
        boxShadow: '1px 1px 0px 0px lightgrey',
        borderRadius: '7px'
        }}>
        <Box sx={{
            display: 'flex',
            padding: '5px 10px 0px 10px',
            alignItems: 'center'
        }}>
            <Typography variant='h6'>Filter</Typography>
            <ExpandMore
            expand={filterExpanded}
            onClick={handleExpandFilterClick}
            aria-expanded={filterExpanded}
            aria-label="show filters"
            >
                <ExpandMoreIcon />
            </ExpandMore>
        </Box>
        <Collapse in={filterExpanded} timeout="auto" unmountOnExit>
            <Box sx={{
                    display: 'flex',
                    backgroundColor: 'whitesmoke',
                    padding: '5px 10px 5px 10px',
                    borderTop: '1px solid lightgray',
                }}>
                    <Rating name="half-rating-read" defaultValue={0} precision={1} max={10} value={filterRate}
                        onChange={(e, newVal) => {
                            dispatch(MovieActions.setFilterRate(newVal ? newVal : 0));
                        }}
                        onChangeActive={(e, newVal) => {
                            setRateHover(newVal);
                        }}/>
                    <Typography sx={{
                        marginLeft: '10px',
                    }}>Higher than&nbsp;{filterRate}</Typography>
                </Box>
            <Box sx={{
                backgroundColor: 'whitesmoke',
                padding: '0px 10px 5px 10px',
                borderTop: '1px solid lightgray',
                borderBottomLeftRadius: '7px',
                borderBottomRightRadius: '7px',
            }}>
            {
                genreList.map( (genre, index) => {
                    const isFiltered = filteredGenres.find( (genreId) => {
                        return genre.id === genreId;
                    })
                    return <Button size="small" variant={isFiltered ? 'contained':'outlined'} key={index} onClick={ () => {toggleFilterGenre(genre.id)} } style={{
                        margin:'5px 5px 0 0'
                    }}>{genre.name}</Button>;
                })
            }
            </Box>
        </Collapse>
    </Box>
}