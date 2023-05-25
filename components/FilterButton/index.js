import "./_FilterButton.css";

function FilterButton(props) {
    const { setActiveFilters, setApplyFilters, setFilterVisibility, filterVisibility, activeFiltersLength, setLoadingCallback, setOtherLoadingCallback, setEndReached} = props;

    const clearAllFilters = () => {
        setActiveFilters([]);
        setLoadingCallback(true);
        setOtherLoadingCallback(true);
        setApplyFilters(true);
    }

    return (
        <div className="filter-content">
            <button className={`filter-button${filterVisibility || activeFiltersLength > 0 ? ' active' : ''}`} onClick={() => setFilterVisibility((currVal) => !currVal)}>
                <svg width="19" height="21" viewBox="0 0 19 21" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M2 3.5H18" stroke="#424242" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/><circle cx="3" cy="3.5" r="2.25" fill="white" stroke="#424242" strokeWidth="1.5"/><path d="M17 10.5H1" stroke="#424242" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/><circle cx="3" cy="3" r="2.25" transform="matrix(-1 0 0 1 19 7.5)" fill="white" stroke="#424242" strokeWidth="1.5"/><path d="M2 17.5H18" stroke="#424242" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/><circle cx="3" cy="17.5" r="2.25" fill="white" stroke="#424242" strokeWidth="1.5"/></svg>
                {activeFiltersLength > 0 ? <span className="active-filter-count">{activeFiltersLength}</span> : ''}
            </button>
            <svg className="svg-divider" width="2" height="30" viewBox="0 0 2 30" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M1 1L1 29" stroke="#D7D7D7" strokeLinecap="round" strokeLinejoin="round"/></svg>
            <button className={`clear-filters-button${activeFiltersLength ? ' active' : ''}`} onClick={clearAllFilters}>Clear all</button>
        </div>
    )
}

export default FilterButton;