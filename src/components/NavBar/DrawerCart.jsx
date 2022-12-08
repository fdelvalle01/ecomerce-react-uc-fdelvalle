import React, {useState} from 'react'
import { Button, Divider, IconButton, List, ListItem, ListItemButton, ListItemText, Paper, Table, TableCell, TableContainer, TableHead, TableRow } from '@mui/material';
import Box from '@mui/material/Box';
import { useWishList } from "../../context/useWishList";
import Cart from '../../screens/Cart/Cart';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import { styled } from '@mui/material/styles';
import Badge from '@mui/material/Badge';

const StyledBadge = styled(Badge)(({ theme }) => ({
  '& .MuiBadge-badge': {
    right: -5,
    top: 13,
    border: `3px solid ${theme.palette.background.paper}`,
    padding: '0 6px',
  },
}));

const DrawerCart = (anchor) => {
  const { products, handleRemoveAll } = useWishList();

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
    <Box
    sx={{ width: anchor === 'top' || anchor === 'bottom' ? 'auto' : 500 }}
    role="presentation"
    onClick={toggleDrawer(anchor, false)}
    onKeyDown={toggleDrawer(anchor, false)}
  >
    <List>
        <IconButton aria-label="cart">
            <StyledBadge badgeContent={products.reduce((pv, cv) => pv + cv.counter, 0)} color="secondary">
              <ShoppingCartIcon />
            </StyledBadge>
          </IconButton>
        </List>
    <Divider />
    {/* El siguiente list, deberia tener todos los productos que se van asignando  */}
    <List>
      {
        products.length > 0 ? (
           products.map((product, index) => (
              <Cart product={product} />
           )) 
        ):(
          // Centrar el texto 
          <ListItem key="No hay productos" disablePadding>
            <ListItemButton>
              <ListItemText primary="No hay productos" />
            </ListItemButton>
          </ListItem>
        )
      }
    </List>
    <List>
      <ListItem key="No hay productos" disablePadding>
        <ListItemButton>
          <ListItemText primary={`Sub Total: ${new Intl.NumberFormat('es-CL', {currency: 'CLP', style: 'currency'}).format((products.reduce((pv, cv) => pv + (cv.offerPrice !== null ?  cv.offerPrice * cv.counter : cv.price * cv.counter), 0)))}`}/>
        </ListItemButton>
      </ListItem>
    </List>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: '100%' }} aria-label="simple table">
          <TableHead>
            <TableRow>
              {!!products.length && <TableCell align="center"> <Button variant="contained" onClick={() => handleRemoveAll()}>Vaciar Carrito</Button></TableCell>}
              {!!products.length && <TableCell align="center"> <Button variant="contained">Terminar Compra</Button></TableCell>}
            </TableRow>
          </TableHead>
        </Table>
      </TableContainer>
  </Box>
  )
}

export default DrawerCart