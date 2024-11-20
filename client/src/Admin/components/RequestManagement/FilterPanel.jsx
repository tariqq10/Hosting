import React from 'react';
import Dropdown from '../UI/Dropdown';

const FilterPanel = () => {
  const handleFilterChange = (filterValue) => {
    console.log("Selected filter:", filterValue);
  };

  return (
    <div className="filter-panel p-3 mb-4 border rounded">
      <h4 className="mb-3">Filter by</h4>
      <Dropdown label="Category" onChange={handleFilterChange} options={['Education', 'Healthcare', 'Disaster Relief']} className="form-select mb-3" />
      <Dropdown label="Date" onChange={handleFilterChange} options={['Last 7 Days', 'Last 30 Days', 'This Year']} className="form-select mb-3" />
      <Dropdown label="NGO" onChange={handleFilterChange} options={['NGO A', 'NGO B', 'NGO C']} className="form-select mb-3" />
    </div>
  ); 
};

export default FilterPanel;
// 21