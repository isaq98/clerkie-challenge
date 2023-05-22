'use client';
import { useState, useEffect } from 'react';
import { mockFriendsObject } from "@/constants/enums";
import Filter from '../Filter';
import "./_Friends.css";

/* TODO: Feel like this component can be cleaned up too */

function FilterButton(props) {
    const { setActiveFilters, setApplyFilters } = props;
    const [filterVisibility, setFilterVisibility] = useState(false);
    return (
        <div className="filter-content">
            <button className={`filter-button${filterVisibility ? ' active' : ''}`} onClick={() => setFilterVisibility(!filterVisibility)}>
                <svg width="19" height="21" viewBox="0 0 19 21" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M2 3.5H18" stroke="#424242" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/><circle cx="3" cy="3.5" r="2.25" fill="white" stroke="#424242" strokeWidth="1.5"/><path d="M17 10.5H1" stroke="#424242" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/><circle cx="3" cy="3" r="2.25" transform="matrix(-1 0 0 1 19 7.5)" fill="white" stroke="#424242" strokeWidth="1.5"/><path d="M2 17.5H18" stroke="#424242" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/><circle cx="3" cy="17.5" r="2.25" fill="white" stroke="#424242" strokeWidth="1.5"/></svg>
            </button>
            <svg className="svg-divider" width="2" height="30" viewBox="0 0 2 30" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M1 1L1 29" stroke="#D7D7D7" strokeLinecap="round" strokeLinejoin="round"/></svg>
            <button className="clear-filters-button">Clear all</button>
            {filterVisibility && <Filter setFiltersCallback={setActiveFilters} setApplyCallback={setApplyFilters} />}
        </div>
    )
}

function Friends() {
    const [activeFilters, setActiveFilters] = useState([]);
    const [filteredFriends, setFilteredFriends] = useState(mockFriendsObject);
    const [applyFilters, setApplyFilters] = useState(false);

    const determineFriendStatus = (status) => {
        switch(status) {
            case 'Close Friends':
                return 'blue';
            case 'Super Close Friends':
                return 'green';
            default:
                return '';
        }
    }

    const renderFriends = () => {
        if(activeFilters.length === 0) {
            setFilteredFriends(mockFriendsObject);
        }
        else {
            let filteredItems = mockFriendsObject.filter((element) => activeFilters.includes(element?.friend_state));
            setFilteredFriends(filteredItems);
        }
    }
    
    useEffect(() => {
        renderFriends();
        setApplyFilters(false);
    }, [applyFilters])

    return (
        <div className="friends-list-container">
            <FilterButton setActiveFilters={setActiveFilters} setApplyFilters={setApplyFilters} />
            <div className="friends-list">
                { filteredFriends.map((friendElem, idx) => {
        return ( 
            <div className="friend-card" key={`${friendElem}-${idx}`}>
                <h4>{friendElem.name} {friendElem?.friend_state ? <span className={`friend-status ${determineFriendStatus(friendElem?.friend_state)}`}>{friendElem?.friend_state}</span> : null}</h4>
                <p className="contact-info">
                    {friendElem.email} 
                    <svg width="4" height="5" viewBox="0 0 4 5" fill="none" xmlns="http://www.w3.org/2000/svg"><circle cx="2" cy="2.5" r="2" fill="#ABABAB"/></svg>
                    {friendElem.phone}
                </p>
            </div>
        )})}
            </div>
        </div>
    )
}

export default Friends;