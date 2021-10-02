import React, {useEffect, useState} from "react";
import { Container } from "@material-ui/core";
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';



export default function AddDish() { 
    const [DishName, setDishName]= useState('');
    const [DishDescription, setDishDescription]= useState('');
    const [DishCategory, setDishCategory]= useState('');
    const [DishCost, setDishCost]= useState('');
    const [DishIngredients, setDishIngredients]= useState('');
    

    function addDish(){
        fetch(`http://localhost:4001/dish`,{
                method:'POST',
                headers:{"Content-type": "application/json"},
                body: JSON.stringify({
                    DishName:DishName,
                    DishDescription:DishDescription,
                    DishCost: DishCost,
                    DishIngredients: DishIngredients,
                    DishCategory: DishCategory
                })})
                .then(res => res.json())
            .then(data => {
                console.log(data)
            })
    }


    return (
        <Container>
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


            <Button onClick={addDish}  variant="contained" color="success">
                Login
            </Button>
        </Container>

    )}