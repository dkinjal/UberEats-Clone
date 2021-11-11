import React, {useEffect, useState} from "react";
import Stack from '@mui/material/Stack';
import Container from '@material-ui/core/Container'
import { CardContent, Typography } from "@material-ui/core";
import {FormControlLabel, makeStyles} from '@material-ui/core'
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import Navbar from './Navbar';
import { useSelector, useDispatch } from "react-redux";
import backendurl from "../url";
import Backdrop from '@mui/material/Backdrop';
import CountrySelect from './country'
import Button from '@mui/material/Button';
import Grid from '@material-ui/core/Grid';
import { Link } from 'react-router-dom';
import DishCard2 from './DishCard2';
import CardMedia from '@mui/material/CardMedia';
import Modal from '@mui/material/Modal';
import Fade from '@mui/material/Fade';
import ImageUpload from './ImageUpload'
import ProfileUpdate from './ProfileUpdate'
import addRestProfile from "./ProfileUpdate";
import { IconButton } from "@mui/material";
import Avatar from '@mui/material/Avatar';

import { Card } from "@mui/material";
const axios = require('axios');



const useStyles= makeStyles({
    field:{
      fontSize:'52'
    },
    image:{
      display:'block',
      objectFit:'cover',
      overflow:'hidden',
      maxHeight:300,
      margin:0,
      width:1349,
      
    },
    navbar:{
      margin:0
    }
  })
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
  
export default function RestaurantProfile(){
    const Classes = useStyles()
    const [DishDetails, setDishDetails] = useState([])
    const [RestDetails, setRestDetails] = useState({})
    const [RestName, setRestName] = useState()
    const [RestDescription, setRestDescription] = useState()
    const [RestDayFrom, setRestDayFrom] = useState()
    const [RestDayTo, setRestDayTo] = useState()
    const [RestCuisine, setRestCuisine] = useState()
    const [RestID, setRestID] = useState()
    const [RestEmail, setRestEmail] = useState()
    const [RestLocation, setRestLocation] = useState()
    const [RestDeliveryMode, setRestDeliveryMode] = useState()
    const [RestTimingFrom, setRestTimingFrom] = useState({})
    const [RestTimingTo, setRestTimingTo] = useState({})
    const [RestContact, setRestContact] = useState({})
    const [RestProfile, setRestProfile] = useState({})
    const [RestType, setRestType] = useState({})
    const [open, setOpen] = React.useState(false);
    const [ifDisable, setIfDisable]= useState(true);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);
    const Restaurant_ID=useSelector(state => state.restLogin.restID)
    const dispatch = useDispatch();

    
    

  const getRestOne = () => {
  console.log("inside restone")
  axios.get(`${backendurl}/restaurant/one/${Restaurant_ID}`)
      .then(response => 
        {let data = (response.data.product)
          console.log(JSON.stringify(response.data.product)+"getrestone")
          setRestDetails(response.data[0])
          setRestName(data.Restaurant_Name)
          setRestDescription(data.Restaurant_Description)
          setRestDayFrom(data.Restaurant_Day_From)
          setRestDayTo(data.Restaurant_Day_To)
          setRestCuisine(data.Restaurant_Cuisine)
          setRestID(data.Restaurant_ID)
          setRestType(data.Restaurant_Type)
          setRestLocation(data.Restaurant_Location)
          setRestDeliveryMode(data.Restaurant_Delivery_Mode)
          setRestTimingFrom(data.Restaurant_Time_From)
          setRestTimingTo(data.Restaurant_Time_To)
          setRestContact(data.Restaurant_Contact)
          setRestEmail(data.Restaurant_Email)
          setRestProfile(data.Restaurant_Profile_Location)
        }).catch=(error)=>{
          console.log(error)
        }  
      }


     useEffect(()=>{
       fetch(`${backendurl}/restaurant/menu/${Restaurant_ID}`)
      .then(res => res.json())
        .then(data => {
        console.log(data.product)
          setDishDetails(JSON.parse(data.product))
        console.log(DishDetails+"dish details")})
        .catch=(error)=>{
          console.log(error)
        }
      console.log(Restaurant_ID+'rrr'+ DishDetails)
      
      getRestOne();
      // axios.get(`${backendurl}/restaurant/one/${Restaurant_ID}`)
      // .then(response => 
      //   {let data = (response.data[0])
      //     console.log(response.data[0])
      //     setRestDetails(response.data[0])
      //     setRestName(data.Restaurant_Name)
      //     setRestDescription(data.Restaurant_Description)
      //     setRestDayFrom(data.Restaurant_Day_From)
      //     setRestDayTo(data.Restaurant_Day_To)
      //     setRestCuisine(data.Restaurant_Cuisine)
      //     setRestID(data.Restaurant_ID)
      //     setRestType(data.Restaurant_Type)
      //     setRestLocation(data.Restaurant_Location)
      //     setRestDeliveryMode(data.Restaurant_Delivery_Mode)
      //     setRestTimingFrom(data.Restaurant_Time_From)
      //     setRestTimingTo(data.Restaurant_Time_To)
      //     setRestContact(data.Restaurant_Contact)
      //     setRestEmail(data.Restaurant_Email)
      //     setRestProfile(data.Restaurant_Profile_Location)
      //   }).catch=(error)=>{
      //     console.log(error)
      //   }  
      },[Restaurant_ID, RestDetails])

    function onChangeDetails(event){
    let restDetailsTemp = this.state.restDetails;
    restDetailsTemp.name = event.target.value;
    this.setState({restDetails: restDetailsTemp});
    }
    const editRestaurant =(e)=>{
      e.preventDefault();
      setIfDisable(false)
    }
    const updateRestaurant=()=>{
      console.log(RestName)
      axios.post(`${backendurl}/restaurant/${RestID}`,{
              
              RestName: RestName,
              RestTimingFrom: RestTimingFrom,
              
              RestEmail: RestEmail,
              RestContact: RestContact,
              RestDescription: RestDescription,
              RestType: RestType,
              RestDayFrom: RestDayFrom,
             
              RestDeliveryMode: RestDeliveryMode,
              RestCuisine: RestCuisine


          })
          .then(response=>{
              setIfDisable(true)
              //history.push('/restaurantProfile')
              //history.goBack();
          })
  }
  console.log(DishDetails+"khullllaaa")
    return(
        <div>
          <Navbar className={Classes.navbar} position='absolute' style={{ position: 'fixed', top: 0 , left : 0,  margin: 0}}/>
          <Container>
          <Stack direction="row" spacing={3}>
            <div>
            <IconButton onClick={handleOpen} >
            <Avatar
            alt="Cindy Baker" src={RestProfile} 
            sx={{ width: 200, height: 200 }} />
            </IconButton>
{/* ------------------------------------------------------------------------ */}
      <Modal
              open={open}
              onClose={handleClose}
              aria-labelledby="modal-modal-title"
              aria-describedby="modal-modal-description"
            >
              <Box sx={style} >
                
                <ImageUpload setRestProfile={setRestProfile} handleClose= {handleClose} calledFrom="rest" ID={RestID}/>
               
              </Box>
            </Modal>

            
            <Box
             sx={{
              width: 350,
              height: 300,
               
              }} >
                
            <Stack direction="column" spacing={1} >
            <div><h1 disabled={ifDisable}>{RestName}</h1>
            <Typography disabled={ifDisable}>{RestDescription}</Typography></div>
                <br/>
                <Typography>Location</Typography>
                <TextField
                id="filled-disabled"
                disabled={ifDisable}
                label=""
                value={RestLocation}                
                defaultValue=""
                onChange={(e)=>setRestLocation(e.target.value)}
                >{RestLocation}</TextField>
                <TextField
                disabled={ifDisable}
                id="filled-disabled"
                label="Working Days"
                defaultValue=""
                value={RestDayFrom}
                onChange={(e)=>setRestDayFrom(e.target.value)}
               />
                <TextField
                disabled={ifDisable}
                id="filled-disabled"
                label="Timings"
                defaultValue=""
                
                value={RestTimingFrom}
                onChange={(e)=>setRestTimingFrom(e.target.value)}
               />
                <TextField
                id="filled-disabled"
                disabled={ifDisable}
                label="Delivery Mode"
                value={RestDeliveryMode}                
                defaultValue=""
                onChange={(e)=>setRestDeliveryMode(e.target.value)}
                ></TextField>
                <TextField
                disabled={ifDisable}
                id="filled-disabled"
                label="Cuisine"
                defaultValue=""
                
                value={RestCuisine}
                onChange={(e)=>setRestCuisine(e.target.value)}
               />
              

                <br/>
                <Typography>Contact</Typography>
                <TextField
                disabled={ifDisable}
                id="filled-disabled"
                label=""
                defaultValue=""
               
                value={RestEmail}
                onChange={(e)=>setRestEmail(e.target.value)}
                /> 
                <TextField
                id="filled-disabled"
                label="Phone"
                defaultValue=""
                readOnly={true}
                disabled={ifDisable}
                value={RestContact}
                onChange={(e)=>setRestContact(e.target.value)}
                /> 
                <br/>   
                <Button 
                onClick={editRestaurant}
                variant='contained'
                color='success'>Edit</Button>
                <Button 
                onClick={updateRestaurant}
                variant='contained'
                color='success'>Save Changes</Button>
                 <Button 
                variant='outlined'
                >Logout</Button>
            </Stack>
            </Box>
            </div>
            <Grid container spacing={3} >
            {/* {DishDetails.map(details=>(
             
                <Grid item md={4} sm={6} key={details.Dish_ID}>
                    <DishCard2 DishDetails={details}/>
                </Grid>
               
            ))}
             */}
              
              {DishDetails && DishDetails.map(details => (
                
                <Grid item md={4} sm={6} key={details.Dish_ID}>
                    <DishCard2 DishDetails={details}/>
                </Grid>
               
            ))}
             <Grid item md={4} sm={6} >
            <Link to={"/addDish?Rest_ID="+ Restaurant_ID} >
            
            <Card  elevation={3} sx={{ maxWidth: 345, minHeight:307 }}>
            <CardMedia
              component="img"
              height="140"
              image="https://uber-bucket-kd.s3.us-west-1.amazonaws.com/nachos-1633732889680.png"
              alt="Food image"
            />
              <CardContent>
                <Typography>Add Dish</Typography>
              </CardContent>
            </Card>
            </Link>
            </Grid>
            
          </Grid>
        </Stack>
        </Container>
       
    
    </div>
    )
}