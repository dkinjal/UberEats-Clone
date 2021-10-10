import React, {useEffect, useState} from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import CartTable from './CartTable';
import { Link } from 'react-router-dom';


const style = {
    position: 'absolute',
    top: '50%',
    left: '73%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
  };

export default function Cart() {
  return (
    <div>
        <Box sx={style}>
          <h2>{localStorage.getItem('RestName')}</h2>
          <CartTable/>
          <br/>
          <Link to='/checkout'>
          <Button  variant="contained" color="success" >
                Proceed to checkout
            </Button>
            </Link>
        </Box>
      
    </div>
  );
}
