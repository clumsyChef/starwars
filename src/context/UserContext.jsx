import { createContext, useState } from "react";
import { useCookies } from "react-cookie";

export const UserContext = createContext();

const UserState = (props) => {
	const [cookies, setCookie, removeCookie] = useCookies(["username"]);

	const state = {
		authenticated: cookies.username ? true : false,
		isLuke: cookies.username === "Luke Skywalker" ? true : false,
	};

	const [userData, setUserData] = useState(state);

	const updateAuth = (newData) => {
		let finalData = { ...state, ...newData };
		setUserData(finalData);
	};

	return <UserContext.Provider value={{ userData, updateAuth }}>{props.children}</UserContext.Provider>;
};

export default UserState;
