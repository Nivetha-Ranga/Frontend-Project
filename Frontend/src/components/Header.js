import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { Button,Badge} from '@mui/material';
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';
import SearchBar from './SearchBar';

const HeaderStyled = styled.header`
  background-color:'#E6E6FA';
  padding: 20px 50px;
  font-family: 'Pacifico';
  font-size: 22px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  
`;
const HeaderTitle = styled.h1`
  margin: 0;
`;
const NavLinks = styled.div`
  display: flex;
  gap: 20px;
  font-size: 20px;
  cursor: pointer;
  a {
    text-decoration: none;
    color: black;
    &:hover {
      color: rgba(236, 39, 4, 0.671);
    }
  }
`;
const SearchContainer = styled.div`
  
`;
export default function Header({ cartItemCount,isLoggedIn, onLogout, isAdmin, onAdminLogout}) {
  const navigate = useNavigate();

  const handleLoginLogout = () => {
    if (isLoggedIn) {
      onLogout();
      navigate('/home');
    } else {
      navigate('/login');
    
    }
  };
  const handleAdminView = () => {
    if (isAdmin) {
      onAdminLogout();
      navigate('/home');
    } else {
      navigate('/admin');
    }
  };
  const handleSignup = () => {
    navigate('/signup');
  };
  return (
    <HeaderStyled>
      <HeaderTitle>Diary Delights</HeaderTitle>
      {/* <SearchContainer>
        <SearchBar onSearch={onSearch} searchText={searchText} />
      </SearchContainer> */}
      <NavLinks>
        <Button variant="contained" color="primary" onClick={() => navigate('/home')}>
          Home
        </Button>
        {!isLoggedIn && (
          <Button variant="contained" color="primary" onClick={handleSignup}>
            Signup
          </Button>
        )}
        <Button variant="contained" color="primary" onClick={handleLoginLogout}>
          {isLoggedIn ? 'Logout' : 'Login'}
        </Button>
        {/* {!isLoggedIn && (
        <Button variant="contained" color="primary" onClick={handleAdminView}>
          {isAdmin ? 'Admin Logout' : 'Admin Login'}
        </Button>
        )} */}
        <Badge badgeContent={cartItemCount} color="error">
          <AddShoppingCartIcon onClick={() => navigate('/cart')} />
        </Badge>
      </NavLinks>
    </HeaderStyled>
    
  );
}