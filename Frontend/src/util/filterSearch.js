const filterSearch = (viewData, searchText) => {
    if (!searchText) return viewData;
    return viewData.filter(b => b.productName.toLowerCase().includes(searchText.toLowerCase()));
    
  };
  
  export default filterSearch;

  