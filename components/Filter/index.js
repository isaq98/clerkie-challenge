'use client';
import './_Filter.css';
import { useState } from 'react';

function Filter(props) {
    const [ activeCheckboxes, setActiveCheckboxes ] = useState(new Array(2).fill(false));
    const { setFiltersCallback, setApplyCallback, setVisibilityCallback, activeFilters } = props;

    /* TODO: clean this up too */

    const onSubmitHandler = (event) => {
        event.preventDefault();
        const activeNames = [];
        for(let i = 0; i < event.target.elements.length; i++) {
            if(event.target.elements[i].checked) {
                activeNames.push(event.target.elements[i].value);
            }
        }
        if(activeNames.length > 0) {
            activeNames.map((element) => setFiltersCallback((currValues) => { 
                if(currValues.length > 0 && !currValues.includes(element)) {
                    return [...currValues, element]
                }
                else {
                    return [element];
                }
            }
            ));
        }
        else {
            setFiltersCallback([]);
        }
        setApplyCallback(true);
    }

    const handleChange = (value, i) => {
        if(activeFilters.includes(value)) {
            activeCheckboxes[i] = true;
            setActiveCheckboxes(activeCheckboxes);
        }
        setActiveCheckboxes((currValues) => currValues.map((element, idx) => idx === i ? !element : element));
        setFiltersCallback((currFilters) => currFilters.filter((element) => element !== value))
    }

    const handleClear = () => {
        setActiveCheckboxes(new Array(2).fill(false));
        setFiltersCallback([]);
    }

    const renderCheckboxInput = (value, index) => {
        return (
            <div className="checkbox-container">
                <label htmlFor={value}>{value}</label>
                <input type="checkbox" name="status" id={value} value={value} onChange={() => handleChange(value, index)} checked={activeCheckboxes[index] || activeFilters.includes(value)} />
            </div>
        )
    }

    return (
        <div className="filter-container">
            <div className="filter-header">
                <div className="clear-filter-container">
                    <button 
                        className={`clear-filters-button${activeCheckboxes.filter((elem) => elem !== false).length > 0 || activeFilters.length > 0 ? ' active' : ''}`} 
                        onClick={handleClear}>
                            Clear all
                    </button>
                </div>
                <div className="filter-title">
                    <p>Filter</p>
                </div>
                <div className="exit-filter" onClick={() => setVisibilityCallback(false)}>
                    <svg width="17" height="17" viewBox="0 0 17 17" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M4 4L13 13" stroke="#424242" strokeWidth="2" strokeLinecap="round"/><path d="M13 4L4 13" stroke="#424242" strokeWidth="2" strokeLinecap="round"/></svg>
                </div>
            </div>
            <form onSubmit={onSubmitHandler}>
                <div className="filter-options">
                    <p>Friend Status</p>
                   {renderCheckboxInput("Close Friends", 0)}
                   {renderCheckboxInput("Super Close Friends", 1)}
                </div>
                <div className="filter-footer">
                    <button type="submit" className="apply-filters-button">Apply</button>
                </div>
            </form>
        </div>
    )
}

export default Filter;