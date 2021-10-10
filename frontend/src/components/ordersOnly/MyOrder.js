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

export default function MyOrders(){
    const [OrderDetails, setOrderDetails] = useState([])
    const [ReceiptDetails, setReceiptDetails] = useState([])
const[Total, setTotal]= useState([])
    const Cust_ID = useSelector(state => state.login.custID)
    const [open, setOpen] = React.useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);
     useEffect(()=>{
         console.log("insideeee")
        fetch(`http://localhost:4001/order/${Cust_ID}`)
        .then(res => res.json())
        .then(data =>{
          console.log(data)
          setOrderDetails(data)
          
        }).catch=(Error)=>{
          console.log(Error)
        }
        },[Cust_ID])
        
        const openReceipt=(orderID)=>{
          fetch(`http://localhost:4001/order/receipt/${orderID}`)
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
                <Container>
                <List>
                <ListSubheader><h2>Past Orders</h2></ListSubheader>
                {OrderDetails.map(details=>(
                <ListItemButton onClick={()=>openReceipt(details.Order_ID)}>
                <ListItem item md={3} key={details.Order_ID}>
                    <ListItemText><b>{details.Restaurant_Name}</b></ListItemText>
                    <ListItemText>{details.Quantity} items</ListItemText>
                    <ListItemText>{details.Order_Time}</ListItemText>
                    <ListItemText>{details.Delivery_Status}</ListItemText>
                    <ListItemText>View receipt</ListItemText>
                  </ListItem>
                  </ListItemButton>
            ))}
                </List>
                <Modal
                  open={open}
                  onClose={handleClose}
                  aria-labelledby="modal-modal-title"
                  aria-describedby="modal-modal-description"
                >
                  <Box sx={style}>
                  <List>
                <ListSubheader><h2>Receipt</h2></ListSubheader>
                <ListItem >
                    <ListItemText><b>Dish</b></ListItemText>
                    <ListItemText><b>Quantity</b></ListItemText>
                    <ListItemText><b>Cost</b></ListItemText>
                    <ListItemText><b>Total Price</b></ListItemText>
                  </ListItem>
                {ReceiptDetails.map((details)=>(
                <ListItem item md={3} key={details.Order_ID}>
                    <ListItemText><b>{details.Dish_Name}</b></ListItemText>
                    <ListItemText>{details.Dish_Count} x</ListItemText>
                    <ListItemText>{details.Dish_Cost} $</ListItemText>
                    <ListItemText>{details.Dish_Cost* details.Dish_Count}$</ListItemText>
                  </ListItem>
                  
                ))}
             <Divider />
             <ListItem>
             <ListItemText><b>Bill Amount: {1.079*Total}</b></ListItemText>
             </ListItem>

                </List>
                  </Box>
                </Modal>
                </Container>
            </div>
          );





}
