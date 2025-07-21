import {Link, NavLink} from "react-router-dom";

const Toolbar = () => {
  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-primary">
      <div className="container">
        <Link to={'/'} className="navbar-brand">Plovo</Link>
        <div className="navbar-collapse collapse">
          <ul className="navbar-nav ms-auto">
            <li className="nav-item">
              <NavLink to={'/'} className="nav-link">Home</NavLink>
            </li>
            <li className="nav-item">
              <NavLink to={'/new-dish'} className="nav-link">New Dish</NavLink>
            </li>
            <li className="nav-item">
              <NavLink to={'/orders'} className="nav-link">Orders</NavLink>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Toolbar;