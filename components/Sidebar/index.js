import "./_Sidebar.css";

function Sidebar() {
    const mockNavigationObject = [
        {
            title: 'Home'
            //img: enter img URL here
        },
        {
            title: 'Friends'
            //img: enter img URL here
        }
    ];

    const renderSidebarButtons = () => {
        return (
            <ul>
                {mockNavigationObject.map((element, idx) => <li key={`${element}-${idx}`} className={`sidebar-button ${idx}`}>{element.title}</li>)}
            </ul>
        )
    }

    return (
       <div className="sidebar-container">
            <div className="sidebar-header">
                {/* Add image before string */}
                <h4 className="sidebar-title">Clerkie Challenge</h4>
            </div>
            <div className="sidebar-body">{renderSidebarButtons()}</div>
       </div>
    )
}

export default Sidebar;