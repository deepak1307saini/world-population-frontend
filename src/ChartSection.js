import React, { useState, useEffect, useRef, useCallback } from 'react';
import Chart from 'chart.js/auto';

const ChartSection = ({ data }) => {
  const chartRef = useRef(null);
  const chartInstanceRef = useRef(null);

  const updateChartSize = useCallback(() => {
    if (chartRef && chartRef.current) {
      const parentWidth = chartRef.current.parentElement.clientWidth;

      // Set the canvas width to match the parent container's width
      chartRef.current.width = parentWidth;

      // Ensure the chartInstance is available and update its size
      if (chartInstanceRef.current) {
        chartInstanceRef.current.resize();
      }
    }
  }, []);

  useEffect(() => {
    if (chartInstanceRef.current) {
      chartInstanceRef.current.destroy(); // Destroy the previous chart instance
    }

    if (chartRef && chartRef.current) {
      const ctx = chartRef.current.getContext('2d');

      const countries = [...new Set(data.map((item) => item.country))]; // Get unique country values

      const datasets = countries.map((country, index) => {
        // Generate a unique color for each country
        const color = `rgba(${Math.random() * 255}, ${Math.random() * 255}, ${Math.random() * 255}, 1)`;

        return {
          label: country,
          data: data
            .filter((item) => item.country === country)
            .map((item) => ({
              x: item.year,
              y: item.population,
            })),
          borderColor: color, // Assign a unique color to the line
          borderWidth: 1,
          fill: false,
          pointStyle: 'circle', // Display data points as circles
          pointRadius: 2, // Set the radius of data points
          pointBorderColor: color, // Set the same unique color for data point borders
        };
      });

      // Calculate the min and max year values
      const minYear = Math.min(...data.map((item) => item.year));
      const maxYear = Math.max(...data.map((item) => item.year));

      // Find the minimum and maximum population values in the data
      const populationValues = data.map((item) => item.population);
      const minPopulation = Math.min(...populationValues);
      const maxPopulation = Math.max(...populationValues);

      // Determine whether to show population in exponential notation
      const showPopulationInExponential = window.innerWidth < 450;

      const newChartInstance = new Chart(ctx, {
        type: 'line', // Use line chart type to connect data points with lines
        data: {
          labels: data.map((item) => item.date),
          datasets: datasets,
        },
        options: {
          responsive: true,
          animationEnabled: true,
          zoomEnabled: true,
          scales: {
            x: {
              type: 'linear',
              min: minYear, // Set the minimum year
              max: maxYear + 1, // Set the maximum year
              beginAtZero: true,
              title: {
                display: true,
                text: 'Year', // X-axis label
              },
            },
            y: {
              type: 'linear',
              min:  minPopulation - minPopulation / 5, // Set the adjusted y-axis minimum
              max:  maxPopulation + maxPopulation / 15, // Set the adjusted y-axis maximum
              beginAtZero: true,
              title: {
                display: true,
                text: showPopulationInExponential
                  ? 'Population (e)'
                  : 'Population', // Y-axis label
              },
              ticks: {
                callback: function (value) {
                  // Check if the value is less than 10^3 (1,000)
        if (Math.abs(value) < 1e3) {
          return value.toFixed(2); // Display as-is with two decimal places
        }
        
        // For values greater than or equal to 10^3, format in exponential notation
        return value.toExponential(2); // Format in exponential notation with two decimal places
                },
              },
            },
          },
        },
      });

      chartInstanceRef.current = newChartInstance;
    }
  }, [data]);

  window.addEventListener('resize', updateChartSize);

  return (
    <div className="container mt-5">
      <h3 className="text-center">Population Chart</h3>
      <div className="row">
        <div className="col-md-12">
          <canvas ref={chartRef}></canvas>
        </div>
      </div>
    </div>
  );
};

export default ChartSection;
