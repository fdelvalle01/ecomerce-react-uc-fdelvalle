import { CssBaseline } from '@mui/material';
import { ProductApolloClient } from './config/apollo';
import { UseWishListProvider } from './context/useWishList';
import Rutas from './routes/Rutas';

function App() {
  return (
    <div className="App">
       <CssBaseline  />
       <ProductApolloClient>
        <UseWishListProvider>
            <Rutas />
        </UseWishListProvider>
      </ProductApolloClient>
    </div>
  );
}

export default App;
