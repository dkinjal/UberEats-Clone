import React, {useState, useEffect} from "react";
import Avatar from '@mui/material/Avatar';
import Stack from '@mui/material/Stack';
import Container from '@material-ui/core/Container'
import { Typography } from "@material-ui/core";
import {FormControlLabel, makeStyles} from '@material-ui/core'
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import Navbar from './Navbar'
import CountrySelect from './country'
import Button from '@mui/material/Button';
const axios = require('axios');




const useStyles= makeStyles({
    field:{
      fontSize:'52'
    }
  })

export default function CustomerProfile(){
    const Classes = useStyles()
    const Cust_ID =1;
    const [CustDetails, setCustDetails] = useState([])
    const [CustName, setCustName] = useState([])
    const [CustDOB, setCustDOB] = useState([])
    const [CustCity, setCustCity] = useState([])
    const [CustState, setCustState] = useState([])
    const [CustCountry, setCustCountry] = useState([])
    const [CustPhone, setCustPhone] = useState([])
    const [CustEmail, setCustEmail] = useState([])
    const [CustNickname, setCustNickname] = useState([])

    const [CustProfile, setCustProfile] = useState([])


    useEffect(()=>{
      axios.get(`http://localhost:4001/customer/${Cust_ID}`)
      // fetch(`http://localhost:4001/customer/${Cust_ID}`)
      .then(res => 
          {let data = res.data[0];
          setCustDetails(res.data[0])
          setCustName(data.Cust_Name);
          setCustEmail(data.Cust_Email);
          setCustCity(data.Cust_City);
          setCustCountry(data.Cust_Country);
          setCustState(data.Cust_State);
          setCustNickname(data.Cust_Nickname);
          setCustPhone(data.Cust_Phone);
          setCustDetails(data.Cust_DOB);
          })
      },[])
  



    return(
        <div>
            <Navbar/>
        <Container>
        
        <Stack direction="row" spacing={3}>
            <Avatar alt="Cindy Baker" src="http://localhost:3000/girl-avatar.png" 
            sx={{ width: 200, height: 200 }} />
            
            <Box
             sx={{
                width: 300,
                height: 300,
                // bgcolor: 'rgba(255, 255, 255, 0.7)',
                // '&:hover': {
                //   backgroundColor: 'rgba(255, 255, 255, 0.7)',
                //   opacity: [0.9, 0.8, 0.7],
                // },
              }} >
            <Stack direction="column" spacing={1}>
            <div><h1 value= {CustName}>{CustName}</h1>
            <h2>{CustPhone}</h2></div>
                <br/>
                <TextField
                id="filled-disabled"
                label="DOB"
                value= {CustDOB}
                defaultValue="Hello World"
                variant="filled"
                onChange={e=>setCustDOB(e.target.value)}
                />
                
                <TextField
                id="filled-disabled"
                label="City"
                value= {CustCity}
                defaultValue="Hello World"
                variant="filled"
                onChange={e=>setCustCity(e.target.value)}
                />
                <TextField
                id="filled-disabled"
                label="State"
                value= {CustState}
                defaultValue="Hello World"
                variant="filled"
                onChange={e=>setCustState(e.target.value)}
                />
                <TextField
                id="filled-disabled"
                label="Country"
                value= {CustCountry}
                defaultValue="Hello World"
                variant="filled"
                onChange={e=>setCustCountry(e.target.value)}
                />
                <TextField
                id="filled-disabled"
                label="Nickname"
                value= {CustNickname}
                defaultValue="Hello World"
                variant="filled"
                onChange={e=>setCustNickname(e.target.value)}
                />
                <CountrySelect/>

                <br/>
                <Typography>Contact</Typography>
                <TextField
                id="filled-disabled"
                label="Phone"
                value= {CustPhone}
                onChange={e=>setCustPhone(e.target.value)}
                defaultValue="Hello World"
                variant="filled"
                />
                <TextField
                id="filled-disabled"
                label="Email"
                value= {CustEmail}
                onChange={e=>setCustEmail(e.target.value)}
                defaultValue="Hello World"
                variant="filled"
                /> 
                <br/> 
                <Button 
                variant='contained'
                color='success'>Save Changes</Button>

                <Button 
                variant='outlined'
                >Logout</Button>
            
              

            
            </Stack>
            </Box>
            
        </Stack>
    </Container>
    </div>
    )

            }
