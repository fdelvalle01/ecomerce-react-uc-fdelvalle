import React from 'react'
import { useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import { Button, CardActions, TableCell, TableContainer, TableHead, TableRow } from '@mui/material';
import { ExpandMore } from '@mui/icons-material';
import { Stack } from '@mui/system';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import { useWishList } from '../../context/useWishList';
const Cart = (props) => {

  const {product} = props;
  const { handleRemoveItem } = useWishList();

  return (
    <Card sx={{ display: 'flex', marginTop:1 }}>
      <CardMedia
      component="img"
      sx={{ width: 151, objectFit: "contain" }}  
      image={product.image}
      alt="Producto"
    />
    <Box sx={{ display: 'flex', flexDirection: 'column' }}>
      <CardContent sx={{ flex: '1 0 auto' }}>
        <Typography component="div" variant="h5">
          {product.name}
        </Typography>
        <Typography variant="subtitle1" color="text.secondary" component="div">
          <p>{product.brand}</p>
          <p>{product.description}</p>
        </Typography>
      </CardContent>
      <Box sx={{ display: 'flex', alignItems: 'center', pl: 2, pb: 1 }}>
        <TableContainer component={Paper}>
          <Table  sx={{ minWidth: '100%' }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell> {product.counter} x <p1> {product.offerPrice !== null ? new Intl.NumberFormat('es-CL', {currency: 'CLP', style: 'currency'}).format((product.offerPrice)) : new Intl.NumberFormat('es-CL', {currency: 'CLP', style: 'currency'}).format((product.price)) }</p1> </TableCell>
              <TableCell align="right">Total: <p1>{product.offerPrice !== null ? new Intl.NumberFormat('es-CL', {currency: 'CLP', style: 'currency'}).format((product.offerPrice * product.counter)): new Intl.NumberFormat('es-CL', {currency: 'CLP', style: 'currency'}).format((product.price * product.counter))}</p1></TableCell>
              <TableCell>
              <IconButton aria-label="previous" onClick={() => handleRemoveItem(product.id)} >
                  <i class="fa fa-trash" aria-hidden="true"></i>
                </IconButton>
              </TableCell>
            </TableRow>
          </TableHead>
          </Table>
        </TableContainer>
      </Box>
    </Box>
  </Card>
  )
}

export default Cart