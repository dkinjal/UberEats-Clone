import React, {useEffect} from "react";
import  { Container } from '@material-ui/core';
import Grid from '@material-ui/core/Grid'
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import  {makeStyles}  from '@material-ui/core/';
import Button from '@mui/material/Button';
import { Link, useHistory } from 'react-router-dom';
import  {useState} from "react";
import UberEatsLogo from '../Uber-Eats-Logo.png'



const useStyles= makeStyles({
    button1: {
        width:200,
        height:50,
        fontSize: 100
      }
})


export default function Signup() {
    const Classes = useStyles()
    const [restname, setRestname]= useState('')
    const [password, setPassword]= useState('')
    const [email, setEmail]= useState('')
    const [location, setLocation]= useState('')
    const [error, setError]= useState('');
    const history = useHistory();

    function signup(){
        fetch(`http://localhost:4001/user/restsignup`,{
            method:'POST',
            headers:{"Content-type": "application/json"},
            body: JSON.stringify({
                restname:restname,
                email:email,
                location: location,
                password:password
            })})
            .then(res => res.json())
        .then(data => {setError(data.message)
        history.push("/restaurantLogin")}
        )
    }


    return(
        <Container>
        <div>
        <Grid
            container
            spacing={2}
            direction="column"
            alignItems="center"
            justify="center"
            style={{ minHeight: '100vh' }}
            >
            <Grid item xs={3}>
            <img src={UberEatsLogo} alt='' width="200" height="120" />
            
            </Grid>  
            <Grid item xs={3}> 
            <Typography variant="h4">Let's get started!</Typography>
            <Typography color="red">{error}</Typography>
            </Grid>
            <Grid item xs={3}> 
            {/* <Typography variant="h6">Enter your phone number</Typography> */}
            </Grid>
            <Box sx={{width:500}} >
             <Grid item > 
             <TextField fullWidth id="outlined-basic" size="small" label="Restaurant Name" 
             onChange={(e)=>{setRestname(e.target.value)}}
             variant="outlined" />
            <br/><br/>
            <TextField fullWidth id="outlined-basic" label="Email ID"
            onChange={(e)=>{setEmail(e.target.value)}}
             size="small" variant="outlined" />
            <br/><br/>
            <TextField fullWidth id="outlined-basic" label="Location" 
            onChange={(e)=>{setLocation(e.target.value)}}
            size="small" variant="outlined" />
            <br/><br/>
            <TextField fullWidth id="outlined-basic" 
            size="small"
            type="password" label="Password" 
            onChange={(e)=>{setPassword(e.target.value)}}
            variant="outlined" />
            </Grid>
            </Box>
            <Grid item>
            <Button  onClick={signup}
            className={Classes.button1} variant="contained" color="success">
                Sign Up
            </Button>
            </Grid>
            <Link to='/RestaurantLogin'>
            <Typography variant='overline'>
                Already a user? Sign in.
            </Typography>
            </Link>
            
        </Grid> 
                        
        </div>
        </Container>
    )
}