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


export default function DishCard2({DishDetails}) {  
  // <Router><Route path={'/UpdateDish?Dish_ID=' + DishDetails.Dish_ID}><UpdateDish/></Route>;
  // </Router>

  const [DishID, setDishID] = React.useState(DishDetails.Dish_ID);
  return (
      <Card  elevation={3} sx={{ maxWidth: 345 }}>
        <CardMedia
          component="img"
          height="140"
          image="http://localhost:3000/burger.png"
          alt="Food image"
        />
        <CardContent>
            <Link to={"/UpdateDish?Dish_ID=" + DishID}>
            <Typography gutterBottom variant="h5" component="div">
            {DishDetails.Dish_Name}
          </Typography>
          </Link>
          <Typography variant="body2" color="text.secondary">
            {DishDetails.Dish_ID}
          </Typography>
          <Typography variant="caption" color="text.secondary" component="div">
            {DishDetails.Ingredients}
          </Typography>
        </CardContent>
        <CardActions>
        <IconButton variant='outlined' aria-label="add to favorites">
          <FavoriteBorderIcon />
        </IconButton>
          <Button size="small"><AttachMoneyIcon/>aaa</Button>
        </CardActions>
      </Card>
    );
  }