import React from 'react';
import './sort-type-dropdown.scss';

const friendlyNames = {
    'NAME_ASCENDING': 'Naziv rastuce',
    'NAME_DESCENDING': 'Naziv opadajuce',
    'ADDRESS_ASCENDING': 'Adresa rastuce',
    'ADDRESS_DESCENDING': 'Adresa opadajuce'
};

export default function SortTypeDropdown({ sortTypes, selectedSort, onSortChange }) {
    return (
        <div className="sort-dropdown">
            <label htmlFor="sort-select">Sort by: </label>
            <select
                id="sort-select"
                value={selectedSort ?? ''}
                onChange={(e) => onSortChange(e.target.value)}
                className="sort-select"
            >
                {sortTypes.map((option) => (
                    <option key={option.key} value={option.key}>
                        {friendlyNames[option.name] || option.name}
                    </option>
                ))}
            </select>
        </div>
    );
}