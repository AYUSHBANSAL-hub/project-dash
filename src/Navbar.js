import React, { useState, useContext } from 'react';
import logo from './assets/logo.png';
import Select from 'react-select';
import { AppContext } from './AppContext';

const Navbar = () => {
  const { setSearchValue } = useContext(AppContext);
  
  const options = [
    { value: 'week1', label: 'Week 1' },
    { value: 'week2', label: 'Week 2' },
    // ... other week options
  ];

  const handleOptionChange = (selectedOption) => {
    if (selectedOption && selectedOption.value) {
      setSearchValue(selectedOption.value);
    }
  };

  return (
    <nav className="navbar">
      <img src={logo} alt="Company Logo" className="navbar-logo" />
      <h1 className="navbar-title">Pixel Sales Dashboard</h1>
      <Select 
        options={options}
        onChange={handleOptionChange}
        placeholder="Search Here..."
        className="navbar-select"
      />
    </nav>
  );
};

export default Navbar;
