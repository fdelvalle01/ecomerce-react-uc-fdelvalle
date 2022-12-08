import React, {useState} from 'react'
import ProductsCard from './ProductsCard';
import { CircularProgress, Container } from '@mui/material';
import { styled } from '@mui/material/styles';
import { useQuery, gql } from "@apollo/client";
import { useLocation, useNavigate } from 'react-router-dom';
import Pagination from '@mui/material/Pagination';
import Stack from '@mui/material/Stack';

// GraphQL query para obtener los productos de la API de GraphQL con parámetros de búsqueda y de página.
const GET_PRODUCTS = gql`
query GetProductsQuery($params: ProductsParams) {
  products(params: $params) {
    slug
    id
    image
    name
    description
    brand
    offerPrice
    price
    rating
    specifications {
      key
      value
    }
  }
}
`;

const ProductsListContainer = () => {

  // const [products, setProducts] = useState([]);
  const location = useLocation();

  //Style for component products
  const CardRow = styled("div")`
    display: flex;
    flex-direction: row;  
    flex-wrap: wrap;
    gap: 1rem;
    margin-top: 30px;
    max-width: 1504px;
    height: 100%;
  `;


  const [page, setPage] = useState(1);
  const navigate = useNavigate();
  const { data, loading } = useQuery(GET_PRODUCTS, {
    variables: {
      params: {
        query: new URLSearchParams(location.search).get("q") ?? "",
        page: +new URLSearchParams(location.search).get("page") ?? 1,
      },
    },
  });

  //handle change page pagination component 
  const handleChange = (event, value) => {
    setPage(value);
    const newQuery = new URLSearchParams(location.search);
    newQuery.set("page", value);
    navigate("/?" + newQuery.toString());
  };

  if (loading) {
    return <div style={{ alignItems: 'center', justifyContent: 'center', display: 'flex', height: '100vh' }}>
              <CircularProgress  color="secondary" />
            </div>;
  }


  return (
   <>
     <Container >
      <CardRow>
      {
          data.products?.length > 0 ? (
            data.products.map((item, index) => (
              /* Componente NavbarItem, Que recorre la lista de items en el menu con sus nombres. */
              <ProductsCard 
                key={index}
                CodeId={item.id}
                name={item.name}
                brand={item.brand}
                description={item.description}
                price={item.price}
                offerPrice={item.offerPrice}
                specifications={item.specifications}
                rating={item.rating}
                image={item.image}
                slug={item.slug}
              />
            )
            )
          ) : (
            <div style={{ alignItems: 'center', justifyContent: 'center', display: 'flex', height: '100vh' }}>
               <h1>No hay productos</h1>
            </div>
          )
        }
      </CardRow>
      <Container >
        <Stack spacing={2} sx={{ justifyContent: 'center', alignItems: 'center', display: 'flex', height: '10vh' }}>
          <Pagination count={10} page={page} onChange={handleChange} />
        </Stack>
      </Container>
   
     </Container>
    </>
  )
}

export default ProductsListContainer