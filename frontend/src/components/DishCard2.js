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
import Avatar from '@mui/material/Avatar';
import AddBoxOutlinedIcon from '@mui/icons-material/AddBoxOutlined';
import { useSelector, useDispatch } from "react-redux";
import {addToCart} from "../actions/cartAction"


export default function DishCard2({DishDetails}) {  
  const [DishID, setDishID] = React.useState(DishDetails.Dish_ID);
  const [DishName, setDishName] = React.useState(DishDetails.Dish_Name);
  const [DishCost, setDishCost] = React.useState(DishDetails.Dish_Cost);

  const dispatch = useDispatch();
  function addToFav(){
    console.log(DishID)
  }
  const AddItem= async()=>{
    let data = {
      DishID: DishID,
      DishCost: DishCost,
      DishName: DishName,
      RestID : DishDetails.Restaurant_ID
      
  }
  console.log(data)
    dispatch(addToCart(data))
  }
  return (
      <Card  elevation={3} sx={{ maxWidth: 345 , minHeight:400, maxHeight:400}}>
        <CardMedia
          component="img"
          height="140"
          image={DishDetails.Dish_Image_Location}
          alt="Food image"
        />
        <CardContent>
            <Link to={"/UpdateDish?Dish_ID=" + DishID}>
            <Typography gutterBottom variant="h5" component="div">
            {DishDetails.Dish_Name}
          </Typography>
          <Typography><b>{DishDetails.Dish_Category}</b></Typography>
          </Link>
          <Typography variant="body2" color="text.secondary">
            {/* {DishDetails.Dish_ID} */}
            {DishDetails.Dish_Description}
          </Typography>
          <Typography variant="caption" color="text.secondary" component="div">
            <b>Ingredients:</b> {DishDetails.Ingredients}
          </Typography>
        </CardContent>
        <CardActions>
        <IconButton variant='outlined' aria-label="add to favorites" onClick={addToFav}>
          <FavoriteBorderIcon />
        </IconButton>
          <Button size="small"><AttachMoneyIcon/>{DishDetails.Dish_Cost}</Button>
        <IconButton 
        onClick={AddItem}
        variant='outlined'  >
        <AddBoxOutlinedIcon />
        </IconButton>
        </CardActions>
      </Card>
    );
  }