import  React, {useEffect} from 'react';
import { styled, alpha, useTheme } from '@mui/material/styles';
import { Link } from 'react-router-dom';
import HomeOutlinedIcon from '@mui/icons-material/HomeOutlined';
import AppBar from '@mui/material/AppBar';
import { useHistory } from "react-router-dom";
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import { useLocation } from 'react-router-dom';
import LogoutIcon from '@mui/icons-material/Logout';
import IconButton from '@mui/material/IconButton';
import UberEatsLogo  from '../images/UberEatsLogo.png';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import AddBusinessIcon from '@mui/icons-material/AddBusiness';
import Typography from '@mui/material/Typography';
import InputBase from '@mui/material/InputBase';
import Badge from '@mui/material/Badge';
import MenuItem from '@mui/material/MenuItem';
import Menu from '@mui/material/Menu';
import MenuIcon from '@mui/icons-material/Menu';
import SearchIcon from '@mui/icons-material/Search';
import AccountCircle from '@mui/icons-material/AccountCircle';
import MailIcon from '@mui/icons-material/Mail';
import MoreIcon from '@mui/icons-material/MoreVert';
import Divider from '@mui/material/Divider';
import ListItem from '@mui/material/ListItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import Drawer from '@mui/material/Drawer';
import List from '@mui/material/List';
import { padding } from '@mui/system';
import SearchRestaurant from '../functions/searchFunction'
const drawerWidth = 240;

const Main = styled('main', 
  { shouldForwardProp: (prop) => prop !== 'open' })(
    ({ theme, open }) => ({
      flexGrow: 1,
      transition: theme.transitions.create('margin', {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
      }),
      marginLeft: `-${drawerWidth}px`,
      ...(open && {
        transition: theme.transitions.create('margin', {
          easing: theme.transitions.easing.easeOut,
          duration: theme.transitions.duration.enteringScreen,
        }),
        marginLeft: 0,
      }),
    }),
  );

const Search = styled('div')(({ theme }) => ({
  position: 'relative',
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.common.white, 0.15),
  '&:hover': {
    backgroundColor: alpha(theme.palette.common.white, 0.25),
    width:'500px',
  },
  
  marginRight: theme.spacing(2),
  marginLeft: 0,
  width: '100%',
  [theme.breakpoints.up('sm')]: {
    marginLeft: theme.spacing(3),
    width: 'auto',
  },
}));

const SearchIconWrapper = styled('div')(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: '100%',
  position: 'absolute',
  pointerEvents: 'none',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: 'inherit',
  '& .MuiInputBase-input': {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create('width'),
    width: '100%',
    [theme.breakpoints.up('md')]: {
      width: '20ch',
    },
  },
}));

const DrawerHeader = styled('div')(({ theme }) => ({
    display: 'flex',
    alignItems: 'center',
    padding: theme.spacing(0, 1),
    // necessary for content to be below app bar
    ...theme.mixins.toolbar,
    justifyContent: 'flex-end',
  }));
export default function PrimarySearchAppBar() {
  const [anchorEl, setAnchorEl] = React.useState(true);
  const [mobileMoreAnchorEl, setMobileMoreAnchorEl] = React.useState(null);
  const history= useHistory();


  // const isMenuOpen = Boolean(anchorEl);
  // const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);
  const theme = useTheme();
  const [open, setOpen] = React.useState(false);
  const [profileState, setProfileState] = React.useState('/customerProfile');
  

  const [search, setSearch]= React.useState('');

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };
  const handleProfileMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
    if(profileState=='/customerProfile'){
      setProfileState('/')
    }else{
      setProfileState('/customerProfile')
    }
  };

  const handleMobileMenuClose = () => {
    setMobileMoreAnchorEl(null);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
    handleMobileMenuClose();
  };

  const handleMobileMenuOpen = (location, event) => {
    setMobileMoreAnchorEl(event.currentTarget);
  };
  const menuId = 'primary-search-account-menu';
  const usePathname =()=>{
      const location = useLocation();
      console.log(location.pathname);
      if(location.pathname=='/customerProfile'){
        setProfileState('/');
      }else{
        setProfileState('/customerProfile')
      }
    }

   const setSearchMain= ()=>{
    console.log(search + "aaa")
    
   }
   const handleKeyDown =(e)=> {
    //e.preventDefault();
    setSearch(e.target.value)
    if (e.key === 'Enter') {
      localStorage.setItem('search_id',search );
    }
  }
  useEffect(()=>{
    console.log(search);
},[search])

  return (
    <Box  sx={{ flexGrow: 1 }}>
      <AppBar style={{ background: '#516285' }} position="static">
        <Toolbar>
        <IconButton
            color="inherit"
            aria-label="open drawer"
            onClick={handleDrawerOpen}
            edge="start"
            sx={{ mr: 2, ...(open && { display: 'none' }) }}
          >
            <MenuIcon />
          </IconButton>
          
              <img src={UberEatsLogo} alt='' width="150" height="80" />
          
          {/* <h3>{profileState}</h3> */}
          <Search >
          <Link to={'/search'}>
          <IconButton size="large"  color="inherit"> 
              <SearchIcon />
           </IconButton>
           </Link >
            <StyledInputBase
              placeholder="What are you craving?"
              inputProps={{ 'aria-label': 'search',}}
              //onChange={(e)=>setSearchMain(e.target.value)}
              onChange={(e)=>localStorage.setItem('search_id',e.target.value )}
            />
          </Search>
          
          <Box sx={{ flexGrow: 1 }} />
          <Box sx={{ display: { xs: 'none', md: 'flex' } }}>
            <Link to={'/favourites'}>
            <IconButton size="large"  color="inherit">              
              <FavoriteBorderIcon></FavoriteBorderIcon>
            </IconButton>
            </Link>
            <Link to={'/'}>
            <IconButton
              size="large"
              color="inherit"
            >
               <HomeOutlinedIcon/>
            </IconButton>
            </Link>
            <Link to='/landing'>
            <IconButton
              size="large"
              edge="end"
              aria-label="account of current user"
              aria-controls={menuId}
              aria-haspopup="true"
              onClick={handleProfileMenuOpen}
              color="inherit"
            >
             <LogoutIcon/>
            </IconButton>
            </Link>
          </Box>
          
        </Toolbar>
      </AppBar>
      <Drawer
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          '& .MuiDrawer-paper': {
            width: drawerWidth,
            boxSizing: 'border-box',
          },
        }}
        variant="persistent"
        anchor="left"
        open={open}
      >
        <DrawerHeader>
            <List>
            <Link to='/login'>
            <ListItem button >
                <ListItemText primary='Sign In' />
            </ListItem>
            </Link>
            </List>
          <IconButton onClick={handleDrawerClose}>
            {theme.direction === 'ltr' ? <ChevronLeftIcon /> : <ChevronRightIcon />}
          </IconButton>
        </DrawerHeader>
        <Divider />
        
        <List>
          
          <ListItem>
            <ListItemIcon><AddBusinessIcon /></ListItemIcon>
            <ListItemText>Add a restaurant</ListItemText>
          </ListItem>
          <Link to='/orders'>
          <ListItem>
            <ListItemIcon><AddBusinessIcon /></ListItemIcon>
            <ListItemText>My Orders</ListItemText>
          </ListItem>
          </Link>
          <Link to='/orders'>
          <ListItem>
            <ListItemIcon><AddBusinessIcon /></ListItemIcon>
            <ListItemText>Orders</ListItemText>
          </ListItem>
          </Link>
        </List>
        
      </Drawer>
      <Main open={open}>
        <DrawerHeader />
        </Main>
    </Box>
  );
}
