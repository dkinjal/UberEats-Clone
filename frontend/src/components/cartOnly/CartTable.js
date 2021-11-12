import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import React, {useEffect, useState} from 'react';
import { useSelector, useDispatch } from "react-redux";
import { Button } from "@material-ui/core";
import {addToCart, clearCart, clearAdd, addItemCount, subItemCount} from "../../actions/cartAction";

export default function CartTable() {

  const Restaurant_ID=useSelector(state => state.addToCart.RestID)
  const dispatch = useDispatch();

  const[totalTax, setTotalTax]= useState(0)
  const TaxRate = 0.079
  const x = useSelector(state => state.addToCart.Cart)
  let subTotal = useSelector(state => state.addToCart.subTotal)
  useEffect(()=>{
    setTotalTax(TaxRate*subTotal)
  },[subTotal])

  const addItem = async (DishID) => {
    
    let data = {
      DishID: DishID,
      count : x.count
    }
      console.log('inside add')
      dispatch(addItemCount(data))
  }
  const subtractItemCount = async (DishID) => {
    
    let data = {
      DishID: DishID,
      count : x.count
    }
      console.log('inside sub')
      dispatch(subItemCount(data))
  }
return (
<TableContainer >
        <Table sx={{  }} aria-label="simple table">
        <TableHead>
        <TableRow>
            <TableCell align="left">Quantity</TableCell>
            <TableCell >Dish</TableCell>
            <TableCell align="right">Price</TableCell>
            </TableRow>
        </TableHead>
        <TableBody>
        {/* {rows.map((row) => ( */}
        {x.map((x)=>(
          
          <TableRow
              key={x.DishName}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
          >
            
            <TableCell component="th" scope="row">
              
              <Button
              size="small"
              disableElevation
              variant="contained"
              onClick={() => subtractItemCount(x.DishID)}
              > - </Button>
              {" " + x.count+" "}
              <Button
              size="small"
              disableElevation
              variant="contained"
              onClick={() => addItem(x.DishID)}
              >
                +
              </Button>
            </TableCell>
            <TableCell component="th" scope="row">
              {x.DishName}
            </TableCell>
            <TableCell align="right"
            component="th" scope="row">
              {x.DishCost}
            </TableCell>
            <TableCell>
            <Button
              size="small"
              disableElevation
              variant="contained"
              //onClick={() => subtractItemCount(x.DishID)}
            >Remove</Button>
            </TableCell>
        </TableRow>
          ))}
          <TableRow>
            <TableCell rowSpan={3} />
            <TableCell colSpan={2}>Subtotal</TableCell>
            <TableCell align="right">{subTotal}</TableCell>
          </TableRow>
          <TableRow>
            <TableCell>Tax</TableCell>
            <TableCell align="right">{`${(TaxRate * 100).toFixed(0)} %`}</TableCell>
            <TableCell align="right">{totalTax}</TableCell>
          </TableRow>
          <TableRow>
            <TableCell colSpan={2}>Total</TableCell>
            <TableCell align="right">{subTotal+ totalTax}</TableCell>
          </TableRow>
        </TableBody>
        </Table>  
        </TableContainer>
)
        }