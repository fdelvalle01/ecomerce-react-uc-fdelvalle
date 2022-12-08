import React, {useState}from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import MenuIcon from '@mui/icons-material/Menu';
import Container from '@mui/material/Container';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import Tooltip from '@mui/material/Tooltip';
import MenuItem from '@mui/material/MenuItem';
import { createTheme } from '@mui/material/styles';
import { grey } from '@mui/material/colors';
import { NavLink } from 'react-router-dom';
import SearchBar from '../SearchBar/SearchBar';
import { Drawer } from '@mui/material';
import DrawerCart from './DrawerCart';
import { useWishList } from '../../context/useWishList';

const pages = [ {label: 'Inicio',     path: '/'},
                {label: 'Categorías', path: '/category'},
                {label: 'Contacto',   path: '/contact'},
                {label: 'Quienes Somos', path: '/about'}]; 
                
const settings = ['Profile', 'Account', 'Dashboard', 'Logout'];

const NavBar = () => {

    //Obtener carrito de context para saber su cantidad
    const { products } = useWishList();


    const [anchorElNav, setAnchorElNav] = useState(null);
    const [anchorElUser, setAnchorElUser] = useState(null);

    const handleOpenNavMenu = (event) => {
      setAnchorElNav(event.currentTarget);
    };
    const handleOpenUserMenu = (event) => {
      setAnchorElUser(event.currentTarget);
    };

    const handleCloseNavMenu = () => {
      setAnchorElNav(null);
    };

    const handleCloseUserMenu = () => {
      setAnchorElUser(null);
    };

    // color de fondo de la barra de navegación
    const theme = createTheme({
        palette: {
          primary: {
            main: '#ffffff'
          },
          secondary: {
            main: grey[900]
          },
        },
      });

      // funcion cart lateral izquierda
      const [state, setState] = useState({
        left: false,
      });
    
      const toggleDrawer = (anchor, open) => (event) => {
        if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
          return;
        }
        setState({ ...state, [anchor]: open });
      };

  return (
    <AppBar position="static" theme={theme}>
      <React.Fragment >
          <Drawer
            anchor={'right'}
            open={state['right']}
            onClose={toggleDrawer('right', false)}
          >
           {<DrawerCart 
            anchor={'right'}
           />}

          </Drawer>
        </React.Fragment>
    <Container maxWidth="xl">
      <Toolbar disableGutters>
        <Typography
          variant="h6"
          noWrap
          component="a"
          sx={{
            mr: 2,
            display: { xs: 'none', md: 'flex' },
            fontFamily: 'monospace',
            fontWeight: 700,
            letterSpacing: '.3rem',
            color: 'inherit',
            textDecoration: 'none',
          }}
        >
          De Todito
        </Typography>
        <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
          
          <IconButton
            size="large"
            aria-label="account of current user"
            aria-controls="menu-appbar"
            aria-haspopup="true"
            onClick={handleOpenNavMenu}
            color="inherit"
          >
            <MenuIcon />
          </IconButton>
          <Menu
            id="menu-appbar"
            anchorEl={anchorElNav}
            anchorOrigin={{
              vertical: 'bottom',
              horizontal: 'left',
            }}
            keepMounted
            transformOrigin={{
              vertical: 'top',
              horizontal: 'left',
            }}
            open={Boolean(anchorElNav)}
            onClose={handleCloseNavMenu}
            sx={{
              display: { xs: 'block', md: 'none' },
            }}
          >
            {pages.map((page) => (
              <MenuItem key={page.label} onClick={handleCloseNavMenu}
                component={NavLink} 
                to={page.path}>
                <Typography textAlign="center">{page.label}</Typography>
              </MenuItem>
            ))}
          <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
            <SearchBar />
          </Box>  
          </Menu>
        </Box>

        {/* <AdbIcon sx={{ display: { xs: 'flex', md: 'none' }, mr: 1 }} /> */}
        <Typography
          variant="h5"
          noWrap
          component="a"
          href=""
          sx={{
            mr: 2,
            display: { xs: 'flex', md: 'none' },
            flexGrow: 1,
            fontFamily: 'monospace',
            fontWeight: 700,
            letterSpacing: '.3rem',
            color: 'inherit',
            textDecoration: 'none',
          }}
        >
          De Todito
        </Typography>
        
        <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
          {pages.map((page) => (
            <Button
                // para utilizar un boton como link se debe importar NavLink de react-router-dom y usarlo en el componente Button como se muestra a continuación
                component={NavLink} 
                to={page.path}
                key={page.label}
                onClick={handleCloseNavMenu}
                sx={{ my: 2, color: 'black', display: 'block' }}
              >
                {page.label}
              </Button>
          ))}

        </Box>      
        <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
          <SearchBar />
        </Box>            
        
        <Button className="btn btn-secondary" style={{marginRight:20}}  onClick={toggleDrawer("right", true)} >
              <span className="fa fa-shopping-cart" style={{fontSize:'25px'}} aria-hidden="true"></span>
              {/* Contador futuro */}
              <span className="badge badge-light" style={{backgroundColor: "white", marginLeft: "5px"}}>
                {!!products.length && products.reduce((pv, cv) => pv + cv.counter, 0)}
              </span>
        </Button>

        <Box sx={{ flexGrow: 0 }}>
          <Tooltip title="Open settings">
            <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
              <Avatar alt="Remy Sharp" src="../logo.png" />
            </IconButton>
          </Tooltip>
          <Menu
            sx={{ mt: '45px' }}
            id="menu-appbar"
            anchorEl={anchorElUser}
            anchorOrigin={{
              vertical: 'top',
              horizontal: 'right',
            }}
            keepMounted
            transformOrigin={{
              vertical: 'top',
              horizontal: 'right',
            }}
            open={Boolean(anchorElUser)}
            onClose={handleCloseUserMenu}
          >
            {settings.map((setting) => (
              <MenuItem key={setting} onClick={handleCloseUserMenu}>
                <Typography textAlign="center">{setting}</Typography>
              </MenuItem>
            ))}
          </Menu>
        </Box>
      </Toolbar>
    </Container>
  </AppBar>
  )
}

export default NavBar