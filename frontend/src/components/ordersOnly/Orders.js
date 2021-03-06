import React, {useEffect, useState} from 'react';
import { DataGrid } from '@material-ui/data-grid';
import Grid from '@material-ui/core/Grid';
import { styled } from '@mui/material/styles';
import Paper from '@mui/material/Paper';
import { Container } from '@mui/material';
import Navbar from '../Navbar';
import { useHistory } from "react-router-dom";
import { Update_Delivery } from '../../Graphql/Mutations';
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
import backendurl from '../../url';
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
      const [InnerDetails, setInnerDetails] = useState([])
const history= useHistory();


  const [open, setOpen] = React.useState(false);
    const [DeliveryStatus, setDeliveryStatus]= useState()
    let RestID=useSelector(state => state.restLogin.restID)
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);
    const handleChange = (event) => {
       setDeliveryStatus(event.target.value);
  };
  const logindelivery = sessionStorage.getItem('logindelivery')
    const search = useLocation().search;
    const DeliveryStatusParam = new URLSearchParams(search).get('Delivery');
     
    useEffect(()=>{
      console.log(RestID)
      if (RestID == '') {
        history.push('/login')
      }
    fetch(`${backendurl}/order/rest/${RestID}`)
    .then(res => res.json())
    .then(data =>{
      console.log(JSON.parse(data.product))
      setOrderDetails(JSON.parse(data.product))
      //console.log(JSON.parse(OrderDetails[0].Order_Details))
      setDeliveryStatus(localStorage.getItem('DeliveryStatus'))
      // setInnerDetails(JSON.parse(OrderDetails.Order_Details))
      console.log(typeof(OrderDetails.Order_Details))
      }).catch=(Error)=>{
        console.log(Error)
      }
    }, [DeliveryStatus, RestID, DeliveryStatusParam,])
  
  
  
  
  async function handleDeliveryChange(e, orderID) {
    localStorage.setItem('DeliveryStatus', e.target.value)
    await console.log("inside abccc" +e.target.value+ orderID)
    let DeliveryStatus= localStorage.getItem('DeliveryStatus')
    console.log("inside abccc" + DeliveryStatus)
    let AA = await axios.post(`${backendurl}/graphql`,
      {
        query: Update_Delivery,
        variables: {
          Order_ID: orderID,
          Delivery_Status: DeliveryStatus
        }
    })
    console.log("called here ",AA)
}
  function handleDeliveryChange2(e, orderID) {
    // abc(orderID);
        console.log('inside delivery change'+ e.target.value+ orderID)
        setDeliveryStatus(e.target.value)
        console.log(DeliveryStatus)
        let OrderID= orderID
        localStorage.setItem('DeliveryStatus', e.target.value)
        console.log(localStorage.getItem('DeliveryStatus'))
        let input = {
          DeliveryStatus: localStorage.getItem('DeliveryStatus'),
          Order_ID: orderID
        }
        console.log(input)
        axios.post(`${backendurl}/order/update1/${OrderID}`,input)
      .then(function (response) {
        console.log(response);
      })
      .catch(function (error) {
        console.log(error);
      });
      }
      
      function onCellClick(e){
        console.log("Cell clicked "+ e.value)
        handleOpen();
      }
        
        return (
            <div>
                <Navbar/>
            
<Container>
            <TableContainer sx={{maxWidth:1000}} component={Paper}>
      <Table checkboxSelection sx={{  }} aria-label="simple table">
        <TableHead>
          <TableRow>
          <TableCell padding="checkbox">
          <FormControl component="fieldset">
      <FormLabel component="legend"></FormLabel>
      <RadioGroup
        aria-label="gender"
        defaultValue="female"
        name="radio-buttons-group"
      ></RadioGroup>
      </FormControl>
          </TableCell>
            <TableCell >Customer</TableCell>
            <TableCell >Order ID</TableCell>
            <TableCell >Total Price</TableCell>
            <TableCell >Quantity</TableCell>
            <TableCell >Order Mode</TableCell>
            <TableCell >Delivery Status</TableCell>
            
          </TableRow>
        </TableHead>
        <TableBody>
          {OrderDetails.map((OrderDetails) => (
            <TableRow
              key={OrderDetails.Cust_ID}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
              <TableCell padding="checkbox">
            
          </TableCell>
              <TableCell component="th" scope="row">{OrderDetails.Cust_Name}</TableCell>
              
              <TableCell >{OrderDetails.Order_ID}</TableCell>
              {/* <TableCell >{OrderDetails.DishCost2}$</TableCell> */}
              {/* <TableCell >{OrderDetails.Dish_Count}</TableCell> */}
              <TableCell >{OrderDetails.Order_Mode}</TableCell>
              <TableCell >{OrderDetails.Delivery_Status}</TableCell>

              <TableCell >
              
      {logindelivery=='Delivery'?<Select
    labelId="demo-simple-select-label"
    id="demo-simple-select"
    value={DeliveryStatus}
    label="Update"
    onChange={(e)=>handleDeliveryChange(e,OrderDetails.Order_ID)}
                ><MenuItem value='Order Received'>Order Received</MenuItem>
                    <MenuItem value='Preparing'>Preparing</MenuItem>
                    <MenuItem value='On the way'>On the way</MenuItem>
    <MenuItem value='Delivered'>Delivered</MenuItem>
    <MenuItem value='Cancel order'>Cancel order</MenuItem></Select>: <Select
    labelId="demo-simple-select-label"
    id="demo-simple-select"
    value={DeliveryStatus}
    label="Update"
    onChange={(e)=>handleDeliveryChange(e,OrderDetails.Order_ID)}
                ><MenuItem value='Order Received'>Order Received</MenuItem>
                    <MenuItem value='Preparing'>Preparing</MenuItem>
                    {/* <MenuItem value='Pick up Ready'>Pick up Ready</MenuItem> */}
                    <MenuItem value='Delivered'>Delivered</MenuItem>
    <MenuItem value='Picked up'>Picked up</MenuItem>
    <MenuItem value='Cancel order'>Cancel order</MenuItem></Select>}            
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
    </Container>

            </div>
          );





}
