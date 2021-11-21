import { Container } from "@material-ui/core";
import React, {useEffect, useState} from "react";
import Grid from '@material-ui/core/Grid'
import RestaurantCard from "./restaurantCard";
import backendurl from "../url";
import Navbar from '../components/Navbar';

  export default function RestaurantList() {
    const [RestaurantDetails, setRestaurantDetails] = useState([])
        
    useEffect(()=>{
        fetch(`${backendurl}/restaurant`)
        .then(res => res.json())
            .then(data => {
                console.log(data)
                setRestaurantDetails(JSON.parse(data.product))
            })
    },[])

      return (
        <div>
               <Navbar/>
        
        <Container>
           
            <Grid container spacing={3} >
            {RestaurantDetails.map(details=>(
                <Grid item md={3} key={details.Restaurant_ID}>
                    <RestaurantCard restaurantDetails={details}/> 
                </Grid>
            ))}
            </Grid>
              </Container>
              </div>
    )


  }