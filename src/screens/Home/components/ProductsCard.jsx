import * as React from 'react';
import { styled } from '@mui/material/styles';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import Avatar from '@mui/material/Avatar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import { red } from '@mui/material/colors';
import FavoriteIcon from '@mui/icons-material/Favorite';
import ShareIcon from '@mui/icons-material/Share';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import { NavLink } from 'react-router-dom';


const ProductsCard = (props) => {
  const {CodeId, name, brand ,price ,specifications ,image, slug, offerPrice } = props;
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

    //CardFooter debe estar abajo del cardContent
    const CardFooter = styled("div")`
    position: absolute;
    bottom: 1px;
  `;

  return (
<Card sx={{ maxWidth: 345,  position: 'relative', height:'600px' }}>
  <CardHeader
        avatar={
          <Avatar sx={{ bgcolor: red[500] }} aria-label="recipe">
            R
          </Avatar>
        }
        action={
          <IconButton aria-label="settings">
            <MoreVertIcon />
          </IconButton>
        }
        title={name}
        subheader={brand}
      />
      <CardMedia
        component="img"
        height="194"
        image={image}
        alt="Paella dish"
        sx={{ objectFit: "contain" }}
      />
      <CardContent>
        <Typography variant="body2" color="text.secondary">
        {
          specifications.map((item, index) => (
          <Typography variant="p" component="div">
              {item.key} : {item.value}
          </Typography>
          ))
        }
        </Typography>
        <Typography variant="p" component="div">
      <h3>{offerPrice !== null ? <span style={{color:'red'}}>{new Intl.NumberFormat('es-CL', {currency: 'CLP', style: 'currency'}).format(offerPrice)}</span> : <span >{new Intl.NumberFormat('es-CL', {currency: 'CLP', style: 'currency'}).format(price)}</span>} </h3>
      {!!offerPrice && <p style={{textDecorationLine: 'line-through'}}>Antes: {new Intl.NumberFormat('es-CL', {currency: 'CLP', style: 'currency'}).format(price)}</p>} 
      </Typography>
      </CardContent>
      <CardFooter>
        <CardActions disableSpacing>
          <IconButton aria-label="add to favorites">
            <FavoriteIcon />
          </IconButton>
          <IconButton aria-label="share">
            <ShareIcon />
          </IconButton>
          <ExpandMore aria-label="show more"  sx={{bottom:0}}>
            <Stack direction="row" spacing={2}>
            <Button variant="contained" size="small" component={NavLink}  to={`/product/${slug}/${CodeId}`} sx={{float: 'right'}} >Ver Producto</Button>
            </Stack>
          </ExpandMore>
        </CardActions>
    </CardFooter>
  </Card>
  )
}

export default ProductsCard