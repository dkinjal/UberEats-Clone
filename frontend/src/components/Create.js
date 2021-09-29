import React, {useEffect} from "react";
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import Container from '@material-ui/core/Container'
import KeyboardArrowRightOutlinedIcon from '@mui/icons-material/KeyboardArrowRightOutlined';
import {FormControlLabel, makeStyles} from '@material-ui/core'
import TextField  from "@material-ui/core/TextField";
import Radio from '@material-ui/core/Radio'
import RadioGroup from '@material-ui/core/RadioGroup'
import FormLabel from '@material-ui/core/FormLabel'
import  FormControl  from "@material-ui/core/FormControl";
import  {useState} from "react";
import { useHistory } from "react-router-dom";

import Navbar from './Navbar'

const useStyles= makeStyles({
  field:{
    marginTop:20,
    marginBottom:20,
    display:'block'
  }
})
export default function Create(){
  useEffect(()=>{
    fetch('http://localhost:4001/getRestaurantDetails/1')
    .then(res => res.json())
    .then(data =>{setDetails(data)})
    .catch(function() {
      console.log("error");})
  },[])


  const Classes = useStyles()
  const [title, setTitle]= useState('')
  const [titleError, setTitleError]= useState(false)
  const [radio, setRadio]= useState('abc')
  const [details, setDetails] = useState([])
  const history= useHistory();
  const handleSubmit=(e)=>{

    e.preventDefault()
    setTitleError(false)
    if(title==''){
      setTitleError(true)
    }
    if(title){
      console.log(title);
      fetch('http://localhost:4001/newRestaurantDetails',{
        method:'POST',
        headers:{"Content-type": "application/json"},
        body: JSON.stringify({"Restaurant_Name":"Frontend",
        "Restaurant_Description":"TRIAL" ,
        "Restaurant_Contact":"762" ,
        "Restaurant_Type":"Veg",
        "Restaurant_Time_From":"12:12:12",
        "Restaurant_Time_To":"11:11:11",
        "Restaurant_Delivery_Mode":"Dine-in",
        "Restaurant_Cuisine":"Chinese",
        "Restaurant_Day_From":"Mon" ,
        "Restaurant_Day_To":"Sun"})
      }).then(()=>{history.push('/')})
    }
  }


return(
  <div>
  <Navbar/>
  <Container>
    
    <Typography
    variant="h6"
    component='h2'
    color='textSecondary'
    gutterBottom>
    Hello
    </Typography>
    
    {details.map(detail =>(
      <p key={detail.Restaurant_ID}>{detail.Restaurant_Name}</p>
    ))}

    <form noValidate onSubmit={handleSubmit}>
      <TextField
      onChange={(e)=>{setTitle(e.target.value)}}
      className={Classes.field}
      label="Note"
      variant="outlined"
      color="secondary"
      fullWidth
      required
      error={titleError}>
      </TextField>

      


      
      <FormControl>
        <FormLabel>Radio</FormLabel>
        <RadioGroup value={radio} onChange={(e)=>setRadio(e.target.value)}>
          <FormControlLabel control={<Radio/>} label="aaa" value='aaa'/>
          <FormControlLabel control={<Radio/>} label="abc" value='abc'/>
          <FormControlLabel control={<Radio/>} label="bbb" value='bbb'/>
        </RadioGroup>
      </FormControl>
      <br/>
      <Button type='submit' 
      color='primary' 
      variant='contained' 
      endIcon= {<KeyboardArrowRightOutlinedIcon />}>
      Submit
      </Button>
    </form>

    
  </Container>
  </div>
)
}