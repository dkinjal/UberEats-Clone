import React, {useState, useEffect} from "react";
import Avatar from '@mui/material/Avatar';
import Stack from '@mui/material/Stack';
import Container from '@material-ui/core/Container'
import { Typography } from "@material-ui/core";
import {FormControlLabel, makeStyles} from '@material-ui/core'
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import Navbar from './Navbar';
import CountrySelect from './country'
import Button from '@mui/material/Button';
import Modal from '@mui/material/Modal';
import ImageUpload from "./ImageUpload";
import backendurl from "../url";
import { IconButton } from "@mui/material";
const axios = require('axios');


const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};



export default function CustomerProfile(){
    const CustID =1;
    const [CustName, setCustName] = useState([])
    const [CustDOB, setCustDOB] = useState([])
    const [CustStreet, setCustStreet] = useState([])

    const [CustCity, setCustCity] = useState([])
    const [CustState, setCustState] = useState([])
    const [CustCountry, setCustCountry] = useState([])
    const [CustPhone, setCustPhone] = useState([])
    const [CustEmail, setCustEmail] = useState([])
    const [CustNickname, setCustNickname] = useState([])
    const [CustProfile, setCustProfile] = useState([])
    const [open, setOpen] = React.useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    const saveChanges=()=>{
      console.log(CustCountry)
      axios.post(`${backendurl}/customer/${CustID}`,{
              
              Cust_Name: CustName,
              Cust_DOB: CustDOB,
              Cust_City: CustCity,
              Cust_State: CustState,
              Cust_Country: CustCountry,
              Cust_Nickname: CustNickname,
              Cust_Email: CustEmail,
              Cust_Phone: CustPhone,
              Cust_Street: CustStreet


          })
          .then(response=>{
              
              //history.push('/restaurantProfile')
              //history.goBack();
          })
    }
    useEffect(()=>{
      axios.get(`${backendurl}/customer/${CustID}`)
      .then(res => 
          {let data = res.data[0];
          // setCustDetails(res.data[0])
          setCustName(data.Cust_Name);
          setCustEmail(data.Cust_Email);
          setCustCity(data.Cust_City);
          setCustCountry(data.Cust_Country);
          setCustState(data.Cust_State);
          setCustNickname(data.Cust_Nickname);
          setCustPhone(data.Cust_Phone);
          setCustDOB(data.Cust_DOB);
          setCustProfile(data.Cust_Profile_Location)
          setCustStreet(data.Cust_Street)
          })
      },[])
  



    return(
        <div>
            <Navbar/>
        <Container>
        <Stack direction="row" spacing={3}>
            <IconButton onClick={handleOpen} >
            <Avatar
            alt="Cindy Baker" src={CustProfile} 
            sx={{ width: 200, height: 200 }} />
            </IconButton>
{/* ------------------------------------------------------------------------ */}
      <Modal
              open={open}
              onClose={handleClose}
              aria-labelledby="modal-modal-title"
              aria-describedby="modal-modal-description"
            >
              <Box sx={style}>
                <ImageUpload calledFrom="cust" ID={CustID}/>
              </Box>
            </Modal>
{/* ------------------------------------------------------------------ */}
            
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
                label="Street"
                value= {CustStreet}
                variant="filled"
                onChange={e=>setCustStreet(e.target.value)}
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
                
                />
                <TextField
                id="filled-disabled"
                label="Nickname"
                value= {CustNickname}
                defaultValue="Hello World"
                variant="filled"
                onChange={e=>setCustNickname(e.target.value)}
                />
                <CountrySelect 
                setCustCountry={setCustCountry}
                CustCountry={CustCountry}/>
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
                color='success'>Edit</Button>
                
                <Button 
                onClick={saveChanges}
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
