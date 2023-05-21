import './_TopMenu.css';

function TopMenu(props) {
    const { pageName } = props;
    return (
        <div className="top-menu">
            <h4 className="top-menu-header-text">Home</h4>
        </div>
    )
}

export default TopMenu;