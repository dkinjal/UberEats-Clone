import React, {useState, useEffect} from "react";
import Navbar from '../Navbar'
import food from '../../images/food.png'
import Paper from '@mui/material/Paper';
import Grid from '@material-ui/core/Grid';
import RestaurantCard from "../restaurantCard";
import Container from '@material-ui/core/Container'

const styles = {
    Nav:{
        position:"fixed",
        margin:'0',
        padding:"0"
    }
};

export default function SearchResults() {
    const [RestaurantDetails, setRestaurantDetails] = useState([])
    useEffect(()=>{
        fetch(`http://localhost:4001/search/${localStorage.getItem('search_id')}`)
        .then(res => res.json())
        .then(data =>{
            return (setRestaurantDetails(data))
        })
    },[])
    
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