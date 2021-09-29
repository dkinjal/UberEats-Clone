import * as React from 'react';
import Stack from '@mui/material/Stack';
import Box from '@mui/material/Box';
import Grid from '@material-ui/core/Grid'
import { Container } from '@material-ui/core';
import Drawer from '@mui/material/Drawer';
import Toolbar from '@mui/material/Toolbar';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import Divider from '@mui/material/Divider';
import InboxIcon from '@mui/icons-material/MoveToInbox';
import ListItemText from '@mui/material/ListItemText';
import  {makeStyles}  from '@material-ui/core/';

import RestaurantList from './restaurantList'
import Navbar from './Navbar'

const useStyles= makeStyles({
    nav:{
        display:'flex'
    }
})
export default function HomePage() { 
    const classes = useStyles
    return(
        <div>

            <Navbar/>
            
            <Stack direction="row">
                <Box>
                <Container>
                   
                </Container>
                </Box>
                <Box>
                <Container>
                    <RestaurantList/>
                </Container>
                </Box>

            </Stack>
        </div>
    )
}