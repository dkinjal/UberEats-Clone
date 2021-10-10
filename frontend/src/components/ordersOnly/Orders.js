import React, {useEffect, useState} from 'react';
import { DataGrid } from '@material-ui/data-grid';
import Grid from '@material-ui/core/Grid';
import { styled } from '@mui/material/styles';
import Paper from '@mui/material/Paper';
import { Container } from '@mui/material';
import Navbar from '../Navbar';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormLabel from '@mui/material/FormLabel';
import axios from 'axios'
import { useSelector, useDispatch } from "react-redux";
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Checkbox from "@material-ui/core/Checkbox";
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

function createData(name, calories, fat, carbs, protein) {
  return { name, calories, fat, carbs, protein };
}
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
    let RestID=useSelector(state => state.restLogin.restID)
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);
     const handleChange = (event) => {
       setDeliveryStatus(event.target.value);
     };
     const search = useLocation().search;

     const DeliveryStatusParam = new URLSearchParams(search).get('Delivery');
     
      useEffect(()=>{
        console.log({RestID})
        fetch(`http://localhost:4001/order/rest/${RestID}`)
        .then(res => res.json())
        .then(data =>{
          console.log(data)
          setOrderDetails(data)
          
        }).catch=(Error)=>{
          console.log(Error)
        }
        },[DeliveryStatus, RestID, DeliveryStatusParam])

      function handleDeliveryChange(e){
        setDeliveryStatus(DeliveryStatusParam)
        console.log(e.target.value)
        localStorage.setItem('DeliveryStatus',e.target.value)
        axios.post(`http://localhost:4001/order/${1}`, {
        DeliveryStatus: DeliveryStatusParam
      },{withCredentials: true})
      .then(function (response) {
        console.log(response);
      })
      .catch(function (error) {
        console.log(error);
      });
      }

      const columns=[{ field: 'Cust_ID', headerName: 'Customer ID', width: 170 },
      { field: 'Dish_Name', headerName: 'Dish Name', width: 180 },
      { field: 'Delivery_Status', headerName: 'Delivery Status', width: 190 },
      { field: 'Order_Status', headerName: 'Order Status', width: 180 },
      { field: 'Order_ID', headerName: 'Order ID', width: 160 },
      { field: 'Order_Mode', headerName: 'Order Mode', width: 180 }]
      
      function onCellClick(e){
        console.log("Cell clicked "+ e.value)
        handleOpen();
      }
        
        return (
            <div>
                <Navbar/>
            
            {/* <Container>
                
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
            </Container> */}

            <TableContainer sx={{maxWidth:1000}} component={Paper}>
      <Table checkboxSelection sx={{  }} aria-label="simple table">
        <TableHead>
          <TableRow>
          <TableCell padding="checkbox">
          <FormControl component="fieldset">
      <FormLabel component="legend">Gender</FormLabel>
      <RadioGroup
        aria-label="gender"
        defaultValue="female"
        name="radio-buttons-group"
      ></RadioGroup>
      </FormControl>
          </TableCell>
            <TableCell align="left">Customer ID</TableCell>
            <TableCell align="right">Orders</TableCell>
            <TableCell align="right">Price</TableCell>
            <TableCell align="right">Quantity</TableCell>
            <TableCell align="right">Order Mode</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {OrderDetails.map((OrderDetails) => (
            <TableRow
              key={OrderDetails.Cust_ID}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
              <TableCell padding="checkbox">
            {/* <Checkbox value={OrderDetails.Cust_ID}
              // indeterminate={numSelected > 0 && numSelected < rowCount}
              // checked={numSelected === rowCount}
              onClick={(e)=>console.log(e.target.value)}
            />
             */}
              <FormControlLabel value={OrderDetails.Cust_ID} control={<Radio />} label="" />
              
          </TableCell>
              <TableCell component="th" scope="row">{OrderDetails.Cust_ID}</TableCell>
              <TableCell align="right">{OrderDetails.Order_ID}</TableCell>
              <TableCell align="right">{OrderDetails.Dish_Cost}$</TableCell>
              <TableCell align="right">{OrderDetails.Dish_Count}</TableCell>
              <TableCell align="right">{OrderDetails.Order_Mode}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>

            </div>
          );





}
