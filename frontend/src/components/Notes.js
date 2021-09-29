import React from "react";
import Avatar from '@mui/material/Avatar';
import Stack from '@mui/material/Stack';
import Navbar from './Navbar'
export default function Notes(){
    return(
        <div>
          <Navbar/>
        <h1>hello</h1>
        <Stack direction="row" spacing={2}>
      
      <Avatar alt="Cindy Baker" src="girl-avatar.png" />
    </Stack>
    </div>
    )
}