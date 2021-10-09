import React, {useEffect} from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { useSelector, useDispatch } from "react-redux";

const style = {
    position: 'absolute',
    top: '20%',
    left: '73%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
  };

export default function Cart() {
  
  let length= useSelector(state => state.addToCart.Cart.length);
  let length1=length;
  console.log(length+'length')
  const x = useSelector(state => state.addToCart.Cart)
  function createData(count, name, cost) {
    return { count, name, cost};
  }
  //const [rows, setRows] = React.useState();
  useEffect(()=>{
  // for(let i=0; i<length;i++)
  // {
  //   let cart=x.Cart[i];
  //   let DishName= cart.DishName
  // setRows(rows+ [createData(cart.DishID,DishName, cart.DishCost )])
  // }
  
},[])
  
  
  return (
    <div>
      
     
        <Box sx={style}>
          <h2>{localStorage.getItem('RestName')}</h2>
        <TableContainer component={Paper}>
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
                {x.count}
              </TableCell>
              <TableCell component="th" scope="row">
                {x.DishName}
              </TableCell>
              <TableCell component="th" scope="row">
                {x.DishCost}
              </TableCell>
        
        </TableRow>
          ))}
          
        </TableBody>
        </Table>  
        </TableContainer>
        </Box>
      
    </div>
  );
}
