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
import UberEatsLogo from '../Uber-Eats-Logo.png';
import cookie from 'react-cookies';
import {Redirect} from 'react-router';
import axios from "axios";
import { useSelector, useDispatch } from "react-redux";
import {login, clear} from "../../actions/loginAction";


const useStyles= makeStyles({
    button1: {
        width:200,
        height:50,
        fontSize: 20
      }
})

export default function Login() {
    const [email, setEmail]= useState('');
    const [password, setPassword]= useState('');
    const [error, setError]= useState('');
    const history = useHistory();
    const dispatch = useDispatch();
    const redux_data = useSelector(state => state.login);
    const isPassed = redux_data.pass;
    const isError = redux_data.error;

    useEffect(() => {
        if (isPassed===true){
            history.push('/landing')
        }

        if (isError){
            dispatch(clear());
        }
    // }, [isPassed, isError, dispatch])
    },[dispatch, history, isError, isPassed, redux_data])

    const loginUser= async()=>{
        //dispatch(clear());
        const email_val = /^\S+@\S+\.\S+$/
        // if (!email_val.test(email)){
        //     console.log('email')
            
        //     return
        // }
        if (password.length === 0){
            return
        }
        let data = {
            email: email,
            password: password
        }
        console.log(data)
        dispatch(login(data));
        axios.defaults.withCredentials = true;
        }

    const Classes = useStyles()
    let redirectVar = null;
    console.log(cookie);
        if(cookie.load('cookie')){
            redirectVar = <Redirect to= "/login"/>
        }
    return(


        <Container>
            <div>{redirectVar}</div>
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
            <br/>
            </Grid>  
            <Grid item xs={3}> 
            <Typography variant="h4">Welcome back</Typography>
            </Grid>
            <Grid item xs={3}> 
            <Typography>Sign in with your Email</Typography>
            <Typography color="red">{error}</Typography>
            </Grid>
            <Box sx={{width:500}} >
            <Grid item > 
            
            <TextField fullWidth id="outlined-basic" label="Email ID" 
            onChange={(e)=>{setEmail(e.target.value)}}
            variant="outlined" />
            <br/><br/>
            <TextField type="password"
             fullWidth id="outlined-basic" label="Password" 
            onChange={(e)=>{setPassword(e.target.value)}}
            variant="outlined" />
            </Grid>
            </Box>
            <Grid item>
            <Button onClick={loginUser} className={Classes.button1} variant="contained" color="success">
                Login
            </Button>
            </Grid>
            <Link to='/signup'>
            <Typography variant='overline'>
                New to Uber? Create an account.
            </Typography>
            </Link>
        </Grid> 
                        
        </div>
        </Container>
    )
}