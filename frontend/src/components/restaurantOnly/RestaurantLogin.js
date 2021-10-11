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
import uberEatsLogo from '../Uber-Eats-Logo.png';
import { useSelector, useDispatch } from "react-redux";
import { restLogin, restClear } from "../../actions/restLoginAction";
import axios from "axios";
import backendurl from "../../url";

const useStyles= makeStyles({
    button1: {
        width:200,
        height:50,
        fontSize: 20
      }
})


export default function Login() {
    const [email, setEmail]= useState('')
    const [password, setPassword]= useState('')
    const [error, setError]= useState('');
    const history =useHistory();
    const dispatch = useDispatch();
    const redux_data = useSelector(state => state.restLogin);
    console.log(redux_data.pass+ 'redux data')
    const isPassed = redux_data.pass;
    const isError = redux_data.error;
    console.log(isPassed, isError)
    useEffect(() => {
        if (isPassed===true){
            history.push('/restaurantProfile')
        }

        if (isError){
            dispatch(restClear());

        }
    // }, [isPassed, isError, dispatch])
    },[dispatch, history, isError, isPassed, redux_data])

    const restLoginUser= async()=>{
        dispatch(restClear());
        //const email_val = /^\S+@\S+\.\S+$/
        // if (!email_val.test(email)){
        //     console.log('email')
        //     notify(`Invalid Email`)
        //     return
        // }
        if (password.length === 0){
           
            return
        }
        let data = {
            email: email,
            password: password
        }
        dispatch(restLogin(data));
        axios.defaults.withCredentials = true;
    }
    // function login(){
    //     fetch(`${backendurl}/user/restlogin`,{
    //         method:'POST',
    //         headers:{"Content-type": "application/json"},
    //         body: JSON.stringify({
    //             email:email,
    //             password:password
    //         })})
    //         .then(res => res.json())
    //     .then(data => {setError(data.message)
    //         history.push('./restaurantProfile')
    //     })
    // }


    const Classes = useStyles()
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
            <img src={uberEatsLogo} alt='' width="200" height="120" />
            <br/>
            </Grid>  
            <Grid item xs={3}> 
            <Typography variant="h4">Welcome back</Typography>
            </Grid>
            <Grid item xs={3}> 
            <Typography>Sign in with your email ID.</Typography>
            <Typography color="red">{error}</Typography>
            </Grid>
            <Box sx={{width:500}} >
            <Grid item > 
            
            <TextField fullWidth id="outlined-basic" label="User ID" 
            onChange={(e)=>{setEmail(e.target.value)}}
            variant="outlined"/>
            <br/><br/>
            <TextField type="password"
             fullWidth id="outlined-basic" label="Password" 
            onChange={(e)=>{setPassword(e.target.value)}}
            variant="outlined" />
            </Grid>
            </Box>
            <Grid item>
            <Button onClick={restLoginUser} className={Classes.button1} variant="contained" color="success">
                Login
            </Button>
            </Grid>
            <Link to='/restaurantSignup'>
            <Typography variant='overline'>
                New to Uber? Create an account.
            </Typography>
            </Link>
        </Grid> 
                        
        </div>
        </Container>
    )
}