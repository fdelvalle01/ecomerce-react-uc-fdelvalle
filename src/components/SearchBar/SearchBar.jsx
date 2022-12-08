import React, { useEffect, useRef, useState } from "react";
import { styled, alpha } from '@mui/material/styles';
import InputBase from '@mui/material/InputBase';
import SearchIcon from '@mui/icons-material/Search';
import { useLocation, useNavigate } from "react-router-dom";





const Search = styled('div')(({ theme }) => ({
  position: 'relative',
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.common.white, 0.15),
  '&:hover': {
    backgroundColor: alpha(theme.palette.common.white, 0.25),
  },
  marginLeft: 0,
  width: '100%',
  [theme.breakpoints.up('sm')]: {
    marginLeft: theme.spacing(1),
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
    [theme.breakpoints.up('sm')]: {
      width: '12ch',
      '&:focus': {
        width: '20ch',
      },
    },
  },
}));

const SearchBar = () => {

  const location = useLocation();
  const navigate = useNavigate();
  const [query, setQuery] = useState(
    new URLSearchParams(location.search).get("q") ?? ""
  );
  // const query = new URLSearchParams(location.search).get("q") ?? ""
  const timeoutRef = useRef();

  const handleWrite = (e) => {
    setQuery(e.target.value);
  };
  useEffect(() => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
      timeoutRef.current = null;
    }
    timeoutRef.current = setTimeout(() => {
      // Estas 3 siguientes lineas, hacen la navegación y reemplazo
      // del querystring. Si no desean agregar el debounce, bastaria
      // que esto lo agreguen en la funcion handleWrite, y eliminen el
      // lo relacionado al useState.
      const newQuery = new URLSearchParams(location.search);
      newQuery.set("q", query);
      navigate(location.pathname + "?" + newQuery.toString(), {});
      timeoutRef.current = null;
    }, 1000);
  }, [location.pathname, location.search, navigate, query]);
  
    //handleSubmit que se ejecuta al hacer click en el boton de buscar o al presionar enter en el input de busqueda 
    const handleSubmit = (event) => {
      event.preventDefault();
      const newQuery = new URLSearchParams(location.search);
      newQuery.set("q", query);
      navigate("/?" + newQuery.toString());
    };
    
  return (
    <Search>
      <SearchIconWrapper>
        <SearchIcon />
          </SearchIconWrapper>
          <form onSubmit={handleSubmit}>
          <StyledInputBase
              placeholder="Search…"
              inputProps={{ 'aria-label': 'search' }}
              value={query}
              onChange={handleWrite}
            />
          </form>
    </Search>
  )
}

export default SearchBar