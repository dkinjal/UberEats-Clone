import React from "react";
import Navbar from './Navbar'
import food from '../images/food.png'
import Paper from '@mui/material/Paper';

const styles = {
    paperContainer: {
        backgroundImage: `url(${food})`,
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
        backgroundSize: "cover",
        overflow:"hidden",
        display: "flex",
        alignItems: "center",
        zIndex: -1,
        width: '100vw',
        height: '100vh',
    },
    Nav:{
        position:"fixed",
        margin:'0',
        padding:"0"
    }
};

export default function Landing() {
    return (
        <div>
        <Navbar style={styles.Nav} />  
        <Paper  style={styles.paperContainer}>
          
        </Paper>
        </div>



    )}