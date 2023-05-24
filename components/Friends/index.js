'use client';
import { useState, useEffect } from 'react';
import { mockFriendsObject } from "@/constants/enums";
import { getFriends } from '@/services/FriendServices';
import FriendLoader from '../FriendLoader';
import FilterButton from '../FilterButton';
import Filter from '../Filter';
import "./_Friends.css";

/* TODO: Feel like this component can be cleaned up too */

function Friends() {
    const [ friends, setFriends ]= useState([]);
    const [ activeFilters, setActiveFilters ] = useState([]);
    const [ yScroll, setYScroll ] = useState(window.scrollY);
    const [ isLoading, setIsLoading ] = useState(false);
    const [ applyFilters, setApplyFilters ] = useState(false);
    const [ filterVisibility, setFilterVisibility ] = useState(false);
    const [ endReached, setEndReached ] = useState(false);
    const [ page, setPage ] = useState(0);

    const friendsObjLength = mockFriendsObject.length; //We wouldn't know the size of the payload ahead of time
    const friendsPerScroll = 7;
    
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
        return friends.map((friendElem, idx) => {
            return ( 
                <div className="friend-card" key={`${friendElem}-${idx}`}>
                    <h4>{friendElem.name} {friendElem?.friend_state ? <span className={`friend-status ${determineFriendStatus(friendElem?.friend_state)}`}>{friendElem?.friend_state}</span> : null}</h4>
                    <p className="contact-info">
                        {friendElem.email} 
                        <svg width="4" height="5" viewBox="0 0 4 5" fill="none" xmlns="http://www.w3.org/2000/svg"><circle cx="2" cy="2.5" r="2" fill="#ABABAB"/></svg>
                        {friendElem.phone}
                    </p>
                </div>
            )
        })
    }

      const paginateFriends = () => {
        setIsLoading(true);
        if(!endReached) {
            const nextChunk = friends.slice(page * friendsPerScroll, (page + 1) * friendsPerScroll);
            if(friends.length >= friendsObjLength) {
                setEndReached(true);
            }
            loadFriendCards(nextChunk);
        }
    }

    useEffect(() => {
        getFriends([], 0, 7).then((data) => setFriends(data.friends));
      }, [])


    const loadFriendCards = (newData) => {
        setFriends((currFriends) => [...currFriends, ...newData]);
        setIsLoading(false);
    }

    const handleScroll = () => {
        if(yScroll < window.scrollY) {
            const scrollTop = document.documentElement.scrollTop
            const scrollHeight = document.documentElement.scrollHeight
            const clientHeight = document.documentElement.clientHeight

            if (scrollTop + clientHeight >= scrollHeight) {
                setPage((currValue) => {
                    currValue += 1;
                    getFriends([], currValue, 7).then((data) => setFriends((currFriends) => [...currFriends, ...data.friends]));
                    return currValue;
                })
            }
            setYScroll(window.scrollY);
            paginateFriends();
        }
      };

      useEffect(() => {
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
      }, [isLoading]);

    const filterFriends = () => {
        if(activeFilters.length === 0) {
           getFriends([], 0, 7)
           .then((data) => 
           setFriends(() => {
            setPage(0);
            return data.friends;
           }));
        }
        else {
            getFriends(activeFilters, page, 7).then((data) => setFriends(data.friends));
        }
    }

    useEffect(() => {
        if(applyFilters) {
            filterFriends();
        }
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
            {filterVisibility && <Filter setFiltersCallback={setActiveFilters} setApplyCallback={setApplyFilters} setVisibilityCallback={setFilterVisibility} activeFilters={activeFilters}/>}
            <div className="friends-list">
                {renderFriends()}
                {isLoading && !endReached && <FriendLoader />}
            </div>
        </div>
    )
}

export default Friends;