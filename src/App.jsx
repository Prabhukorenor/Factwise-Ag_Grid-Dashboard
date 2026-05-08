import React, { useState, useEffect } from 'react';
import { Header } from './components/Header/Header';
import { SummaryCards } from './components/SummaryCards/SummaryCards';
import { EmployeeGrid } from './components/EmployeeGrid/EmployeeGrid';
import { AnalyticsCharts } from './components/Charts/AnalyticsCharts';
import employeeData from './data/employees.json';
import './styles/global.css';
import './styles/dashboard.css';

function App() {
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [searchValue, setSearchValue] = useState('');

  // Apply theme class to document element
  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.setAttribute('data-theme', 'dark');
    } else {
      document.documentElement.removeAttribute('data-theme');
    }
  }, [isDarkMode]);

  const toggleTheme = () => {
    setIsDarkMode(!isDarkMode);
  };

  return (
    <div className="dashboard-container">
      <Header 
        isDarkMode={isDarkMode} 
        toggleTheme={toggleTheme} 
        onSearch={setSearchValue} 
      />
      <main className="dashboard-main">
        <SummaryCards data={employeeData} />
        <AnalyticsCharts data={employeeData} />
        <EmployeeGrid 
          rowData={employeeData} 
          searchValue={searchValue} 
          isDarkMode={isDarkMode}
        />
      </main>
    </div>
  );
}

export default App;
