import { Container } from "@material-ui/core";
import React, {useEffect, useState} from "react";

import backendurl from "../url";

export default function SearchRestaurant(props){
    console.log('inside search')
    
        console.log(props)
        fetch(`${backendurl}/restaurant/${props.key}`)
        .then(res => res.json())
        .then(data =>{
            return (props.setRestaurantDetails(data))
        })

        
   
} 