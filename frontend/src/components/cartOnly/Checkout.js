import React, {useState, useEffect} from "react";
import TextField from '@mui/material/TextField';
import { Typography } from "@material-ui/core";
import Navbar from '../Navbar'
import { Container } from "@material-ui/core";
import { useSelector, useDispatch } from "react-redux";
import CartTable from "./CartTable";
import Button from '@mui/material/Button';
import Paper from '@mui/material/Paper';
import { useHistory } from "react-router-dom";
import backendurl from "../../url"
import {addToCart, clearCart, clearAdd} from "../../actions/cartAction";

const axios = require('axios');

export default function Checkout() {
    const dispatch = useDispatch();

    const x = useSelector(state => state.addToCart.Cart)
    let RestID=useSelector(state => state.addToCart.RestID)
  let Cust_ID = useSelector(state => state.login.custID)
  let currentDelivery = localStorage.getItem('Current_Delivery')
  console.log(Cust_ID)
    let Cust_Name = useSelector(state => state.login.name)

  const history = useHistory();
  const [SpecialInstructions, setSpecialInstructions] = useState([]);
    let DeliveryType = localStorage.getItem('DeliveryType')   
    const [CustCity, setCustCity] = useState([])
    const [CustState, setCustState] = useState([])
    const [CustCountry, setCustCountry] = useState([])
    const [CustStreet, setCustStreet] = useState([])
    
  const addInstruction = () => {
    let data = {
      "Special_Instructions": SpecialInstructions,
      "Rest_ID": x.RestID
    }
    axios.post(`${backendurl}/order/special`, data).then(result => {
      console.log(result);
      if (result.status === 200) {
        return "Success"
      }
    })
  }

  
    useEffect(()=>{
        axios.get(`${backendurl}/customer/${Cust_ID}`)
      .then(res => 
      {
        let data = res.data;
        console.log(data)
          setCustCity(data.Cust_City);
          setCustCountry(data.Cust_Country);
          setCustState(data.Cust_State);
          setCustStreet(data.Cust_Street)
          }).catch=(Error)=>{
            console.log(Error)
          }
      },[Cust_ID, localStorage.getItem('DeliveryType')])
  const confirmOrder = () => {
    console.log('inside confirm order')
    var today = new Date();
  console.log(today)
    var date = today.getFullYear()+'-'+(today.getMonth()+1)+'-'+today.getDate();
    console.log(date)
    var time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
    const data = x.map((x) => (
    {DishName: x.DishName,
      DishCost: x.DishCost,
      DishCount : x.count,
      RestID: RestID,
      RestName: localStorage.getItem('RestName'),
      CustID: Cust_ID,
      CustName: Cust_Name,
      OrderStatus:"New Order",
      DeliveryStatus:"Order Received",
      OrderMode: DeliveryType,
      Order_Time: date + time,
      DishID: x.DishID,
      SpecialInstructions: SpecialInstructions
      }
  ))
  console.log(data)
    // x.map((x)=>(
    axios.post(`${backendurl}/order`,data
    // {
    //         DishName: x.DishName,
    //         DishCost: x.DishCost,
    //         DishCount : x.count,
    //         RestID : RestID,
    //         CustID: Cust_ID,
    //         OrderStatus:"New Order",
    //         DeliveryStatus:"Order Received",
    //         OrderMode: DeliveryType 
            
    //     }
        )
        .then(response=>{
          history.push(`/menu?RestID=${RestID}`)
          dispatch(clearCart());
            //history.goBack();
        })
    // ))
  }


  return(

<div>
  <Navbar/>
  <Container component={Paper}>
  <h2>{localStorage.getItem('RestName')}</h2>
<CartTable/>
        <br />
        {currentDelivery == 'Delivery' ?
          <div>
<Typography>Delivery Address: </Typography>
<TextField
                id="filled-disabled"
                label="Apt, Street"
                value= {CustStreet}
                defaultValue="Hello World"
                variant="filled"
                onChange={e=>setCustCity(e.target.value)}
                />
<TextField
                id="filled-disabled"
                label="City"
                value= {CustCity}
                defaultValue="Hello World"
                variant="filled"
                onChange={e=>setCustCity(e.target.value)}
                />

<TextField
                id="filled-disabled"
                label="State"
                value= {CustState}
                defaultValue="Hello World"
                variant="filled"
                onChange={e=>setCustState(e.target.value)}
                />
<TextField
                id="filled-disabled"
                label="Country"
                value= {CustCountry}
                defaultValue="Hello World"
                variant="filled"
                onChange={e=>setCustCountry(e.target.value)}
            />
          </div> : <div />}


<br/>
<br/>
<div>Delivery Type : Pickup </div>
<br/>
<TextField width='800'
          id="outlined-multiline-static"
          label="Special Instructions"
          multiline
          // onChange={e=>setSpecialInstructions(e.target.value)}
          rows={3}
          
        />
        <br />
        <br/>
<Button  variant="contained" color="success" onClick={confirmOrder}>
                Confirm Order
</Button>


</Container>
</div>


  )

}