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
    const [ showLoading, setShowLoading ] = useState(false);
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

      const paginateFriends = () => {
        setShowLoading(true);
        if(!endReached) {
            const nextChunk = friends.slice(page * friendsPerScroll, (page + 1) * friendsPerScroll);
            loadFriendCards(nextChunk);
        }
    }

    useEffect(() => {
        if(page * friendsPerScroll > friends.length) {
            setEndReached(true);
            setShowLoading(false);
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
        setInitialLoad(true)
        getFriends([], 0, 7).then((data) => { 
            setFriends(data.friends); 
            setInitialLoad(false); 
        });
      }, [])


    const loadFriendCards = (newData) => {
        setFriends((currFriends) => [...currFriends, ...newData]);
        setShowLoading(false);
    }

    const handleScroll = () => {
            const scrollTop = document.documentElement.scrollTop
            const scrollHeight = document.documentElement.scrollHeight
            const clientHeight = document.documentElement.clientHeight

            if (scrollTop + clientHeight >= scrollHeight) {
                //setShowLoading(true);
                setPage((currValue) => {
                    return currValue += 1;
                })
            }
            paginateFriends();
      };

      useEffect(() => {
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
      }, [showLoading]);

    const filterFriends = () => {
        getFriends(activeFilters.length > 0 ? activeFilters : [], 0, 7)
           .then((data) => 
            setFriends(() => {
            setInitialLoad(false);
            setPage(0);
            setEndReached(false);
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
                setFilterVisibility={setFilterVisibility}
                setLoadingCallback={setInitialLoad}
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
                {showLoading && !endReached && <FriendLoader />}
            </div>
        </div>
    )
}

export default Friends;