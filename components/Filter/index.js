import './_Filter.css';

function Filter(props) {

    const { setFiltersCallback, setApplyCallback } = props;

    const onSubmitHandler = (event) => {
        event.preventDefault();
        setApplyCallback(true);
    }

    const handleChange = (event) => {
        const {value, checked} = event.target;
        if(checked) {
            setFiltersCallback((currValues) => [...currValues, value]);
        }
        else {
            setFiltersCallback((currValues) => currValues.filter((element) => element !== value));
        }
    }

    return (
        <div className="filter-container">
            <div className="filter-header">
                <div>
                <button className="clear-filters-button">Clear all</button>
                </div>
                <div>
                <h4>Filter</h4>
                </div>
                <div>
                <svg width="17" height="17" viewBox="0 0 17 17" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M4 4L13 13" stroke="#424242" strokeWidth="2" strokeLinecap="round"/><path d="M13 4L4 13" stroke="#424242" strokeWidth="2" strokeLinecap="round"/></svg>
                </div>
            </div>
            <form onSubmit={onSubmitHandler}>
                <div className="filter-options">
                    <p>Friend Status</p>
                    <div className="checkbox-container">
                        <label htmlFor="Close Friends">Close Friends</label>
                        <input type="checkbox" name="status" id="Close Friends" value="Close Friends" onChange={handleChange}/>
                    </div>
                    <div className="checkbox-container">
                        <label htmlFor="Super Close Friends">Super Close Friends</label>
                        <input type="checkbox" name="status" id="Super Close Friends" value="Super Close Friends" onChange={handleChange}/>
                    </div>
                </div>
                <div className="filter-footer">
                    <button type="submit" className="apply-filters-button">Apply</button>
                </div>
            </form>
        </div>
    )
}

export default Filter;