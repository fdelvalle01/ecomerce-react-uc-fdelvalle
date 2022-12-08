import React, { useCallback, useState } from 'react'
import { Button, Card, CardActions, CardContent, IconButton, List, Tab, TableRow, Tabs, TextField, Typography } from '@mui/material'
import { Container } from '@mui/system'
import { Poster, PosterContainer } from './styled'
import ShareIcon from '@mui/icons-material/Share';
import Stack from '@mui/material/Stack';
import FavoriteIcon from '@mui/icons-material/Favorite';
import CardHeader from '@mui/material/CardHeader';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import { styled } from '@mui/material/styles';
import { useNavigate, useParams } from "react-router-dom";

import { useWishList } from "../../../context/useWishList";

const ExpandMore = styled((props) => {
    const { expand, ...other } = props;
    return <IconButton {...other} />;
  })(({ theme, expand }) => ({
    transform: !expand ? 'rotate(0deg)' : 'rotate(180deg)',
    marginLeft: 'auto',
    transition: theme.transitions.create('transform', {
      duration: theme.transitions.duration.shortest,
    }),
  }));

const ProductDetail = (props) => {

    const {product} = props;
    const [counter, setCounter] = useState(1);

    const onAdd = (value) => {
      setCounter(value);
  }
    const params = useParams();
    const navigate = useNavigate();

    //Obtener metodo de add cart de context

  const { handleAddProduct } = useWishList();

    const handleChange = useCallback(
      (event, newIndex) => {
        navigate(`/product/${params.slug}/${params.CodeId}/${newIndex}`);
      },
      [navigate, params.slug, params.CodeId]
    );

    const aumentarContador = () => {
        setCounter(counter + 1); 
        onAdd(counter+1);
    }
    const restarContador = () => {
      if(counter > 0) {
        setCounter(counter - 1);
        onAdd(counter-1);
      }
    }
    
  return (
    <Container>
          <PosterContainer sx={{marginTop:1}}>
              <Poster src={product.image} alt="poster" sx={{height:400, objectFit: "contain"  }} />
          </PosterContainer>
            <Card sx={{ maxWidth: 1000 }}>
        <CardHeader 
            action={
            <IconButton aria-label="settings">
                <MoreVertIcon />
            </IconButton>
            }
            title={product.name}
            subheader={product.brand}
        />
        <CardContent>
            <Typography variant="body2" color="text.secondary">
              {product.description}
            </Typography>
            <Typography variant="body2" color="text.secondary" >
              <h3><span className="text-danger">{product.offerPrice !== null ? new Intl.NumberFormat('es-CL', {currency: 'CLP', style: 'currency'}).format(product.offerPrice): new Intl.NumberFormat('es-CL', {currency: 'CLP', style: 'currency'}).format(product.price)}</span> </h3>
             {!!product.offerPrice && <p style={{textDecorationLine: 'line-through'}}>Antes: {new Intl.NumberFormat('es-CL', {currency: 'CLP', style: 'currency'}).format(product.price)}</p>} 
            </Typography>
        </CardContent>
        <CardActions disableSpacing>
        <TableRow md={4}>
            <table>
                <thead>
                <tr>
                    <td><Button  variant="contained" onClick={restarContador}  >-</Button></td>
                    <td><List>
                    <TextField id="standard-basic" type="number"placeholder={1} value={counter}  label="Contador" variant="standard" sx={{width: '12ch'}} />
                    </List></td>
                    <td><Button  variant="contained" onClick={aumentarContador}>+</Button></td>
                    {/* <td><Button id="ButtonDetails"  variant="light" className='float-left border border-warning'style={{width:"150px"}} onClick={() => onAdd(counter)}>Añadir al Carrito</Button></td> */}
                </tr>
                </thead>
            </table>
        </TableRow>
            <ExpandMore aria-label="show more">
              <Stack spacing={2} direction="row">
                <Button variant="contained" onClick={() => {
                      handleAddProduct(product, counter);
                }}>Añadir al Carro</Button>
              </Stack>
            </ExpandMore>
        </CardActions>
        <CardActions disableSpacing>
            <IconButton aria-label="add to favorites">
            <FavoriteIcon />
            </IconButton>
            <IconButton aria-label="share">
            <ShareIcon />
            </IconButton>
        </CardActions>
        </Card>


        <TableRow>
        <Tabs value={params["*"]} onChange={handleChange} >
          <Tab value="especificaciones" label="Especificaciones" />
          <Tab value="info" label="Información del Producto " />
          <Tab value="comentarios" label="Comentarios" />
        </Tabs>
        {/* <Routes>
          <Route path="/plataformas" element={<Platforms />}></Route>
          <Route path="/creditos" element={<Credits />}></Route>
          <Route path="/informacion" element={<MovieInfo />}></Route>
        </Routes> */}
        </TableRow>
    </Container>
  )
}

export default ProductDetail