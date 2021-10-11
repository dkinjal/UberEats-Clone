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
import backendurl from '../url'

export default function RestaurantCard({restaurantDetails}) { 
   
  return (
      <Card  elevation={3} sx={{minHeight:450, Height:345, maxWidth: 345 }}>
        <CardMedia
          component="img"
          height="140"
          image='https://uber-bucket-kd.s3.us-west-1.amazonaws.com/rest-1633931413703.png'
          alt="Food image"
        />
        <CardContent>
          <Link to={`/menu?RestID=${restaurantDetails.Restaurant_ID}`}
          >
          <Typography gutterBottom variant="h5" component="div"
          onClick={localStorage.setItem('RestName', restaurantDetails.Restaurant_Name)}>
            {restaurantDetails.Restaurant_Name}
          </Typography>
          </Link>
          <Typography variant="body2" color="text.secondary">
            {restaurantDetails.Restaurant_Description}
          </Typography>
        </CardContent>
        <CardActions>
        <Link to ='/Favourites'>
        <IconButton variant='outlined' aria-label="add to favorites">
          <FavoriteBorderIcon />
        </IconButton>
        </Link>
          {/* <Button size="small"><AttachMoneyIcon/>{restaurantDetails.Restaurant_ID}</Button> */}
        </CardActions>
      </Card>
    );
  }