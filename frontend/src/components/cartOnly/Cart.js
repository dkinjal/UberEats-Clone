import React, {useEffect, useState} from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import CartTable from './CartTable';
import { Link } from 'react-router-dom';
import TextField from '@mui/material/TextField';
import backendurl from "../../url";
import { useSelector, useDispatch } from "react-redux";

const axios = require('axios');


const style = {
    position: 'absolute',
    top: '50%',
    left: '73%',
    transform: 'translate(-50%, -50%)',
    width: 435,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
  };


export default function Cart() {

  const [SpecialInstructions, setSpecialInstructions] = useState([]);
  const x = useSelector(state => state.addToCart.Cart)
  let current = useSelector(state=> state.addToCart.totalCount)
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
  return (
    <div>
        <Box sx={style}>
          <h2>{localStorage.getItem('RestName')}</h2>
          <CartTable/>
        <br />
        {/* <TextField width='200'
          id="outlined-multiline-static"
          label="Special Instructions"
          multiline
          onChange={e=>setSpecialInstructions(e.target.value)}
          rows={2}
        /> */}
        <br/><br/>
        {current ?
          <Link to='/checkout'>
            <Button variant="contained" color="success" onClick={addInstruction} >
              Proceed to checkout
            </Button>
          </Link>:<div></div>
}
        </Box>
      
    </div>
  );
}
