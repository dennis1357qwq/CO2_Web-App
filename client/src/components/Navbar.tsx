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
    <div className="min-h-full sticky">
      <nav className="bg-gray-800">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex h-16 items-center justify-between">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                {/* <img 
                  className="h-8 w-8"
                  src="https://de.freepik.com/vektoren-premium/co2-logo-im-flachen-stil-isoliert-auf-leerem-hintergrund-flaches-symbol-auf-weissem-hintergrund-vektorlogoillustration_21919868.htm"
                  alt="Your Company"
                />*/}
              </div>
              <div className="hidden md:block">
                <div className="ml-10 flex items-baseline space-x-4">
                  {/*  <-- Current: "bg-gray-900 text-white", Default: "text-gray-300 hover:bg-gray-700 hover:text-white" --> */}

                  <div>
                    <NavLink to={`/dashboard/${user_id}`}>
                      <button
                        className="bg-gray-900 text-white rounded-md px-3 py-2 transition duration-500 ease select-none hover:bg-teal-600 focus:outline-none focus:shadow-outline text-sm font-medium"
                        id="Home"
                      >
                        Home
                      </button>
                    </NavLink>
                  </div>
                  <div>
                    <NavLink to={`/newCenter/${user_id}`}>
                      <button
                        className="bg-gray-700 text-white rounded-md px-3 py-2 transition duration-500 ease select-none hover:bg-teal-600 focus:outline-none focus:shadow-outline text-sm font-medium"
                        id="AddButton"
                      >
                        Add Center
                      </button>
                    </NavLink>
                  </div>
                  <div>
                    <NavLink to={`/newScenario`}>
                      <button
                        className="bg-gray-700 text-white rounded-md px-3 py-2 transition duration-500 ease select-none hover:bg-teal-600 focus:outline-none focus:shadow-outline text-sm font-medium"
                        id="AddButton"
                      >
                        New Scenario
                      </button>
                    </NavLink>
                  </div>
                </div>
              </div>
            </div>
            <div className="hidden md:block">
              <div className="ml-4 flex items-center md:ml-6">
                {userContext.authenticated ? (
                  <span className="text-white px-3 text-sm font-medium">
                    Signed in as: {userContext.user.username}
                  </span>
                ) : null}
                <LogoutButton />
              </div>
            </div>
            <div className="-mr-2 flex md:hidden"></div>
          </div>
        </div>

        {/* <!-- Mobile menu, show/hide based on menu state. --> */}
        <div className="md:hidden" id="mobile-menu">
          <div className="px-2 pb-3 sm:px-3 items-baseline">
            {/* <!-- Current: "bg-gray-900 text-white", Default: "text-gray-300 hover:bg-gray-700 hover:text-white" --> */}
            <div className="px-4 flex">
              <NavLink to={`/dashboard/${user_id}`}>
                <button
                  className="mr-4 bg-gray-900 text-white rounded-md px-3 py-2 transition duration-500 ease select-none hover:bg-teal-600 focus:outline-none focus:shadow-outline text-sm font-medium"
                  id="Home"
                >
                  Home
                </button>
              </NavLink>
              <NavLink to={`/newCenter/${user_id}`}>
                <button
                  className="mr-4 bg-gray-700 text-white rounded-md px-3 py-2 transition duration-500 ease select-none hover:bg-teal-600 focus:outline-none focus:shadow-outline text-sm font-medium"
                  id="AddButton"
                >
                  Add Center
                </button>
              </NavLink>
              <NavLink to={`/newScenario`}>
                <button
                  className="mr-4 bg-gray-700 text-white rounded-md px-3 py-2 transition duration-500 ease select-none hover:bg-teal-600 focus:outline-none focus:shadow-outline text-sm font-medium"
                  id="AddButton"
                >
                  New Scenario
                </button>
              </NavLink>
              <div className="items-right md:ml-6 ml-12">
                {userContext.authenticated ? (
                  <span className="text-white px-3 text-sm font-medium">
                    User: {userContext.user.username}
                  </span>
                ) : null}
                <LogoutButton />
              </div>
            </div>
          </div>
        </div>
      </nav>
    </div>
  );
}
