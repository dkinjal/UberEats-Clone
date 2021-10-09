import React, {useState, useEffect} from 'react';
import {useLocation} from "react-router-dom";
import {BrowserRouter as Router, Switch, Route} from "react-router-dom";
import TextField from '@mui/material/TextField';
import Stack from '@mui/material/Stack';
import { Container } from '@mui/material';
import Paper from '@mui/material/Paper';
import Grid from '@material-ui/core/Grid';
import Button from '@mui/material/Button';
import { useHistory } from "react-router-dom";
import ChangeImage from "../ImageOnly/ChangeImage"


const style1={
  width:'30ch', 
  display:'grid', 
  "text-align": "-webkit-center"
}
const axios = require('axios');
export default function UpdateDish() {  
    const search = useLocation().search;
    const DishID = new URLSearchParams(search).get('Dish_ID');
    const [DishName, setDishName] = useState()
    const [DishCost, setDishCost] = useState()
    const [DishDescription, setDishDescription] = useState()
    const [MainIngredients, setMainIngredients] = useState()
    const [DishCategory, setDishCategory] = useState()
    const [Dishimage, setDishImage]=useState()
    const history= useHistory();

    
  useEffect(()=>{
    axios.get(`http://localhost:4001/dish/${DishID}`)
      .then(response => 
        {let data = (response.data[0])
          console.log(response.data[0])
          setDishName(data.Dish_Name);
          setDishCategory(data.Dish_Category);
          setDishCost(data.Dish_Cost);
          setMainIngredients(data.Ingredients);
          setDishImage(data.Dish_Image_Location);
          
        }).catch(Error=>{
          console.log(Error)
        })  
  },[DishID])  

  function handleSubmit(){
    axios.post(`http://localhost:4001/dish/${DishID}`,{
              DishCategory: DishCategory,
              DishName: DishName,
              DishCost: DishCost,
              DishDescription: DishDescription,
              MainIngredients: MainIngredients,
              
          })
          .then(response=>{
              //history.push('/restaurantProfile')
              history.goBack();
          })
  }
    
      
    return (
       
      <Grid container justify = "center">
          <Paper elevation={3} sx={{ width: 500}} >
          <Grid container justify = "center">
            <Stack direction="column" spacing={3} sx={style1}>
            <h3 > MAKE CHANGES</h3>
            <ChangeImage ImageLocation = {Dishimage} calledFrom='dish' ID={DishID}/>
            <TextField id="outlined-basic" 
            value= {DishName || ''}
            onChange={(e)=>setDishName(e.target.value)}
            label="Dish Name" variant="outlined" ></TextField>

            <TextField id="outlined-basic" 
            value= {DishDescription || ''}
            onChange={(e)=>setDishDescription(e.target.value)}
            label="Dish Description" variant="outlined"> </TextField>

            <TextField id="outlined-basic" 
            value= {DishCost || ''}
            onChange={(e)=>setDishCost(e.target.value)}
            label="Dish cost" variant="outlined" ></TextField>

            <TextField id="outlined-basic" 
            value= {MainIngredients || ''}
            onChange={(e)=>setMainIngredients(e.target.value)}
            label="Main ingredients" variant="outlined" ></TextField>
            
            <TextField id="outlined-basic" label="Dish category" 
            value= {DishCategory || ''}
            onChange={(e)=>setDishCategory(e.target.value)}
            variant="outlined" ></TextField>
            <Button variant="contained" color="success" onClick={handleSubmit} >
              Save
            </Button>
            </Stack>
            </Grid>
            </Paper>
          </Grid>
            


    )}