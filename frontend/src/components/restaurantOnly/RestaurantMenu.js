import { Container } from "@material-ui/core";
import React, {useEffect, useState} from "react";
import Grid from '@material-ui/core/Grid'
import DishCard2 from "../DishCard2";
import {useLocation} from "react-router-dom";
import Navbar from '../Navbar'

  export default function RestaurantMenu() {
    const [DishDetails, setDishDetails] = useState([])
    const search = useLocation().search;

    const RestID = new URLSearchParams(search).get('RestID');
  console.log(RestID)
    useEffect(()=>{
        fetch(`http://localhost:4001/dish/rest/${RestID}`)
        .then(res => res.json())
        .then(data =>{setDishDetails(data)})
    },[RestID])

    return(
        <div>
        <Navbar />
        <Container>
            <Grid container spacing={3} >
            {DishDetails.map(details=>(
             
             <Grid item md={4} sm={6} key={details.Dish_ID}>
                 <DishCard2 DishDetails={details}/>
             </Grid>
            
         ))}
            </Grid>
        </Container>
        </div>
    )


  }