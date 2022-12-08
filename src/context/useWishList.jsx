import React, { createContext, useCallback, useContext, useMemo, useState, useEffect} from "react";
  
const WishListContext = createContext({
    products: [],
    handleAddProducts: () => {},
});  

//Que hace este useWishList ?
// 1. Maneja el estado de la lista de carrito
// 2. Maneja la lógica de agregar productos a la lista de deseos
// 3. Maneja la lógica de eliminar productos de la lista de deseos
export function useWishList() {
    const data = useContext(WishListContext);
    return data;
}

 export function UseWishListProvider(props){

    // estado de la lista carrito
    const [products, setCart] = useState([]);

    const handleAddProduct = useCallback((newProduct, counter) => {
        
        setCart((currentProduct) => {
            if (currentProduct.some((product) => product.id === newProduct.id)) {
              //Si ya existe el item en el carrito, solo se actualiza la cantidad
              let itemIndex = currentProduct.findIndex((element) => element.id === newProduct.id);
              currentProduct[itemIndex].counter += counter;
            return [...currentProduct];
            }
            console.log("newMovie", currentProduct);
            //Si no existe el item en el carrito, se agrega el item al carrito con la cantidad 
        return [...currentProduct, {...newProduct, counter}];
        });
      }, []);

      //Eliminar un item del carrito por su id


      const handleRemoveItem = useCallback((id) => {
        
        setCart((currentProduct) => {
             const newCart =  currentProduct.filter((element) => element.id !== id)
            //Si no existe el item en el carrito, se agrega el item al carrito con la cantidad 
            localStorage.setItem("cart", JSON.stringify(newCart));
            return [...newCart];
            });
      }, []);


      //Eliminar todos los items del carrito
      const handleRemoveAll = useCallback((id) => {
        
        setCart(() => {
            return [...[]];
            });
            localStorage.setItem("cart", JSON.stringify([]));
          
      }, []);

      //insertar carrito en localStorage para que no se pierda al recargar la pagina 
      useEffect(
        function syncToLocalStorage() {
          if (products.length > 0) {
            localStorage.setItem("cart", JSON.stringify(products));
          }
        },
        [products]
      );
  
      //obtener carrito del localStorage
      useEffect(function syncFromLocalStorage() {
        const persistedCart = localStorage.getItem("cart");
        if (persistedCart) {
          setCart(JSON.parse(persistedCart));
        }
      }, []);
    

    const value = useMemo(() => {
        return {
          products,
          handleAddProduct,
          handleRemoveItem,
          handleRemoveAll
        };
    }, [products, handleAddProduct, handleRemoveItem, handleRemoveAll]);
    
  return (
    <WishListContext.Provider value={value}>
        {props.children}
    </WishListContext.Provider>
  )
}
