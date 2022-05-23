import { useContext, useEffect, useState, useRef } from "react";
import { UserContext } from "../context/UserContext";
import { useNavigate } from "react-router-dom";
import CreatePlanets from "./CreatePlanets";
import axios from "axios";
import Loading from "./Loading";

const Planets = () => {
	const userContext = useContext(UserContext);
	const isAuthenticated = userContext.userData.authenticated;
	const planets = useRef([]);
	// const [allPlanets, setAllPlanets] = useState(false);
	const [sortedPopulation, setSortedPopulation] = useState([]);
	const navigate = useNavigate();
	const allPlanets = false;

	useEffect(() => {
		if (!isAuthenticated) {
			return navigate("/");
		} else {
			fetchPlanets();
		}
	}, []);

	const fetchPlanets = async (url = null) => {
		const fetchUrl = `${url || "https://swapi.dev/api/planets/"}`;
		const data = await axios
			.get(fetchUrl)
			.then((response) => {
				return response.data;
			})
			.catch((error) => {
				console.log(error);
			});

		const { next, results } = data;
		// setPlanets((currPlanets) => [...currPlanets, ...results]);
		planets.current = [...planets.current, ...results];

		if (next) {
			fetchPlanets(next);
		} else {
			const sorted = [
				...planets.current.filter((elem) => elem.population === "unknown"),
				...planets.current.filter((elem) => elem.population !== "unknown").sort((a, b) => parseInt(a.population) - parseInt(b.population)),
			];

			setSortedPopulation(sorted);
		}
	};
	if (sortedPopulation.length > 0) {
		return <CreatePlanets everyPlanet={sortedPopulation} />;
	}

	return <Loading />;
};

export default Planets;
