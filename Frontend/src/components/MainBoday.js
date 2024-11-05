import * as React from 'react';
import ItemList from "./ItemList";
import SearchBar from './SearchBar';
import styled from 'styled-components';
export default function MainBoday({ allData,isLoggedIn,onSearch,searchText}) {
  
const SearchContainer = styled.div`
  
`;
  return (
    <section className="MainBody">
      
      
      <section className="itemCss">
      {/* <SearchContainer>
        <SearchBar onSearch={onSearch} searchText={searchText} />
      </SearchContainer> */}
        <ItemList Dairydata={allData} isLoggedIn={isLoggedIn} />
      </section>
    </section>
  );
}