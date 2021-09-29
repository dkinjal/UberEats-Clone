import React, {useEffect, useState} from 'react';
import { DataGrid } from '@material-ui/data-grid';
import Grid from '@material-ui/core/Grid';
import { styled } from '@mui/material/styles';
import Paper from '@mui/material/Paper';
import { Container } from '@mui/material';
import Navbar from '../Navbar'

const Item = styled(Paper)(({ theme }) => ({
    ...theme.typography.body2,
    padding: theme.spacing(1),
    textAlign: 'center',
    color: theme.palette.text.secondary,
  }));
export default function Orders(){
    const [OrderDetails, setOrderDetails] = useState([])
    useEffect(()=>{
        fetch(`http://localhost:4001/order/${1}`)
        .then(res => res.json())
        .then(data =>{
          console.log(data)
          setOrderDetails(data)})
        },[])

        const columns=[{ field: 'Cust_ID', headerName: 'Customer ID', width: 180 },
        { field: 'Dish_Name', headerName: 'Dish_Name', width: 180 },
        { field: 'Delivery_Status', headerName: 'Delivery Status', width: 180 },
        { field: 'Order_Status', headerName: 'Order Status', width: 180 },
        { field: 'Order_ID', headerName: 'Order ID', width: 180 },
        { field: 'Order_Mode', headerName: 'Order Mode', width: 180 }]
        
        
        
        return (
            <div>
                <Navbar/>
            
            <Container>
                
            <div style={{ height: 400, width: '100%' }}>
              <DataGrid
                rows={OrderDetails}
                columns={columns}
                // loading={OrderDetails.rows.length === 0}
                rowHeight={38}
                checkboxSelection
                disableSelectionOnClick
                getRowId={(row) => row.Order_ID}
              />
            </div>
            {/* {OrderDetails.map(details=>( 
                <Grid container >
             <Grid item md={2} sm={6} >
                 <Item>{details.Dish_Name}</Item>
            </Grid>
            <Grid item md={2} sm={6} >
                 <Item>{details.Cust_ID}</Item>
            </Grid>
            <Grid item md={2} sm={6} >
                 <Item>{details.Delivery_Status}</Item>
            </Grid>
            <Grid item md={2} sm={6} >
                 <Item>{details.Order_Mode}</Item>
            </Grid>
            <Grid item md={2} sm={6} >
                <Item>{details.Order_Status}</Item>
            </Grid>
             </Grid>
            
         ))} */}
        

<p>hello</p>
              
            
            </Container>
            </div>
          );





}
