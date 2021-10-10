import React, {useState, useEffect} from "react";
import Navbar from '../Navbar'

import Grid from '@material-ui/core/Grid';
import RestaurantCard from "../restaurantCard";
import Container from '@material-ui/core/Container'
import axios from "axios";

const styles = {
    Nav:{
        position:"fixed",
        margin:'0',
        padding:"0"
    }
};

export default function SearchResults() {
    const [RestaurantDetails, setRestaurantDetails] = useState([])
    const deliveryType = localStorage.getItem('DeliveryType')
    let searchvalue = localStorage.getItem('search_id')
    useEffect(()=>{
        fetch(`http://localhost:4001/search/${searchvalue}`)
        .then(res => res.json())
        // .then(  data=>
            .then(data =>{setRestaurantDetails(data)})
    },[deliveryType, searchvalue])
    return (
        <div>
        <Navbar 
        // setRestaurantDetails={setRestaurantDetails} 
        style={styles.Nav} />
<Container>
        {/* <Paper  style={styles.paperContainer}> */}
        <Grid container spacing={3} >
            {RestaurantDetails.map(details=>(
                <Grid item md={3} key={details.Restaurant_ID}>
                    <RestaurantCard restaurantDetails={details}/> 
                </Grid>
            ))}
            </Grid>
            </Container>
        {/* </Paper> */}
        </div>


    )}