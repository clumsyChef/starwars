import { Link, useNavigate } from "react-router-dom";
import { useContext } from "react";
import { UserContext } from "../context/UserContext";
import { useCookies } from "react-cookie";

import { useLocation, useParams } from "react-router-dom";

const Nav = () => {
	const [cookies, setCookie, removeCookie] = useCookies(["username"]);
	const userContext = useContext(UserContext);
	const isAuthenticated = userContext.userData.authenticated;
	const location = useLocation();
	const navigate = useNavigate();
	const removeAuth = () => {
		removeCookie("username");
		const newContext = {
			authenticated: false,
			isLuke: false,
		};

		userContext.updateAuth(newContext);

		return navigate("/");
	};

	if (isAuthenticated) {
		return (
			<div className="nav-bar bg-slate-200 flex justify-around p-2">
				{location.pathname === "/" ? (
					<Link to="/planets" className="text-2xl flex items-center font-semibold hover:text-teal-700 transition-all duration-300">
						Planets
					</Link>
				) : (
					<Link to="/" className="text-2xl flex items-center font-semibold hover:text-teal-700 transition-all duration-300">
						Login
					</Link>
				)}

				<div className="flex">
					<p className="text-2xl font-semibold flex items-center">Hello There... {cookies.username}</p>
					<button
						onClick={removeAuth}
						className="transition-all duration-300 text-2xl font-semibold text-teal-700 border-2 border-teal-700 rounded-md p-2 hover:bg-teal-700 hover:text-slate-200 ml-10"
					>
						Logout
					</button>
				</div>
			</div>
		);
	}
};

export default Nav;
