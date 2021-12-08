import React, {useEffect, useState} from 'react';
import { DataGrid } from '@material-ui/data-grid';
import Modal from '@mui/material/Modal';
import Grid from '@material-ui/core/Grid';
import { styled } from '@mui/material/styles';
import { Link } from 'react-router-dom';
import { IconButton } from "@mui/material";
import Button from '@mui/material/Button';
import axios from 'axios'
import Checkbox from '@mui/material/Checkbox';
import { useHistory } from "react-router-dom";

import Paper from '@mui/material/Paper';
import ListSubheader from '@mui/material/ListSubheader';
import { Container } from '@mui/material';
import Navbar from '../Navbar';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import { useSelector, useDispatch } from "react-redux";
import Divider from '@mui/material/Divider';
import backendurl from '../../url';
import TableCell from '@mui/material/TableCell';
import { Table, TableBody, TableContainer, TableRow } from '@mui/material'
import { TableFooter, TablePagination } from '@material-ui/core';

function createData(name, calories, fat, carbs, protein) {
  return { name, calories, fat, carbs, protein };
}
const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 200,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};

export default function MyOrders() {
    const [OrderDetails, setOrderDetails] = useState([])
const history= useHistory();
    const [CancelDetails, setCancelDetails] = useState([])
    const [ReceiptDetails, setReceiptDetails] = useState([])
    const[Total, setTotal]= useState([])
    const [SI, setSI] = useState([])
const [delivery, setDelivery]= useState([])
    const[Length, setLength]= useState([])
    const Cust_ID = useSelector(state => state.login.custID)
    const [open, setOpen] = React.useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);
    const [page, setPage] = React.useState(0);
    const [rowsPerPage, setRowsPerPage] = React.useState(5);
const [checked, setChecked] = React.useState(false);

  const handleChange = (event) => {
    setChecked(event.target.checked);
  };

    // Avoid a layout jump when reaching the last page with empty rows.
    const emptyRows =
    page > 0 ? Math.max(0, (1 + page) * rowsPerPage - OrderDetails.length) : 0;

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
    };

const viewReceipt = async (OrderID) => {
    
    let data = {
      Order_ID: OrderID,
      
    }
    //   console.log('inside sub')
    //   dispatch(subItemCount(data))
  }

    const cancelOrder = (checked) => {
        console.log("checked"+ checked)
        if (checked) {
            fetch(`${backendurl}/order/cancel/${Cust_ID}`).then(res => res.json()).then(data => {
                console.log(data.product)
                let datadet = (data.product)
                console.log(data.product)
                setCancelDetails(datadet)
                console.log(CancelDetails)
            }).catch = (Error) => {
                console.log(Error)
            }
        }
    }
    function  handleDeliveryChange (e, orderID){
        console.log('inside delivery change'+ e.target.value+ orderID)
        let OrderID= orderID
        localStorage.setItem('DeliveryStatus', "Cancel order")
        setDelivery('Cancel Order')
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
    
    useEffect(() => {
        console.log("insideeee" + Cust_ID)
        if (Cust_ID === '') {
            history.push('./login')
        }
        fetch(`${backendurl}/order/${Cust_ID}`).then(res => res.json()).then(data =>{
            let datadet = JSON.parse(data.product)
            console.log(data.product)
            setOrderDetails(datadet)
            console.log(OrderDetails)
    }).catch=(Error)=>{
      console.log(Error)
    }
    },[Cust_ID,CancelDetails,delivery,localStorage.getItem('DeliveryStatus')])
        
    const openReceipt = (orderID) => {
        console.log(orderID)
        fetch(`${backendurl}/order/receipt/${orderID}`)
    .then(res => res.json())
            .then(data => {
        console.log(data.product)
    let tempTotal = 0;
        let dish2= (data.product.Order_Details)
        // setReceiptDetails(data)
        console.log(JSON.parse(dish2))
        let dish = JSON.parse(dish2)
        setReceiptDetails(dish)
        console.log(ReceiptDetails.length)
        let tot=0
        ReceiptDetails.map(details => {
            console.log(details.DishCost)
            tot= tot+ details.DishCost
        })
        setLength(dish.length)
        setSI(dish[0].SpecialInstructions)
        setTotal(tot)
        console.log(Total)
      handleOpen()
    
    // data.map((details)=>(
    // tempTotal += details.Dish_Cost * details.Dish_Count
    //     ))
    //     setTotal(tempTotal)
    //     console.log(Total)
    //     handleOpen()
    // }).catch=(Error)=>{
    //     console.log(Error)
     })
    }

    return (
        <div>
            <Navbar />
             <div><Checkbox
                checked={checked}
                onClick={checked=>cancelOrder(checked)}
                onChange={handleChange}
                inputProps={{ 'aria-label': 'controlled' }}
                label="Label">  </Checkbox>
                Show only Cancelled orders</div>
            <br/>
            <TableContainer component={Paper}>
                <Table>
                    {checked?<div><TableBody>
                        {/* {OrderDetails.map(details => ( */}
                        {(rowsPerPage > 0 ? CancelDetails.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage): CancelDetails).map((details) => (
                            <TableRow key={details.DishID}>
                            <TableCell>{ details.Order_ID}</TableCell>
                            <TableCell>{ details.Cust_Name}</TableCell>
                            <TableCell>{details.Rest_Name}</TableCell>
                            <TableCell>{details.Quantity}</TableCell>
                                <TableCell>{details.Order_Time}</TableCell>
                                <TableCell>{details.Delivery_Status}</TableCell>
                                <TableCell></TableCell>
                                
                                <TableCell
                                    // onClick={() => openReceipt(details.Order_ID)}
                                    onClick={handleOpen}
                                ><IconButton
                                size="small">View receipt</IconButton></TableCell>
                                <Modal
                                    open={open}
                                    onClose={handleClose}
                                    aria-labelledby="modal-modal-title"
                                    aria-describedby="modal-modal-description"
                                >
                                    <Box sx={style}>
                                        <h1>Receipt</h1>
                                        <h3>Total:   ${Total}</h3>
                                            <Grid container spacing={3} >
            {ReceiptDetails.map(details=>(
                <Grid  item md={12} key={details.DishID}>
                    <p>
                        {details.DishName}  {details.DishCost} x {details.DishCount}  ${details.DishCount*details.DishCost}  
                   </p> 
                </Grid>

            ))}
                                        </Grid>
                                        <div>
                                            Special Instructions : {SI}
                                        </div>
                                        
                                    </Box>
                                </Modal>
                            </TableRow>
                            
                    ))}
                    </TableBody></div>:
                    <TableBody>
                        {/* {OrderDetails.map(details => ( */}
                        {(rowsPerPage > 0 ? OrderDetails.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage): OrderDetails).map((details) => (
                        
                            

                            <TableRow key={details.DishID}>
                            <TableCell>{ details.Order_ID}</TableCell>

                            {/* <TableCell>{ details.CustName}</TableCell> */}
                            <TableCell>{details.Rest_Name}</TableCell>
                            <TableCell>{details.Quantity}</TableCell>
                            <TableCell>{details.Order_Time}</TableCell>
                            <TableCell>{details.Delivery_Status}</TableCell>
                                <TableCell><IconButton
                                    onClick={(e)=>handleDeliveryChange(e,details.Order_ID)}
                                size="small" color="secondary" variant="outlined">Cancel Order</IconButton></TableCell>
                                
                                <TableCell
                                    // onClick={() => openReceipt(details.Order_ID)}
                                     onClick={handleOpen}
                                ><IconButton
                                size="small">View receipt</IconButton></TableCell>
                                <Modal
                                    open={open}
                                    onClose={handleClose}
                                    aria-labelledby="modal-modal-title"
                                    aria-describedby="modal-modal-description"
                                >
                                    <Box sx={style}>
                                        <h1>Receipt</h1>
                                        <h3>Total:   $ 12.948{Total}</h3>
                                        <Grid container spacing={3} >
                                            <Grid  item md={12} key={details.DishID}>
                    <p>
                        French Fries {details.DishName}  12 x 1  = 12  
                   </p> 
                </Grid>
            {ReceiptDetails.map(details=>(
                <Grid  item md={12} key={details.DishID}>
                    <p>
                        French Fries {details.DishName}  {details.DishCost} x {details.DishCount}  ${details.DishCount*details.DishCost}  
                   </p> 
                </Grid>

            ))}
                                        </Grid>
                                        <div>
                                            Special Instructions : NA {SI}
                                        </div>
                                        
                                    </Box>
                                </Modal>
                            </TableRow>  
                    ))}
                    </TableBody>}
                    <TableFooter>
                        <TableRow>
                            <TablePagination
                            rowsPerPageOptions={[2, 5, 10, { label: 'All', value: -1 }]}
                            colSpan={3}
                            count={OrderDetails.length}
                            rowsPerPage={rowsPerPage}
                            page={page}
                            SelectProps={{
                                inputProps: {
                                'aria-label': 'rows per page',
                                },
                                native: true,
                                }}
                            onPageChange={handleChangePage}
                            onRowsPerPageChange={handleChangeRowsPerPage}
                            // ActionsComponent={TablePaginationActions}
                            >

                            </TablePagination>
                        </TableRow>
                    </TableFooter>
                </Table>
            </TableContainer>
        </div>
        );





}
