import React, {useState} from "react";
import Navbar from './Navbar'
import food from '../images/food.png'
import Paper from '@mui/material/Paper';
import Grid from '@material-ui/core/Grid';
import RestaurantCard from "./restaurantCard";
import {Redirect} from 'react-router';
import cookie from 'react-cookies';

let redirectVar = null;
        if(cookie.load('cookie')){
            redirectVar = <Redirect to= "/home"/>
        }


const styles = {
    paperContainer: {
        backgroundImage: `url(${food})`,
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
        backgroundSize: "cover",
        overflow:"hidden",
        display: "flex",
        alignItems: "center",
        zIndex: -1,
        width: '100vw',
        height: '100vh',
    },
    Nav:{
        position:"fixed",
        margin:'0',
        padding:"0"
    }
};

export default function Landing() {
    const [RestaurantDetails, setRestaurantDetails] = useState([])
    
    
    return (
        <div>
        <redirectVar/>
        <Navbar 
        setRestaurantDetails={setRestaurantDetails} 
        style={styles.Nav} />
        <Paper  style={styles.paperContainer}>
        <Grid container spacing={3} >
            {RestaurantDetails.map(details=>(
                <Grid item md={3} key={details.Restaurant_ID}>
                    <RestaurantCard restaurantDetails={details}/> 
                </Grid>
            ))}
            </Grid>
        </Paper>
        
        </div>


    )}