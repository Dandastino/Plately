import { useCallback } from 'react'
import React from 'react'
import './MenuLayout.css'

const MenuLayout = ({ setSearchParams }) => {
  const handleFilterChange = useCallback((key, value) => {
    setSearchParams(prevParams => {
      const newParams = new URLSearchParams(prevParams);
      if (value) {
        newParams.set(key, value);
      } else {
        newParams.delete(key);
      }
      return newParams;
    });
  }, [setSearchParams]);

  const filterOptions = {
    course: [
      { value: '', label: '-- All types --' },
      { value: 'appetizer', label: 'Appetizer' },
      { value: 'primo', label: 'First Course' },
      { value: 'secondo', label: 'Second Course' },
      { value: 'pizza', label: 'Pizza' },
      { value: 'side', label: 'Side' },
      { value: 'drink', label: 'Drink' }
    ],
    allergies: [
      { value: '', label: '-- All types --' },
      { value: 'land', label: 'Land' },
      { value: 'fish', label: 'Sea' },
      { value: 'vegetarian', label: 'Vegetarian' },
      { value: 'vegan', label: 'Vegan' },
      { value: 'gluten free', label: 'Gluten Free' }
    ]
  };

  return (
    <div className="filter-controls">
      <div className="filter-group">
        <label htmlFor="type-select">Filter by Course</label>
        <select
          id="type-select"
          onChange={(e) => handleFilterChange('type', e.target.value)}
          className="filter-select"
        >
          {filterOptions.course.map(option => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
      </div>

      <div className="filter-group">
        <label htmlFor="allergies-select">Filter by Dietary</label>
        <select
          id="allergies-select"
          onChange={(e) => handleFilterChange('allergies', e.target.value)}
          className="filter-select"
        >
          {filterOptions.allergies.map(option => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
};

export default MenuLayout; 