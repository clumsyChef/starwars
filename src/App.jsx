import AppRoutes from "./components/AppRoutes";
import UserState from "./context/UserContext";
import MainPage from "./components/MainPage";

const App = () => {
	return (
		<>
			<UserState>
				<MainPage />
				<AppRoutes />
			</UserState>
		</>
	);
};

export default App;
