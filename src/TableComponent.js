import React, { useState, useEffect } from 'react';
import { CSVLink } from 'react-csv';

const TableComponent = ({ data }) => {
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 15;

  const totalPages = Math.ceil(data.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentData = data.slice(startIndex, endIndex);

  const handlePrevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  useEffect(() => {
    // Reset to page 1 when data changes
    setCurrentPage(1);
  }, [data]);

  // Prepare data for export
  const exportData = currentData.map((item) => ({
    Country: item.country,
    Population: item.population,
    Year: item.year,
  }));

  // Define CSV headers
  const headers = [
    { label: 'Country', key: 'Country' },
    { label: 'Population', key: 'Population' },
    { label: 'Year', key: 'Year' },
  ];

  return (
    <div className="container mt-3">
      <h2>Population Table</h2>
      <table className="table">
        <thead>
          <tr>
            <th>Country</th>
            <th>Population</th>
            <th>Year</th>
          </tr>
        </thead>
        <tbody>
          {currentData.map((item, index) => (
            <tr key={index}>
              <td>{item.country}</td>
              <td>{item.population}</td>
              <td>{item.year}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <div className="d-flex justify-content-between">
        <button
          className="btn btn-primary"
          onClick={handlePrevPage}
          disabled={currentPage === 1}
        >
          Previous
        </button>
        <span className="mt-2">
          Page {currentPage} of {totalPages}
        </span>
        <button
          className="btn btn-primary"
          onClick={handleNextPage}
          disabled={currentPage === totalPages}
        >
          Next
        </button>
      </div>
      <CSVLink data={exportData} headers={headers} filename={'data-export.csv'}>
        <button className="btn btn-primary mt-3">Export as CSV</button>
      </CSVLink>
    </div>
  );
};

export default TableComponent;
