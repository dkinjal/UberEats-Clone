import * as React from 'react';
import { useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import SkipPreviousIcon from '@mui/icons-material/SkipPrevious';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import SkipNextIcon from '@mui/icons-material/SkipNext';

export default function DishCard({DishDetails}) {
  const theme = useTheme();

  return (
    <Card sx={{ display: 'flex' , height:178}}>
      <Box sx={{ display: 'flex', flexDirection: 'column' }}>
        <CardContent sx={{ flex: '1 0 auto' }}>
          <Typography component="div" variant="h5">
            {DishDetails.Dish_Name}
          </Typography>
          <Typography variant="subtitle1" color="text.secondary" component="div">
            {DishDetails.Dish_Description}
          </Typography>
          <Typography variant="caption" color="text.secondary" component="div">
            {DishDetails.Ingredients}
          </Typography>
          <Typography variant="caption" color="text.secondary" component="div">
            {DishDetails.Dish_Category}
          </Typography>
        </CardContent>
        <Box sx={{ display: 'flex', alignItems: 'center', pl: 1, pb: 1 }}>
          {/* <IconButton aria-label="previous">
            {theme.direction === 'rtl' ? <SkipNextIcon /> : <SkipPreviousIcon />}
          </IconButton> */}
          <Typography>{DishDetails.Dish_Cost}</Typography>
          <IconButton aria-label="play/pause">
            <PlayArrowIcon sx={{ height: 38, width: 38 }} />
          </IconButton>
          <IconButton aria-label="next">
            {theme.direction === 'rtl' ? <SkipPreviousIcon /> : <SkipNextIcon />}
          </IconButton>
        </Box>
      </Box>
      <CardMedia
        component="img"
        sx={{ width: 165 }}
        image="http://localhost:3000/burger.png"
        alt="Live from space album cover"
      />
    </Card>
  );
}