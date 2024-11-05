
import TextField from '@mui/material/TextField';
import InputAdornment from '@mui/material/InputAdornment';
import SearchIcon from '@mui/icons-material/Search';
import { styled } from '@mui/material/styles';

const SearchContainer = styled('div')(() => ({
  
}));

const SearchInput = styled(TextField)(() => ({
   
}));

export default function SearchBar({ onSearch, searchText }) {
  
  return (
    <SearchContainer>
      <SearchInput
        variant="outlined"
        placeholder="Search..."
        onChange={onSearch}
        value={searchText}
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <SearchIcon />
            </InputAdornment>
          ),
        }}
      />
    </SearchContainer>
  );
}
