import axios from "axios";
import { Sun, Moon } from "lucide-react";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { removeUser } from "../utils/userSlice";
const NavBar = () => {
    const [theme, setTheme] = useState("dracula");
    const dispatch = useDispatch();
  const navigate = useNavigate();
  
    const toggleTheme = () => {
      const newTheme = theme === "dracula" ? "light" : "dracula";
      setTheme(newTheme);
      document.documentElement.setAttribute("data-theme", newTheme);
    };
  
  // setting up profile-img
  const user = useSelector((store) => store.user);

  const handleLogout = async () => {
    try {
      await axios.post(`${import.meta.env.VITE_SERVER_BACKEND_BASEURL}/logout`, {}, { withCredentials: true });
      dispatch(removeUser());
      return navigate("/login");
    } catch (error) {
      console.log(error);      
    }
  }

  return (
    <div className="navbar bg-base-300 shadow-sm">
      <div className="flex-1">
        <Link to="/" className="btn btn-ghost text-xl gap-2">🧑‍💻 DevTinder</Link>
      </div>

      <div className="flex gap-3 items-center">
        {/* Theme Toggle Button */}
        <button
          onClick={toggleTheme}
          className="swap swap-rotate btn btn-ghost btn-circle"
        >
          <input
            type="checkbox"
            checked={theme === "dracula"}
            onChange={toggleTheme}
            className="hidden" // hide checkbox, control swap via state
          />
          <Sun className="swap-off w-6 h-6 text-yellow-500" />
          <Moon className="swap-on w-6 h-6 text-purple-500" />
        </button>

        {/* Profile Dropdown */}
        {user && (
          <div className="dropdown flex dropdown-end mx-5">
            <p className="px-4 self-center">Welcome, {user.firstName}</p>
            <div
              tabIndex={0}
              role="button"
              className="btn btn-ghost btn-circle avatar"
            >
              <div className="w-10 rounded-full">
                <img alt="User photo" src={user.photoUrl} />
              </div>
            </div>
            <ul
              tabIndex={0}
              className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52"
            >
              <li>
                <Link to="/profile" className="justify-between">
                  Profile
                  <span className="badge">New</span>
                </Link>
              </li>
              <li>
                <Link to="/connections">Connections</Link>
              </li>
              <li>
                <Link onClick={handleLogout}>Logout</Link>
              </li>
            </ul>
          </div>
        )}
      </div>
    </div>
  );
}

export default NavBar