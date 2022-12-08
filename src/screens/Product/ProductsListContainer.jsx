import { CircularProgress } from '@mui/material';
import React from 'react'
import {useParams } from "react-router-dom";
import ProductDetail from './components/ProductDetail';
import {useFetch} from '../../hooks/useFetch';


const ProductsListContainer = () => {
    const params = useParams();
    // componente useFetch para obtener los datos de la API de GraphQL con parámetros de búsqueda y de página. 
      const { data: product, loading } = useFetch(
        "https://ddam-2022-react-api.onrender.com/shop/" + params.slug
      );
      if (loading || !product) {
        return (
          <div style={{ alignItems: 'center', justifyContent: 'center', display: 'flex', height: '100vh' }}>
              <CircularProgress  color="secondary" />
          </div>
        );
      }
    
  return (
    <>
        {
           product.length !== 0 ?  (
                <ProductDetail 
                    product={product}
                />
            ): (
                <div style={{ alignItems: 'center', justifyContent: 'center', display: 'flex', height: '100vh' }}>
                     
                      <CircularProgress  color="secondary" />
                </div>
            )
        }
    </>
  )
}

export default ProductsListContainer