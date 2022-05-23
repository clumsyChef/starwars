import Popup from "./Popup";
import { useEffect, useState, useContext } from "react";
import { UserContext } from "../context/UserContext";

const CreatePlanets = (props) => {
	const { everyPlanet } = props;
	const [popup, setPopup] = useState(null);
	const [planets, setPlanets] = useState(everyPlanet);
	const { userData } = useContext(UserContext);
	const [searches, setSearches] = useState([]);

	useEffect(() => {
		const popup = document.querySelector("div.popup");
		if (!!popup) {
			popup.addEventListener("click", (e) => {
				setPopup(null);
			});

			popup.querySelector("div.content").addEventListener("click", (e) => {
				e.stopPropagation();
			});
		}
	}, [popup]);

	const searchPlanet = () => {
		const time = new Date().getTime();
		if (searches.length === 15 && !userData.isLuke) {
			const remainingSearches = searches.filter((elem) => (time - elem.createdAt) / 1000 < 60);
			if (remainingSearches.length === 15) {
				alert("Can Only do 15 seaches per minute");
				return false;
			}
			setSearches(remainingSearches);
		}
		const term = document.querySelector("#search-planets").value.toLowerCase();
		const searchPlanets = everyPlanet.filter((elem) => elem.name.toLowerCase().includes(term));
		setPlanets(searchPlanets);
		const thisSearch = {
			payload: term,
			createdAt: time,
		};

		setSearches((search) => [...search, thisSearch]);
	};

	const divs = planets.map((elem, index) => {
		const thisStyle = {
			height: elem.population === "unknown" ? "150px" : `${index * 5 + 1 + 100}px`,
			width: elem.population === "unknown" ? "150px" : `${index * 5 + 1 + 100}px`,
		};

		if (elem.population === "unknown") {
			thisStyle["borderRadius"] = "50%";
		}

		const popup = (e) => {
			const thisIndex = [...document.querySelectorAll("div.single-planet")].indexOf(e.target);
			const thisPlanet = planets[thisIndex];
			setPopup(thisPlanet);
		};

		return (
			<div className="planets-wrapper" key={index}>
				<div
					className="single-planet border-2 border-slate-700 rounded-md single-planet m-2 flex justify-center items-center font-semibold cursor-pointer hover:shadow-2xl hover:scale-110 hover:border-teal-700 hover:text-teal-700 transition-all duration-300 my-5 hover:bg-slate-100"
					style={thisStyle}
					onClick={(e) => popup(e)}
				>
					{elem.name}
				</div>
			</div>
		);
	});

	return (
		<>
			<div className="search-box bg-slate-200 border-t-2 border-slate-700 flex justify-center pt-10">
				<input
					id="search-planets"
					type="text"
					className="w-1/2 font-semibold text-xl py-3 px-1.5 border-2 border-teal-700 my-1.5 focus-visible:outline-none focus:border-teal-700 rounded-md border-2 mx-2"
					placeholder="Search By Name Of The Planet"
				/>
				<button
					type="button"
					className="text-xl font-semibold text-teal-700 border-2 border-teal-700 py-2 px-10 rounded-md transition-all duration-300 hover:bg-teal-700 hover:text-white"
					onClick={searchPlanet}
				>
					Search
				</button>
			</div>
			<div className="all-planets flex flex-wrap bg-slate-200 p-10">{divs}</div>
			<Popup data={popup} />
		</>
	);
};

export default CreatePlanets;
