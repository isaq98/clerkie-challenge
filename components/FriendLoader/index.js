import './_FriendLoader.css';

function FriendLoader() {
    return(
        <div className="friend-card-loader">
            <div className="loading-row">
                <div className="gradient-1"></div>
                <div className="gradient-2"></div>
            </div>
            <div className="loading-row">
                <div className="gradient-3"></div>
                <div className="gradient-4"></div>
            </div>
        </div>
    )
}

export default FriendLoader;