import React, {useEffect, useState} from "react";
import { Container } from "@material-ui/core";
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import { Link } from 'react-router-dom';
import {useLocation} from "react-router-dom";
import ChangeImage from "../ImageOnly/ChangeImage";
import Paper from '@mui/material/Paper';
import Grid from '@material-ui/core/Grid';
import Modal from '@mui/material/Modal';
import Box from '@mui/material/Box';
import { IconButton } from "@mui/material";
import Avatar from '@mui/material/Avatar';
import backendurl from "../../url";
import { ADD_DISH } from '../../Graphql/Mutations'
const axios = require('axios');

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
  };
const style1={
    width:'30ch', 
    display:'grid', 
    "text-align": "-webkit-center"
  }
export default function AddDish() { 
    const [DishName, setDishName]= useState('');
    const [DishDescription, setDishDescription]= useState('');
    const [DishCategory, setDishCategory]= useState('');
    const [DishCost, setDishCost]= useState('');
    const [DishIngredients, setDishIngredients]= useState('');
    const [DishProfile, setDishProfile]= useState('');
    const [DishType, setDishType]= useState('');
    const search = useLocation().search;
    const [open, setOpen] = React.useState(false);

    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);
    const RestID = new URLSearchParams(search).get('Rest_ID');
    
  async function abc() {
  console.log("inside abccc"+RestID)
  let AA= await axios.post(`${backendurl}/graphql`,
      {
        query: ADD_DISH,
        variables: {
        
    Dish_Name:DishName,
    Ingredients:DishIngredients,
    Dish_Description:DishDescription,
    Dish_Category:DishCategory,
    Dish_Cost:DishCost,
    Restaurant_ID:RestID,
    Dish_Type:DishType,
        }
    })
    console.log("called here ",AA)
}

  function addDish() {
    abc();
        fetch(`${backendurl}/dish`,{
                method:'POST',
                headers:{"Content-type": "application/json"},
                body: JSON.stringify({
                    DishName:DishName,
                    DishDescription:DishDescription,
                    DishCost: DishCost,
                    MainIngredients: DishIngredients,
                    DishCategory: DishCategory,
                    RestID: RestID,
                    DishType: DishType
                })})
                .then(res => res.json())
            .then(data => {
                console.log(data)
            })
    }


    return (
        <Grid container justify = "center">
          <Paper elevation={3} sx={{ width: 500}} >
          <Grid container justify = "center">
          <Stack direction="column"  sx={style1}>
            <h1>ADD DISH</h1>
            {/* <ChangeImage  ImageLocation = {localStorage.getItem('imagedata')}
            calledFrom='addDish' /> */}
             {/* <IconButton onClick={handleOpen} >
            <Avatar
            alt="Cindy Baker" src={DishProfile} 
            sx={{ width: 200, height: 200 }} />
            </IconButton> */}
            <Modal
              open={open}
              onClose={handleClose}
              aria-labelledby="modal-modal-title"
              aria-describedby="modal-modal-description"
            >
              <Box sx={style} >
                
                
                {/* <ChangeImage setDishProfile={setDishProfile}
             handleClose= {handleClose} calledFrom="dish" ID={DishID}/>/>
                */}
              </Box>
            </Modal>


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
            <TextField fullWidth id="outlined-basic" label="Dish Type" 
            onChange={(e)=>{setDishType(e.target.value)}}
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