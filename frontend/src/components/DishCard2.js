import * as React from 'react';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import DialogActions from '@mui/material/DialogActions';
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
import {addToCart, clearCart, clearAdd} from "../actions/cartAction";
import DialogTitle from '@mui/material/DialogTitle';
import Dialog from '@mui/material/Dialog';
import PropTypes from 'prop-types';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';


export default function DishCard2({DishDetails}) {  
  const [DishID, setDishID] = React.useState(DishDetails.Dish_ID);
  const [DishName, setDishName] = React.useState(DishDetails.Dish_Name);
  const [DishCost, setDishCost] = React.useState(DishDetails.Dish_Cost);
  const [open, setOpen] = React.useState(false);
  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = (props) => {
    console.log(props+'aa')
    if(props=='create'){
      console.log('inside create')
      let data = {
        DishID: DishID,
        DishCost: DishCost,
        DishName: DishName,
        RestID : DishDetails.Restaurant_ID  
      }
      dispatch(clearAdd(data))
      // dispatch(clearCart());
      // setTimeout(() => {AddItem()}, 5000);
      // // if(Restaurant_ID==0){
      // // AddItem();
      // // }
    }
    setOpen(false);
  };

  const dispatch = useDispatch();
  
  const Restaurant_ID=useSelector(state => state.addToCart.RestID)
  const AddItem= async()=>{
    let data = {
      DishID: DishID,
      DishCost: DishCost,
      DishName: DishName,
      RestID : DishDetails.Restaurant_ID  
    }
    console.log(DishDetails.Restaurant_ID, Restaurant_ID)
    if(DishDetails.Restaurant_ID===Restaurant_ID || Restaurant_ID===0){
      console.log('inside add')
      dispatch(addToCart(data))
    }else{
      handleClickOpen();
    }
  
    
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
        
          <Button size="small"><AttachMoneyIcon/>{DishDetails.Dish_Cost}</Button>
        <IconButton 
        onClick={AddItem}
        variant='outlined' >
        <AddBoxOutlinedIcon />
       
        </IconButton>
        </CardActions>
         {/* ---------------------------------------------------------- */}
         <Dialog  onClose={handleClose} open={open}>
      <DialogTitle>Create new order?</DialogTitle>
      <DialogContent>
          <DialogContentText id="alert-dialog-description">
          Your order contains item from another restaurant
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => handleClose('cancel')}>Cancel</Button>
          <Button onClick={() => handleClose('create')} autoFocus>
            Create
          </Button>
        </DialogActions>
    </Dialog>
    {/* ----------------------------------------------------------- */}
      </Card>
    );
  }