import React, {useEffect, useState} from 'react';
import { DataGrid } from '@material-ui/data-grid';
import Grid from '@material-ui/core/Grid';
import { styled } from '@mui/material/styles';
import Paper from '@mui/material/Paper';
import { Container } from '@mui/material';
import Navbar from '../Navbar';
import axios from 'axios'

import Modal from '@mui/material/Modal';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import { Link } from 'react-router-dom';
import {useLocation} from "react-router-dom";
import Button from '@mui/material/Button';


const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 300,
  height: 200,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};
const Item = styled(Paper)(({ theme }) => ({
    ...theme.typography.body2,
    padding: theme.spacing(1),
    textAlign: 'center',
    color: theme.palette.text.secondary,
  }));
export default function Orders(){
    const [OrderDetails, setOrderDetails] = useState([])
    const [open, setOpen] = React.useState(false);
    const [DeliveryStatus, setDeliveryStatus]= useState()
    const [OrderID, setOrderID]= useState()
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);
     const handleChange = (event) => {
       setDeliveryStatus(event.target.value);
     };
     const search = useLocation().search;

     const DeliveryStatusParam = new URLSearchParams(search).get('Delivery');

      useEffect(()=>{
        fetch(`http://localhost:4001/order/${1}`)
        .then(res => res.json())
        .then(data =>{
          console.log(data)
          setOrderDetails(data)
          
        })
        },[DeliveryStatus])

      function handleDeliveryChange(){
        axios.post('http://localhost:4001/order?OrderID='+OrderID, {
        DeliveryStatus: DeliveryStatusParam,
      },{withCredentials: true})
      .then(function (response) {
        console.log(response);
      })
      .catch(function (error) {
        console.log(error);
      });
      }
      const columns=[{ field: 'Cust_ID', headerName: 'Customer ID', width: 180 },
      { field: 'Dish_Name', headerName: 'Dish_Name', width: 180 },
      { field: 'Delivery_Status', headerName: 'Delivery Status', width: 180 },
      { field: 'Order_Status', headerName: 'Order Status', width: 180 },
      { field: 'Order_ID', headerName: 'Order ID', width: 180 },
      { field: 'Order_Mode', headerName: 'Order Mode', width: 180 }]
      
      function onCellClick(e){
        console.log("Cell clicked "+ e.value)
        handleOpen();
      }
        
        return (
            <div>
                <Navbar/>
            
            <Container>
                
            <div style={{ height: 400, width: '100%' }}>
              <DataGrid
                rows={OrderDetails}
                columns={columns}
                // loading={OrderDetails.rows.length === 0}
                rowHeight={38}
                checkboxSelection
                disableSelectionOnClick
                onCellClick={onCellClick}
                
                getRowId={(row) => row.Order_ID}
              />
              <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
              ><Box sx={style}>
              
              <FormControl fullWidth>
                <InputLabel >Delivery Status</InputLabel>
                <Select                  
                  value={DeliveryStatus}
                  label="Age"
                  onChange={handleChange}>
                  <MenuItem value='Order Received'>Order Received</MenuItem>
                  <MenuItem value='Preparing'>Preparing</MenuItem>
                  <MenuItem value='Pickup Ready'>Pickup Ready</MenuItem>
                  <MenuItem value='Picked up'>Picked up</MenuItem>

                </Select>
              </FormControl>
              <br/>
              <br/>
              <br/>
              <Link to={'/orders?Delivery='+ DeliveryStatus}>
              <Button 
                onClick={handleDeliveryChange}
                variant='contained'
                color='success'>Done</Button>
                </Link>
            </Box></Modal>
            </div>
            </Container>
            </div>
          );





}
