const Loading = () => {
	return (
		<div className="overlay relative h-screen w-screen top-0 left-0 flex justify-center items-center bg-slate-200">
			<p className="loading-text text-6xl font-black text-teal-700 border-2 p-4 border-teal-700 rounded-md">Loading...</p>
		</div>
	);
};

export default Loading;
