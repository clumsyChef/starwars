import { Routes, Route, Link } from "react-router-dom";
import Login from "./Login";
import Planets from "./Planets";

const AppRoutes = () => {
	return (
		<Routes>
			<Route path="/" element={<Login />} />
			<Route path="/planets" element={<Planets />} />
		</Routes>
	);
};

export default AppRoutes;
