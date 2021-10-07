import React, {useEffect, useState} from "react";
import { Container } from "@material-ui/core";
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import { Link } from 'react-router-dom';
import {useLocation} from "react-router-dom";

import Paper from '@mui/material/Paper';
import Grid from '@material-ui/core/Grid';


export default function AddDish() { 
    const [DishName, setDishName]= useState('');
    const [DishDescription, setDishDescription]= useState('');
    const [DishCategory, setDishCategory]= useState('');
    const [DishCost, setDishCost]= useState('');
    const [DishIngredients, setDishIngredients]= useState('');
    const search = useLocation().search;
    const RestID = new URLSearchParams(search).get('Rest_ID');
    console.log(RestID)


    function addDish(){
        fetch(`http://localhost:4001/dish`,{
                method:'POST',
                headers:{"Content-type": "application/json"},
                body: JSON.stringify({
                    DishName:DishName,
                    DishDescription:DishDescription,
                    DishCost: DishCost,
                    MainIngredients: DishIngredients,
                    DishCategory: DishCategory,
                    RestID: RestID
                })})
                .then(res => res.json())
            .then(data => {
                console.log(data)
            })
    }


    return (
        <Grid container justify = "center">
          <Paper elevation={3} sx={{ width: 500, height: 600}} >
          <Grid container justify = "center">
          <Stack direction="column"  sx={{width:'35ch'}}>
            <h1>ADD DISH</h1>
            <TextField fullWidth id="outlined-basic" label="Dish Name" 
            onChange={(e)=>{setDishName(e.target.value)}}
            variant="outlined" />
            <br/><br/>
            <TextField fullWidth id="outlined-basic" label="Dish Description" 
            onChange={(e)=>{setDishDescription(e.target.value)}}
            variant="outlined" />
            <br/><br/>
            <TextField fullWidth id="outlined-basic" label="Dish Cost" 
            onChange={(e)=>{setDishCost(e.target.value)}}
            variant="outlined" />
            <br/><br/>
            <TextField fullWidth id="outlined-basic" label="Main Ingredients" 
            onChange={(e)=>{setDishIngredients(e.target.value)}}
            variant="outlined" />
            <br/><br/>
            <TextField fullWidth id="outlined-basic" label="Dish Category" 
            onChange={(e)=>{setDishCategory(e.target.value)}}
            variant="outlined" />
            <br/><br/>

           <Link to='/restaurantProfile'>
            <Button onClick={addDish}  variant="contained" color="success">
                ADD DISH
            </Button>
            </Link>
            </Stack>
            </Grid>
            </Paper>
        </Grid>

    )}