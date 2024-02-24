import React from "react";
import { useState } from "react";
import "./filter.css";

const Filter = ({chooseFilter}) =>{
    const [filters, setFilters] = useState({
        category: '',
        price: '',
        location: ''
      });
    
      const handleCategoryChange = (event) => {
        var filter = event.target.value;
        setFilters({ ...filters, category: filter });
        chooseFilter(filter);
      };
    
      const handlePriceChange = (event) => {
        setFilters({ ...filters, price: event.target.value });
      };
    
      const handleLocationChange = (event) => {
        setFilters({ ...filters, location: event.target.value });
      };

    return(
        <div className="filter">
            <h1>VDashboard</h1>
            <div className="sidebar-content">
        <h2>Filters</h2>
        <div className="filter-section">
          <label htmlFor="category">Category:</label>
          <select id="category" value={filters.category} onChange={handleCategoryChange}>
            <option value="">Select</option>
            <option value="electronics">Electronics</option>
            <option value="clothing">Clothing</option>
            <option value="books">Books</option>
          </select>
        </div>
        <div className="filter-section">
          <label htmlFor="price">Price:</label>
          <select id="price" value={filters.price} onChange={handlePriceChange}>
            <option value="">Select</option>
            <option value="cheap">Cheap</option>
            <option value="moderate">Moderate</option>
            <option value="expensive">Expensive</option>
          </select>
        </div>
        <div className="filter-section">
          <label htmlFor="location">Location:</label>
          <input type="text" id="location" value={filters.location} onChange={handleLocationChange} />
        </div>
      </div>
        </div>
    )
}

export default Filter;