'use client';
import { useState, useEffect } from 'react';
import { mockFriendsObject } from "@/constants/enums";
import FriendLoader from '../FriendLoader';
import FilterButton from '../FilterButton';
import Filter from '../Filter';
import "./_Friends.css";

/* TODO: Feel like this component can be cleaned up too */

function Friends() {
    const [ activeFilters, setActiveFilters ] = useState([]);
    const [ filteredFriends, setFilteredFriends ] = useState(mockFriendsObject);
    const [ applyFilters, setApplyFilters ] = useState(false);
    const [ filterVisibility, setFilterVisibility ] = useState(false);

    const [items, setItems] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [perPage, setPerPage] = useState(7);
    const [error, setError] = useState(null);
    const [page, setPage] = useState(0);
    const [endReached, setEndReached] = useState(false);
    
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

    // const loadFriendCards = (newData) => {
    //     setItems((currItems) => [...currItems, ...newData]);
    //     setIsLoading(false);
    // }

    // const fetchFriends = () => {
    //     setIsLoading(true);
    //     if(!endReached) {
    //         const nextChunk = mockFriendsObject.splice(page * perPage, perPage);
    //         if(items.length >= filteredFriends.length) {
    //             setEndReached(true);
    //         }
    //         loadFriendCards(nextChunk);
    //     }
    // }

    // const handleScroll = () => {
    //     const scrollTop = document.documentElement.scrollTop
    //     const scrollHeight = document.documentElement.scrollHeight
    //     const clientHeight = document.documentElement.clientHeight
        
    //     if (scrollTop + clientHeight >= scrollHeight) {
    //         setPage(page + 1)
    //     }
    //     fetchFriends();
    //   };

    //   useEffect(() => {
    //     window.addEventListener('scroll', handleScroll);
    //     return () => window.removeEventListener('scroll', handleScroll);
    //   }, [isLoading]);

    //   useEffect(() => {
    //     fetchFriends();
    //   }, [])

    const filterFriends = () => {
        if(activeFilters.length === 0) {
            setFilteredFriends(mockFriendsObject);
        }
        else {
            let filteredItems = mockFriendsObject.filter((element) => activeFilters.includes(element?.friend_state));
            setFilteredFriends(filteredItems);
        }
    }

    const renderFriends = () => {
        return filteredFriends.map((friendElem, idx) => {
            return ( 
                <div className="friend-card" key={`${friendElem}-${idx}`}>
                    <h4>{friendElem.name} {friendElem?.friend_state ? <span className={`friend-status ${determineFriendStatus(friendElem?.friend_state)}`}>{friendElem?.friend_state}</span> : null}</h4>
                    <p className="contact-info">
                        {friendElem.email} 
                        <svg width="4" height="5" viewBox="0 0 4 5" fill="none" xmlns="http://www.w3.org/2000/svg"><circle cx="2" cy="2.5" r="2" fill="#ABABAB"/></svg>
                        {friendElem.phone}
                    </p>
                </div>
            )})
    }
    
    useEffect(() => {
        filterFriends();
        setApplyFilters(false);
    }, [applyFilters])

    return (
        <div className="friends-list-container">
            <FilterButton 
                setActiveFilters={setActiveFilters} 
                setApplyFilters={setApplyFilters} 
                activeFiltersLength={activeFilters.length} 
                setFilterVisibility={setFilterVisibility}
            />
            {filterVisibility && <Filter setFiltersCallback={setActiveFilters} setApplyCallback={setApplyFilters} setVisibilityCallback={setFilterVisibility}/>}
            <div className="friends-list">
                {renderFriends()}
                {isLoading && <FriendLoader />}
            </div>
        </div>
    )
}

export default Friends;