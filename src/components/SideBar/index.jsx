import "../../App.css";
import { sideBardata } from "./SideBarData";
import { Link, useLocation } from "react-router-dom";
function SideBar() {

  const location = useLocation();
  return (
    <div className="sideBar">
      {sideBardata.map((val, key) => {
        return (
          <li className="list">
           
              <Link className="links" to={val.link}>
              <div
              className="link-item"
              id={location.pathname === val.link ? "active" : ""}
            >
              <div className="link-icon">{val.icon}</div>
              <div className="link-title">
                
                  {val.title}
                
              </div>
              </div>
              </Link>
            
          </li>
        );
      })}
    </div>
  );
}

export default SideBar;
