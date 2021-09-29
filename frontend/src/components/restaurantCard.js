import * as React from 'react';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import FavoriteIcon from '@mui/icons-material/Favorite';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import { Link } from 'react-router-dom';
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';


export default function RestaurantCard({restaurantDetails}) {  
  return (
      <Card  elevation={3} sx={{ maxWidth: 345 }}>
        <CardMedia
          component="img"
          height="140"
          image="http://localhost:3000/pizza.png"
          alt="Food image"
        />
        <CardContent>
          <Link to={'/restaurantTab'}>
          <Typography gutterBottom variant="h5" component="div">
            {restaurantDetails.Restaurant_Name}
          </Typography>
          </Link>
          <Typography variant="body2" color="text.secondary">
            Cheesy, customisable Lorem ipsum XYZ for the pizza cheesy hello bye tata
            {restaurantDetails.Restaurant_Description}
          </Typography>
        </CardContent>
        <CardActions>
        <IconButton variant='outlined' aria-label="add to favorites">
          <FavoriteBorderIcon />
        </IconButton>
          <Button size="small"><AttachMoneyIcon/>{restaurantDetails.Restaurant_ID}</Button>
        </CardActions>
      </Card>
    );
  }