import { Container } from "@material-ui/core";
import React, {useEffect, useState} from "react";



export default function SearchRestaurant(props){
    console.log('inside search')
    
        console.log(props)
        fetch(`http://localhost:4001/restaurant/${props.key}`)
        .then(res => res.json())
        .then(data =>{
            return (props.setRestaurantDetails(data))
        })

        
   
} 