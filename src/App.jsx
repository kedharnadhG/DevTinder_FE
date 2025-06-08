import { Sun, Moon } from "lucide-react";
import { useEffect, useState } from "react";
function App() {
  const [theme, setTheme] = useState("dracula");

  const toggleTheme = () => {
    const newTheme = theme === "dracula" ? "light" : "dracula";
    setTheme(newTheme);
    document.documentElement.setAttribute("data-theme", newTheme);
  };

  // Optional: set default theme on mount
  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
  }, [theme]);
  return (
    <>
      <div className="navbar bg-base-300 shadow-sm">
        <div className="flex-1">
          <a className="btn btn-ghost text-xl gap-2">
            🧑‍💻  DevTinder
          </a>
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
          <div className="dropdown dropdown-end mx-5">
            <div
              tabIndex={0}
              role="button"
              className="btn btn-ghost btn-circle avatar"
            >
              <div className="w-10 rounded-full">
                <img
                  alt="User avatar"
                  src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp"
                />
              </div>
            </div>
            <ul
              tabIndex={0}
              className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52"
            >
              <li>
                <a className="justify-between">
                  Profile
                  <span className="badge">New</span>
                </a>
              </li>
              <li>
                <a>Settings</a>
              </li>
              <li>
                <a>Logout</a>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </>
  );
}

export default App;
