import MayTheForce from "../assets/maytheforce.png";

const Loading = () => {
	console.log(MayTheForce);
	return (
		<div className="overlay relative h-screen w-screen top-0 left-0 flex justify-center items-center bg-slate-200 flex-wrap">
			<img className="h-1/2" src={MayTheForce} alt="" />
			<p className="loading-text text-6xl font-black text-teal-700 border-2 p-4 mt-10">Loading...</p>
		</div>
	);
};

export default Loading;
