import React, { useCallback, useEffect, useState } from 'react'
import './MenuLayout.css'

const MenuLayout = ({ children, setSearchParams }) => {
  const [selectedFilters, setSelectedFilters] = useState({
    type: [],
    allergies: []
  })

  const handleFilterChange = useCallback((category, value) => {
    setSelectedFilters(prev => {
      const updated = { ...prev }
      if (updated[category].includes(value)) {
        updated[category] = updated[category].filter(v => v !== value)
      } else {
        updated[category] = [...updated[category], value]
      }
      return updated
    })
  }, [])

  useEffect(() => {
    setSearchParams(prevParams => {
      const newParams = new URLSearchParams(prevParams)

      if (selectedFilters.type.length > 0) {
        newParams.set('type', selectedFilters.type.join(','))
      } else {
        newParams.delete('type')
      }

      if (selectedFilters.allergies.length > 0) {
        newParams.set('allergies', selectedFilters.allergies.join(','))
      } else {
        newParams.delete('allergies')
      }

      return newParams
    })
  }, [selectedFilters, setSearchParams])

  const filterOptions = {
    type: [
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
            {filterOptions.type.map(option => (
              <label key={option.value} className="checkbox-item">
                <input
                  type="checkbox"
                  checked={selectedFilters.type.includes(option.value)}
                  onChange={() => handleFilterChange('type', option.value)}
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

        {(selectedFilters.type.length > 0 || selectedFilters.allergies.length > 0) && (
          <div className="active-filters">
            {[...selectedFilters.type, ...selectedFilters.allergies].map(filter => {
              const isType = selectedFilters.type.includes(filter)
              const label = isType
                ? filterOptions.type.find(opt => opt.value === filter)?.label
                : filterOptions.allergies.find(opt => opt.value === filter)?.label

              return (
                <div key={filter} className="active-filter">
                  {label}
                  <button onClick={() => handleFilterChange(isType ? 'type' : 'allergies', filter)}>×</button>
                </div>
              )
            })}
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
