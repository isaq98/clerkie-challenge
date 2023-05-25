'use client';
import { useState, useEffect } from 'react';
import { getFriends } from '@/services/FriendServices';
import FriendLoader from '../FriendLoader';
import FilterButton from '../FilterButton';
import Filter from '../Filter';
import "./_Friends.css";

/* TODO: Feel like this component can be cleaned up too */

function Friends() {
    const [ friends, setFriends ]= useState([]);
    const [ activeFilters, setActiveFilters ] = useState([]);
    const [ isLoading, setIsLoading ] = useState(false);
    const [ applyFilters, setApplyFilters ] = useState(false);
    const [ initialLoad, setInitialLoad ] = useState(false);
    const [ filterVisibility, setFilterVisibility ] = useState(false);
    const [ endReached, setEndReached ] = useState(false);
    const [ page, setPage ] = useState(0);

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

    useEffect(() => {
        setInitialLoad(true)
        getFriends([], 0, 7).then((data) => { 
            setFriends(data.friends); 
            setInitialLoad(false); 
        });
      }, [])

    const renderContent = () => {
        if(initialLoad) {
            const res = [];
            for(let i = 0; i < friendsPerScroll; i++) {
                res.push(<FriendLoader key={`loader-${i}`} />)
            }
            return res;
        }
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

    useEffect(() => {
        if(page * friendsPerScroll > friends.length) {
            setEndReached(true);
            setIsLoading(false);
        }
        else {
            if(page === 0) {
                getFriends(activeFilters, 0, 7).then((data) => setFriends(data.friends));
            }
            else {
                getFriends(activeFilters, page, 7).then((data) => setFriends((currFriends) => [...currFriends, ...data.friends]));
            }
        }
    }, [page])

    useEffect(() => {
        if(isLoading) {
            setIsLoading(false);
        }
    }, [friends])

    const handleScroll = () => {
        if (window.innerHeight + document.documentElement.scrollTop === document.documentElement.offsetHeight || isLoading) {
            return;
            }
        else if(!endReached) {
            setIsLoading(true);
            setPage((currPage) => currPage + 1);
        }
        else {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, [isLoading]);

    const filterFriends = () => {
        getFriends(activeFilters.length > 0 ? activeFilters : [], 0, 7)
           .then((data) => 
            setFriends(() => {
                setInitialLoad(false);
                setPage(0);
                setEndReached(false);
                setIsLoading(true);
                return data.friends;
            }));
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
                filterVisibility={filterVisibility}
                setFilterVisibility={setFilterVisibility}
                setLoadingCallback={setInitialLoad}
                setOtherLoadingCallback={setIsLoading}
            />
            {
                filterVisibility && 
                <Filter 
                    setFiltersCallback={setActiveFilters} 
                    setApplyCallback={setApplyFilters} 
                    setVisibilityCallback={setFilterVisibility} 
                    activeFilters={activeFilters} 
                    setLoadingCallback={setInitialLoad}
                />
            }
            <div className="friends-list">
                {renderContent()}
            </div>
            {(!endReached && isLoading) && <FriendLoader /> }
        </div>
    )
}

export default Friends;