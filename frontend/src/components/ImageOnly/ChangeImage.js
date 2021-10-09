import React, {useState, useEffect} from "react";
import Avatar from '@mui/material/Avatar';
import Modal from '@mui/material/Modal';
import ImageUpload from '../ImageUpload'
import { IconButton } from "@mui/material";
import Box from '@mui/material/Box';

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
export default function ChangeImage(props){
  console.log(props)
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
return(
  <div>
<IconButton onClick={handleOpen} >
            <Avatar
            alt="Cindy Baker" src={props.ImageLocation} 
            sx={{ width: 200, height: 200 }} />
            </IconButton>

      <Modal
              open={open}
              onClose={handleClose}
              aria-labelledby="modal-modal-title"
              aria-describedby="modal-modal-description"
            >
              <Box sx={style}>
                <ImageUpload calledFrom ={props.calledFrom} ID= {props.ID}/>
              </Box>
            </Modal>
            </div>
)
/* ------------------------------------------------------------------ */}


