import { useCallback, useState } from 'react'
import React from 'react'
import './MenuLayout.css'

const MenuLayout = ({ children, setSearchParams }) => {
  const [selectedFilters, setSelectedFilters] = useState({
    course: [],
    allergies: []
  })

  const handleFilterChange = useCallback((category, value) => {
    setSelectedFilters(prev => {
      const newFilters = { ...prev }
      const index = newFilters[category].indexOf(value)
      
      if (index === -1) {
        newFilters[category] = [...newFilters[category], value]
      } else {
        newFilters[category] = newFilters[category].filter(v => v !== value)
      }

      // Aggiorna i parametri URL
      setSearchParams(prevParams => {
        const newParams = new URLSearchParams(prevParams)
        if (newFilters[category].length > 0) {
          newParams.set(category, newFilters[category].join(','))
        } else {
          newParams.delete(category)
        }
        return newParams
      })

      return newFilters
    })
  }, [setSearchParams])

  const filterOptions = {
    course: [
      { value: 'appetizer', label: 'Appetizer' },
      { value: 'primo', label: 'First Course' },
      { value: 'secondo', label: 'Second Course' },
      { value: 'pizza', label: 'Pizza' },
      { value: 'side', label: 'Side' },
      { value: 'drink', label: 'Drink' }
    ],
    allergies: [
      { value: 'land', label: 'Land' },
      { value: 'fish', label: 'Sea' },
      { value: 'vegetarian', label: 'Vegetarian' },
      { value: 'vegan', label: 'Vegan' },
      { value: 'gluten free', label: 'Gluten Free' }
    ]
  }

  return (
    <div className="menu-container">
      <div className="filter-controls">
        <h2 className="section-title">Filter Menu</h2>
        
        <div className="filter-group">
          <label>Course Type</label>
          <div className="checkbox-group">
            {filterOptions.course.map(option => (
              <label key={option.value} className="checkbox-item">
                <input
                  type="checkbox"
                  checked={selectedFilters.course.includes(option.value)}
                  onChange={() => handleFilterChange('course', option.value)}
                />
                <span>{option.label}</span>
              </label>
            ))}
          </div>
        </div>

        <div className="filter-group">
          <label>Dietary Preferences</label>
          <div className="checkbox-group">
            {filterOptions.allergies.map(option => (
              <label key={option.value} className="checkbox-item">
                <input
                  type="checkbox"
                  checked={selectedFilters.allergies.includes(option.value)}
                  onChange={() => handleFilterChange('allergies', option.value)}
                />
                <span>{option.label}</span>
              </label>
            ))}
          </div>
        </div>

        {(selectedFilters.course.length > 0 || selectedFilters.allergies.length > 0) && (
          <div className="active-filters">
            {selectedFilters.course.map(filter => (
              <div key={filter} className="active-filter">
                {filterOptions.course.find(opt => opt.value === filter)?.label}
                <button onClick={() => handleFilterChange('course', filter)}>×</button>
              </div>
            ))}
            {selectedFilters.allergies.map(filter => (
              <div key={filter} className="active-filter">
                {filterOptions.allergies.find(opt => opt.value === filter)?.label}
                <button onClick={() => handleFilterChange('allergies', filter)}>×</button>
              </div>
            ))}
          </div>
        )}
      </div>

      <div className="menu-content">
        {children}
      </div>
    </div>
  )
}

export default MenuLayout