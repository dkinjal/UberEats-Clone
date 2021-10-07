import React, {useState} from "react";
import './App.css';
import {BrowserRouter as Router, Switch, Route} from "react-router-dom";
import Create from './components/Create'
import {createTheme, ThemeProvider} from '@material-ui/core'
import CustomerProfile from "./components/customerProfile";
import RestaurantProfile from "./components/restaurantProfile";
import RestaurantCard  from "./components/restaurantCard";
import HomePage from './components/Home';
import Favourites from './components/favourites/Favourites'
import RestaurantList from './components/restaurantList';
import Login from './components/customerOnly/Login';
import Signup from './components/customerOnly/Signup';
import RestaurantLogin from './components/restaurantOnly/RestaurantLogin';
import RestaurantSignup from './components/restaurantOnly/RestaurantSignup';
import Landing from './components/Landing';
import ImageUpload from "./components/ImageUpload";
import DishCard2 from './components/DishCard2';
import UpdateDish from './components/dishOnly/updateDish';
import Orders from './components/ordersOnly/Orders';
import SearchResults from './components/customerOnly/SearchResults';
import AddDish from "./components/dishOnly/addDish";

const theme = createTheme({
    palette:
    {primary:
        {main:"#fefefe"}
    },
    typography:{
        fontFamily:'Noto+Sans',
        fontWeightLight:400,
        fontWeightRegular:500,
        fontWeightMedium:600,
        fontWeightBold:700
    }
})
function App() {
    return(
        <ThemeProvider theme={theme}>
        <Router>
            <Switch>
                <Route exact path="/">
                <HomePage/>
                </Route>
                <Route path='/create'>
                <Create />
                </Route>
                <Route path='/restaurantList'>
                <RestaurantList />
                </Route>
                <Route path='/customerProfile'>
                <CustomerProfile/>
                </Route>
                <Route path='/restaurantProfile'>
                <RestaurantProfile/>
                </Route>
                <Route path='/restaurantCard'>
                <RestaurantCard/>
                </Route>
                <Route path='/favourites'>
                <Favourites/>
                </Route>
                <Route path='/login'>
                <Login/>
                </Route>
                <Route path='/signup'>
                <Signup/>
                </Route>
                <Route path='/restaurantLogin'>
                <RestaurantLogin/>
                </Route>
                <Route path='/search'>
                <SearchResults/>
                </Route>
                <Route path='/restaurantSignup'>
                <RestaurantSignup/>
                </Route>
                <Route path='/landing'>
                <Landing/>
                </Route>
                <Route path='/image'>
                <ImageUpload/>
                </Route>
                <Route path='/DishCard2'>
                <DishCard2/>
                </Route>
                <Route path='/UpdateDish'>
                <UpdateDish/>
                </Route>
                <Route path='/addDish'>
                <AddDish/>
                </Route>
                <Route path='/orders'>
                <Orders/>
                </Route>
                {/* <Route exact path = "/customerProfile" component = {Profile}></Route>                 */}
            </Switch>
        </Router>
        </ThemeProvider>
    )
}
export default App;