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
import backendurl from '../url';
import { useSelector, useDispatch } from "react-redux";
const axios = require('axios');


export default function RestaurantCard({restaurantDetails}) { 
  const customer_ID= useSelector(state => state.login.custID);
  const addToFav = async (RestID) => {
    let data = {
      "Rest_ID": RestID,
      "Cust_ID": customer_ID
    }
    axios.post(`${backendurl}/favourites`, data).then(result => {
      console.log(result);
      if (result.status === 200) {
        return "Success"
      }
    })
    
  }
  const setData=(restDeets)=>{
    localStorage.setItem('RestName', restDeets.Restaurant_Name)
    localStorage.setItem('Current_Delivery', restDeets.Restaurant_Delivery_Mode)
  }

  return (
      <Card  elevation={3} sx={{minHeight:400, Height:305, maxWidth: 345 }}>
        <CardMedia
          component="img"
          height="140"
          image={restaurantDetails.Restaurant_Profile_Location}
          alt="Food image"
        />
        <CardContent>
          <Link to={`/menu?RestID=${restaurantDetails.Restaurant_ID}`}
          >
          <Typography gutterBottom variant="h5" component="div"
            onClick={()=>setData(restaurantDetails)}>
            {restaurantDetails.Restaurant_Name}
          </Typography>
          </Link>
          <Typography variant="body2" color="text.secondary">
            {restaurantDetails.Restaurant_Description}
          </Typography>
        </CardContent>
        <CardActions>
        <Link
          onClick={() => addToFav(restaurantDetails.Restaurant_ID)}
          to='/Favourites'>
        <IconButton variant='outlined' aria-label="add to favorites">
          <FavoriteBorderIcon />
        </IconButton>
        </Link>
          {/* <Button size="small"><AttachMoneyIcon/>{restaurantDetails.Restaurant_ID}</Button> */}
        </CardActions>
      </Card>
    );
  }