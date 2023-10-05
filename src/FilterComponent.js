import React, { useState, useEffect } from 'react';
import Select from 'react-select';
import axios from 'axios';

const FilterComponent = ({ onFilter }) => {
  const [selectedCountries, setSelectedCountries] = useState([]);
  const currentYear = new Date().getFullYear() - 1;
  const [fromYear, setFromYear] = useState(1973); // Default to 1973
  const [toYear, setToYear] = useState(2022); // Default to 2022 for India

  const countriesOptions = [
    { value: 'Brazil', label: 'Brazil' },
    { value: 'Russian Federation', label: 'Russian Federation' },
    { value: 'India', label: 'India' },
    { value: 'China', label: 'China' },
    { value: 'South Africa', label: 'South Africa' },
  ];
  axios.defaults.withCredentials=true;
  const handleCountryChange = (selectedOptions) => {
    setSelectedCountries(selectedOptions);
  };

  const handleFilter = async () => {
    const selectedCountryValues = selectedCountries.map((country) => country.value);
    const filter = {
      countries: selectedCountryValues,
      fromYear,
      toYear,
    };

    try {
      // Make a POST request to the server with the filter data
      const response = await axios.post('https://world-population-visual-do4j.vercel.app/filter-data', filter);

      // Handle the response (response.data will contain the filtered data)
      console.log(response.data);

      // Pass the filtered data to the parent component (if needed)
      if (onFilter) {
        onFilter(response.data);
      }
    } catch (error) {
      console.error(error);
    }
  };

  // Use useEffect to apply the initial filter for India from 1973 to 2022
  useEffect(() => {
    // Apply the initial filter on the first load
    handleFilter();
  }, []); // Empty dependency array to run this effect only once on initial load

  return (
    <div className="container mt-3">
      <h2>Filter Data</h2>
      <div className="row">
        <div className="col-md-4">
          <label>Countries:</label>
          <Select
            isMulti
            options={countriesOptions}
            value={selectedCountries}
            onChange={handleCountryChange}
          />
        </div>
        <div className="col-md-4">
          <label>From Year:</label>
          <select
            className="form-control"
            value={fromYear}
            onChange={(e) => setFromYear(parseInt(e.target.value))}
          >
            {Array.from({ length: currentYear - 1973 + 1 }, (_, index) => (
              <option key={index} value={1973 + index}>
                {1973 + index}
              </option>
            ))}
          </select>
        </div>
        <div className="col-md-4">
          <label>To Year:</label>
          <select
            className="form-control"
            value={toYear}
            onChange={(e) => setToYear(parseInt(e.target.value))}
          >
            {Array.from({ length: currentYear - 1973 + 1 }, (_, index) => (
              <option key={index} value={1973 + index}>
                {1973 + index}
              </option>
            ))}
          </select>
        </div>
      </div>
      <button className="btn btn-primary mt-3" onClick={handleFilter}>
        Filter
      </button>
    </div>
  );
};

export default FilterComponent;
