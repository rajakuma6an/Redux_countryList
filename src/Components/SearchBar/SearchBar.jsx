import React from "react";
import '../style.css';
import {BsSearch} from 'react-icons/bs'
const SearchBar = ({query,setQuery}) => {
  return (
    <div className="Search_Box" >
        <i className="search_icon"><BsSearch size={20} style={{color : "#d2dce2"}} /></i>
      <input
        type="text"
        placeholder="Search..."
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        className="search_input"
      />
    </div>
  );
};

export default SearchBar;
