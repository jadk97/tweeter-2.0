import React from "react";
import Autocomplete from '@material-ui/lab/Autocomplete';
import { makeStyles, ThemeProvider, createMuiTheme, withTheme } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import SearchIcon from '@material-ui/icons/Search';
import InputAdornment from '@material-ui/core/InputAdornment';
const SearchInput = (props) => {
  const top100Films = [
    { title: 'The Shawshank Redemption', year: 1994 },
    { title: 'The Godfather', year: 1972 },
    { title: 'The Godfather: Part II', year: 1974 },
    { title: 'The Dark Knight', year: 2008 },
    { title: '12 Angry Men', year: 1957 },
    { title: "Schindler's List", year: 1993 },
    { title: 'Pulp Fiction', year: 1994 },
    { title: 'The Lord of the Rings: The Return of the King', year: 2003 },
    { title: 'The Good, the Bad and the Ugly', year: 1966 },
    { title: 'Fight Club', year: 1999 }
  ];

  const theme = createMuiTheme({
    overrides: {
      MuiOutlinedInput: {
        root: {
          '&:hover:not($disabled):not($focused):not($error) $notchedOutline': {
            borderColor: '#1da1f2',
          },
          '&$focused $notchedOutline': {
            borderColor: '#1da1f2'
          },
          '& fieldset': {
            borderRadius: `2em`,
          },
    
       
        },
        notchedOutline: {
          borderColor: "lightslategrey",
          "&:hover": {
            borderColor:"#1da1f2"
          }
        },
      },

      MuiAutocomplete: {

        paper: {
          color: "white",
          backgroundColor: "#15202B",
          boxShadow: "0 0 2px white"
        },
        option: {
          '&[data-focus="true"]': {
            backgroundColor: "#253341",
          },
          borderBottom: "1px solid lightslategrey"
        },
        noOptions: {
          color: "white"
        },
        loading: {
          color: "white",
        },
      },

      MuiInputBase: {
        root: {
          color: "white"
        }
      },

      MuiInputAdornment: {
        positionStart: {
          marginRight: 8,
          marginLeft: 8
        },
      }

    },
  });

  
  return (
    <div className="search-input">
      <ThemeProvider theme={theme}>
        <Autocomplete
          id="combo-box-demo"
          options={top100Films}
          getOptionLabel={(option) => option.title}
          disableClearable
          forcePopupIcon={false}
          style={{ width: 300 }}
          renderInput={(params) => <TextField {...params} variant="outlined" InputProps={{
            ...params.InputProps,
            startAdornment: (
              <InputAdornment position="start">
                <SearchIcon style={{ fill: "white" }} />
              </InputAdornment>
            ),
          }} />}
        />
      </ThemeProvider>
    </div>
  )
};

export default SearchInput;