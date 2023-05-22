import './_Filter.css';

function Filter(props) {
    return (
        <div className="filter-container">
            <div className="filter-header">
                <button className="clear-filters-button">Clear all</button>
                <h4>Filter</h4>
                <svg width="17" height="17" viewBox="0 0 17 17" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M4 4L13 13" stroke="#424242" strokeWidth="2" strokeLinecap="round"/><path d="M13 4L4 13" stroke="#424242" strokeWidth="2" strokeLinecap="round"/></svg>
            </div>
            <div className="filter-options">
                <h5>Friend Status</h5>
                <div>
                        <label>Close Friends</label>
                        <input type="checkbox" value="Close Friends"></input><br></br>
                    
                        <label>Super Close Friends</label>
                        <input type="checkbox" value="Super Close Friends"></input>
                    
                </div>
            </div>
            <div className="filter-footer">
                <button className="apply-filters-button">Apply</button>
            </div>
        </div>
    )
}

export default Filter;