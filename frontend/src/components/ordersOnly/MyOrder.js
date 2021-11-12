import React, {useEffect, useState} from 'react';
import { DataGrid } from '@material-ui/data-grid';
import Grid from '@material-ui/core/Grid';
import { styled } from '@mui/material/styles';
import Paper from '@mui/material/Paper';
import ListSubheader from '@mui/material/ListSubheader';
import Modal from '@mui/material/Modal';
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
  width:500,
  
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};

export default function MyOrders() {
    const [OrderDetails, setOrderDetails] = useState([])
    const [ReceiptDetails, setReceiptDetails] = useState([])
    const[Total, setTotal]= useState([])
    const Cust_ID = useSelector(state => state.login.custID)
    const [open, setOpen] = React.useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);
    const [page, setPage] = React.useState(0);
    const [rowsPerPage, setRowsPerPage] = React.useState(5);

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
    useEffect(() => {
        console.log("insideeee")
        fetch(`${backendurl}/order/${Cust_ID}`).then(res => res.json()).then(data =>{
        console.log(data)
        setOrderDetails(data)
    }).catch=(Error)=>{
      console.log(Error)
    }
    },[Cust_ID])
        
    const openReceipt=(orderID)=>{
        fetch(`${backendurl}/order/receipt/${orderID}`)
    .then(res => res.json())
    .then(data =>{
        let tempTotal = 0;
    console.log(data)
    setReceiptDetails(data)
    
    data.map((details)=>(
    tempTotal += details.Dish_Cost * details.Dish_Count
        ))
        setTotal(tempTotal)
        console.log(Total)
        handleOpen()
    }).catch=(Error)=>{
        console.log(Error)
    }
    }

    return (
        <div>
            <Navbar/>
            <TableContainer component={Paper}>
                <Table>
                    <TableBody>
                        {/* {OrderDetails.map(details => ( */}
                        {(rowsPerPage > 0 ? OrderDetails.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage): OrderDetails).map((details) => (
                        <TableRow key={details.orderID}>
                            <TableCell>{ details.Order_ID}</TableCell>
                            <TableCell>{details.Restaurant_Name }</TableCell>
                            <TableCell>{details.Quantity}</TableCell>
                            <TableCell>{details.Order_Time}</TableCell>
                            <TableCell>{details.Delivery_Status}</TableCell>
                            <TableCell>View receipt</TableCell>

                        </TableRow>
                    ))}
                    </TableBody>
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
