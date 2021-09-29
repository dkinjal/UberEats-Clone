import React, {useState} from 'react';
import {useLocation} from "react-router-dom";
import {BrowserRouter as Router, Switch, Route} from "react-router-dom";
const axios = require('axios');
export default function UpdateDish() {  
    const search = useLocation().search;
    const DishID = new URLSearchParams(search).get('Dish_ID');
    
    
    
    axios.get(`http://localhost:4001/dish/${DishID}`)
      .then(response => 
        {let data = (response.data[0])
          console.log(response.data[0])
          setRestDetails(response.data[0])
          
        })  
      
    return (
       
        <div>
            <Router>
                <Route path={'?Dish_ID=' + DishID}>
                    <p>{DishID}</p>
                </Route>
            </Router>
            <h1>hello</h1>
            <p>{DishID}</p></div>
    )}