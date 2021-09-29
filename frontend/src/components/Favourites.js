import { Container } from "@material-ui/core";
import React, {useEffect, useState} from "react";
import Grid from '@material-ui/core/Grid'

import RestaurantCard from "./restaurantCard";
import Navbar from './Navbar'

  export default function Favourites() {
      const customer_ID=1;
    const [RestaurantDetails, setRestaurantDetails] = useState([])
    
    useEffect(()=>{
        fetch(`http://localhost:4001/favourites/${customer_ID}`)
        .then(res => res.json())
        .then(data =>{setRestaurantDetails(data)})
    },[])

        

    return(
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