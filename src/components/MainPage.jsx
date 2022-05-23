import { useContext } from "react";
import { UserContext } from "../context/UserContext";
import Nav from "./Nav";

const MainPage = () => {
	const userContext = useContext(UserContext);

	return (
		<>
			<Nav />
		</>
	);
};

export default MainPage;
