import React, {useState, useEffect} from "react";
import Navbar from '../Navbar'
import backendurl from "../../url";
import Grid from '@material-ui/core/Grid';
import RestaurantCard from "../restaurantCard";
import Container from '@material-ui/core/Container'
import axios from "axios";
import { useSelector } from "react-redux";

const styles = {
    Nav:{
        position:"fixed",
        margin:'0',
        padding:"0"
    }
};

export default function SearchFilter() {
    const [RestaurantDetails, setRestaurantDetails] = useState([])
    const delivery = useSelector(state => state.cust.Delivery_Type);
    const [deliveryType, setDeliveryType] = useState(delivery);
    
    let searchvalue = sessionStorage.getItem('search_id')
    console.log(searchvalue)
    useEffect(() => {
        let data = {
            "search": searchvalue,
            "delivery_type": deliveryType
        }
        console.log(data)
        // fetch(`${backendurl}/search/${searchvalue}`)
        // .then(res => res.json())
        // // .then(  data=>
        //     .then(data => {
        axios.post(`${backendurl}/search/filter/${searchvalue}`, data)
        .then(res =>{
            console.log(JSON.parse(res.data.product))
            let op = JSON.parse(res.data.product)
                setRestaurantDetails(op)
            })
    },[deliveryType,delivery,searchvalue])
    return (
        <div>
            <Navbar
        // setDeliveryType={setDeliveryType}        
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