import React, { useState } from "react";
import { styled, alpha } from '@mui/material/styles';
import { InputBase } from '@mui/material/';
import SearchIcon from '@mui/icons-material/Search';


const SearchBar = styled('form')(({ theme }) => ({
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
      width: '15ch',
      '&:focus': {
        width: '20ch',
      },
    },
  },
}));


export const Search = ({ search }) => {
  const [searchValue, setSearchValue] = useState("");

  // calls the state update function with the new value.
  const handleUserInputChanges = ({target}) => {
    setSearchValue(target.value);
  }

  // calls the state update function (setSearchValue) with an empty string in order to clear the input field.
  // const resetInputField = () => {
  //   setSearchValue("");
  // }

  const callSearchFunction = (e) => {
    e.preventDefault();
    search(searchValue);
    setSearchValue(searchValue)
  }

  return (
    <SearchBar onSubmit={callSearchFunction}>
      <SearchIconWrapper>
        <SearchIcon />
      </SearchIconWrapper>
      <StyledInputBase
        placeholder="Search…"
        inputProps={{ 'aria-label': 'search' }}
        value={searchValue}
        onChange={handleUserInputChanges}
        />
    </SearchBar>
  )
}
