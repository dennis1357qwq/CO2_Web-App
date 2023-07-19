import { LogoutButton } from "./LogoutButton";
import { NavLink, useNavigate, useParams } from "react-router-dom";
import { UserContext } from "../context/UserContext";
import { useContext } from "react";

export default function Navbar() {
  const userContext = useContext(UserContext);
  const user_id = userContext.user?.user_id;

  return (
    /*
        This example requires updating your template:
      
        ```
        <html class="h-full bg-gray-100">
        <body class="h-full">
        ```
      */
    <div className="navbar min-h-full sticky top-0 z-40">
      <nav className="bg-gray-800 max-h-2xl">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex h-16 items-center justify-between">
            <div className="flex items-center">
              <div className="flex-shrink-0"></div>
              <div className="ml-10 flex items-baseline space-x-4">
                <div>
                  <NavLink to={`/dashboard/${user_id}`}>
                    <button
                      className="bg-gray-900 text-white rounded-md px-3 py-2 transition duration-500 ease select-none hover:bg-teal-600 focus:outline-none focus:shadow-outline text-sm font-medium"
                      id="Home"
                    >
                      <div className="flex gap-2">
                        <div className="Home-icon">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            strokeWidth={1.5}
                            stroke="currentColor"
                            className="w-6 h-6"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              d="M2.25 12l8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25"
                            />
                          </svg>
                        </div>
                        <div className="Home-text m-0.5">Home</div>
                      </div>
                    </button>
                  </NavLink>
                </div>
                <div>
                  <NavLink to={`/newCenter/${user_id}`}>
                    <button
                      className="bg-gray-700 text-white rounded-md px-3 py-2 transition duration-500 ease select-none hover:bg-teal-600 focus:outline-none focus:shadow-outline text-sm font-medium"
                      id="AddButton"
                    >
                      <div className="flex gap-2">
                        <div>
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            strokeWidth={1.5}
                            stroke="currentColor"
                            className="w-6 h-6"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              d="M12 4.5v15m7.5-7.5h-15"
                            />
                          </svg>
                        </div>
                        <div className="AddCenter-text m-0.5">Add Center</div>
                      </div>
                    </button>
                  </NavLink>
                </div>
                <div>
                  <NavLink to={`/newScenario`}>
                    <button
                      className="bg-gray-700 text-white rounded-md px-3 py-2 transition duration-500 ease select-none hover:bg-teal-600 focus:outline-none focus:shadow-outline text-sm font-medium"
                      id="AddButton"
                    >
                      <div className="flex gap-2">
                        <div>
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            strokeWidth={1.5}
                            stroke="currentColor"
                            className="w-6 h-6"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              d="M12 9v6m3-3H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z"
                            />
                          </svg>
                        </div>
                        <div className="AddScenario-text m-0.5">
                          New Scenario
                        </div>
                      </div>
                    </button>
                  </NavLink>
                </div>
              </div>
            </div>

            <div className="ml-4 flex items-center md:ml-6">
              {userContext.authenticated ? (
                <span className="login-text text-white px-3 text-sm font-medium">
                  Signed in as: {userContext.user.username}
                </span>
              ) : null}
              <LogoutButton />
            </div>

            <div className="-mr-2 flex md:hidden"></div>
          </div>
        </div>
      </nav>
    </div>
  );
}
