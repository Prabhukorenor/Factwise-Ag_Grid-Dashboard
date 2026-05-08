import React from 'react';
import { Search, Moon, Sun, LayoutDashboard } from 'lucide-react';
import '../../styles/dashboard.css';

export const Header = ({ isDarkMode, toggleTheme, onSearch }) => {
  return (
    <header className="dashboard-header">
      <div className="header-title">
        <LayoutDashboard className="text-primary" size={28} color="var(--primary-color)" />
        Employee Analytics
      </div>
      <div className="header-actions">
        <div className="search-container">
          <Search className="search-icon" size={18} />
          <input 
            type="text" 
            className="search-input" 
            placeholder="Search employees..." 
            onChange={(e) => onSearch(e.target.value)}
          />
        </div>
        <button 
          className="theme-toggle" 
          onClick={toggleTheme}
          aria-label="Toggle theme"
        >
          {isDarkMode ? <Sun size={20} /> : <Moon size={20} />}
        </button>
      </div>
    </header>
  );
};
