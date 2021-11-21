import { Container } from "@material-ui/core";
import React, {useEffect, useState} from "react";
import Grid from '@material-ui/core/Grid'
import backendurl from "../../url";
import RestaurantCard from "../restaurantCard";
import Navbar from '../Navbar';
import { useHistory } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import axios from "axios";


  export default function Favourites() {
      let customer_ID = 1;
      const history= useHistory();
      customer_ID = useSelector(state => state.login.custID);
      if (customer_ID == '') {
          customer_ID=1
      }
    const [RestaurantDetails, setRestaurantDetails] = useState([])
    const token =useSelector(state => state.login.token);
      useEffect(() => {
        axios.defaults.headers.common['authorization'] = token;
        axios.get(`${backendurl}/favourites/${customer_ID}`)
            .then(data => {
                console.log(data)
                setRestaurantDetails(data.data)
            }).catch(error => {
                console.log(error)
             history.push('/login')   
            })
    },[customer_ID, token]) 

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