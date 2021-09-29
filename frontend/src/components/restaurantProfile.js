import React, {useEffect, useState} from "react";
import Stack from '@mui/material/Stack';
import Container from '@material-ui/core/Container'
import { CardContent, Typography } from "@material-ui/core";
import {FormControlLabel, makeStyles} from '@material-ui/core'
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import Navbar from './Navbar';
import Backdrop from '@mui/material/Backdrop';
import CountrySelect from './country'
import Button from '@mui/material/Button';
import Grid from '@material-ui/core/Grid';
import DishCard2 from './DishCard2';
import CardMedia from '@mui/material/CardMedia';
import Modal from '@mui/material/Modal';
import Fade from '@mui/material/Fade';
import ImageUpload from './ImageUpload'
import ProfileUpdate from './ProfileUpdate'
import addRestProfile from "./ProfileUpdate";
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
    const [RestLocation, setRestLocation] = useState()
    const [RestDeliveryMode, setRestDeliveryMode] = useState()
    const [RestTimingFrom, setRestTimingFrom] = useState({})
    const [RestTimingTo, setRestTimingTo] = useState({})
    const [RestContact, setRestContact] = useState({})
    const [RestProfile, setRestProfile] = useState({})
    const [open, setOpen] = React.useState(false);
    const [ifDisable, setIfDisable]= useState(true);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);
    const Restaurant_ID=1;
    




    useEffect(()=>{
      fetch(`http://localhost:4001/restaurant/menu/${Restaurant_ID}`)
      .then(res => res.json())
      .then(data =>{
        setDishDetails(data)})

      axios.get('http://localhost:4001/restaurant/one/1')
      .then(response => 
        {let data = (response.data[0])
          console.log(response.data[0])
          setRestDetails(response.data[0])
          setRestName(data.Restaurant_Name)
          setRestDescription(data.Restaurant_Description)
          setRestDayFrom(data.Restaurant_Day_From)
          setRestDayTo(data.Restaurant_Day_To)
          setRestCuisine(data.Restaurant_Cuisine)
          setRestID(data.Restaurant_ID)
          setRestLocation(data.Restaurant_Location)
          setRestDeliveryMode(data.Restaurant_Delivery_Mode)
          setRestTimingFrom(data.Restaurant_Time_From)
          setRestTimingTo(data.Restaurant_Time_To)
          setRestContact(data.Restaurant_Contact)
          setRestProfile(data.Restaurant_Profile_Location)
        })  
      },[])

    function onChangeDetails(event){
    let restDetailsTemp = this.state.restDetails;
    restDetailsTemp.name = event.target.value;
    this.setState({restDetails: restDetailsTemp});
    }

    
  
    return(
        <container>
            <Navbar className={Classes.navbar} position='absolute' style={{ position: 'fixed', top: 0 , left : 0,  margin: 0}}/>
        
        <Stack direction="column" spacing={3}>
        <div>
        <img onClick={handleOpen}  className={Classes.image} src={RestProfile} alt=''  />
        <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        open={open}
        onClose={handleClose}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}
        >
        <Fade in={open}>
          <Box sx={style}>
            <Typography id="transition-modal-title" variant="h6" component="h2">
              Update Profile Picture
            </Typography>
            <div>{ImageUpload()}</div>
            <Typography id="transition-modal-description" sx={{ mt: 2 }}>
              Make sure the image is jpg/ png/ gif.
            </Typography>
            
          </Box>
        </Fade>
      </Modal>
        </div>
        <Container>
        <Stack direction="row" spacing={3}>
          
            {/* <Avatar alt="Cindy Baker" src="http://localhost:3000/restaurant-profile.png"  */}
            {/* sx={{ width: 200, height: 200 }} /> */}
            
            <Box
             sx={{
                width: 750,
                height: 300,
                bgcolor: 'rgba(255, 255, 255, 0.7)',
                // '&:hover': {
                //   backgroundColor: 'rgba(255, 255, 255, 0.7)',
                //   opacity: [0.9, 0.8, 0.7],
                // },
              }} >
                
            <Stack direction="column" spacing={1} >
            <div><h1 disabled={ifDisable}>{RestName}</h1>
            <Typography disabled={ifDisable}>{RestDescription}</Typography></div>
                <br/>
                <TextField
                id="filled-disabled"
                disabled={ifDisable}
                label="Location"
                value={RestLocation}
                variant="filled"
                
                ></TextField>
                <TextField
                disabled={ifDisable}
                id="filled-disabled"
                label="Timings"
                defaultValue=""
                variant="filled"
                value={RestTimingFrom+'-'+RestTimingTo}
                onChange={(e)=>onChangeDetails}
               />
              

                <br/>
                <Typography>Contact</Typography>
                <TextField
                disabled={ifDisable}
                id="filled-disabled"
                label="Email"
                defaultValue=""
                variant="filled"
                value={RestContact}
                /> 
                <TextField
                id="filled-disabled"
                label="Phone"
                defaultValue=""
                variant="filled"
                disabled={ifDisable}
                value={RestContact}
                /> 
                <br/>   
                <Button 
                onClick={(e)=>setIfDisable(true)}
                variant='contained'
                color='success'>Edit</Button>
                <Button 
                variant='contained'
                color='success'>Save Changes</Button>
                 <Button 
                variant='outlined'
                >Logout</Button>
            </Stack>
            </Box>
            
            <Grid container spacing={3} >
            {DishDetails.map(details=>(
             
                <Grid item md={4} sm={6} key={details.Dish_ID}>
                    <DishCard2 DishDetails={details}/>
                </Grid>
               
            ))}
             <Grid item md={4} sm={6} >
            <Card  elevation={3} sx={{ maxWidth: 345,  }}>
            <CardMedia
              component="img"
              height="140"
              image="http://localhost:3000/burger.png"
              alt="Food image"
            />
              <CardContent>
                <Typography>Add Dish</Typography>
                
              </CardContent>
            </Card>
            </Grid>
            
          </Grid>
        </Stack>
        </Container>
        </Stack>
    
    </container>
    )
}