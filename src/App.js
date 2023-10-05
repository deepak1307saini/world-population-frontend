import React, { useState } from 'react';
import FilterComponent from './FilterComponent';
import TableComponent from './TableComponent';
import ChartSection from './ChartSection';

const initialData = [];

function App() {
  const [filteredData, setFilteredData] = useState(initialData);

  const handleFilter = (data) => {
    setFilteredData(data);
  };

  return (
    <div className="container-md mt-2 ">
      <h1 className="text-center">Population Visualization</h1>
      <div className="row">
        <div className="col-lg-5 col-md-12">
          <FilterComponent onFilter={handleFilter} />
        </div>

        <div className="col-lg-7 col-md-12">
          <ChartSection data={filteredData} />
        </div>
        
        <div className="col-md-12 mt-3">
          <TableComponent data={filteredData} />
        </div>
      </div>
    </div>
  );
}

export default App;
