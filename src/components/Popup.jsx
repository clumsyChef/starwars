const Popup = (props) => {
	const { data } = props;

	const closePopup = () => {
		//
	};

	if (props.data) {
		return (
			<div className="popup fixed top-0 left-0 h-screen w-screen flex justify-center items-center bg-gray-500/75" onClick={closePopup}>
				<div className="content bg-white border-2 rounded-md w-2/4h-fit p-20 border-2 border-teal-700 bg-gradient-to-r from-teal-500 to-teal-200">
					<p className="text-center text-3xl font-bold underline mb-10">{data.name}</p>
					<ul className="text-xl font-semibold">
						<li>Population: {data.population}</li>
						<li>Terrain: {data.terrain}</li>
						<li>Surface Water: {data.surface_water}</li>
						<li>Climate: {data.climate}</li>
					</ul>
				</div>
			</div>
		);
	}
};

export default Popup;
