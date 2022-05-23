import { UserContext } from "../context/UserContext";
import { useContext } from "react";
import axios from "axios";
import { useCookies } from "react-cookie";
import { useNavigate } from "react-router-dom";

const Login = () => {
	const [cookies, setCookie, removeCookie] = useCookies(["username"]);
	const userContext = useContext(UserContext);
	const authenticated = userContext.userData.authenticated;
	const navigate = useNavigate();

	const loginUser = async (e) => {
		document.querySelector("button#login-button").setAttribute("disabled", "");
		const [user, pass] = [document.querySelector("input[name='username']").value, document.querySelector("input[name='password']").value];
		const checkUser = await checkAuth(user, pass);
		document.querySelector("button#login-button").removeAttribute("disabled", "");
		if (checkUser === "no_user") {
			alert("No Such User Exists");
		} else if (checkUser === "wrong_pass") {
			alert("Wrong Password");
		} else {
			const newContext = { authenticated: true, isLuke: user === "Luke Skywalker" };
			userContext.updateAuth(newContext);
			setCookie("username", user, { path: "/" });
			return navigate("/planets");
		}
	};

	const checkAuth = async (user, pass, url = null) => {
		const cycle = await axios
			.get(`${url || "https://swapi.dev/api/people/"}`)
			.then((response) => {
				return response.data;
			})
			.catch((error) => {
				console.log(error);
			});

		if (cycle) {
			const userCheck = cycle.results.find((elem) => elem.name === user);
			if (userCheck && userCheck.birth_year === pass) {
				return userCheck.birth_year === pass ? userCheck : "wrong_pass";
			} else {
				return cycle.next ? await checkAuth(user, pass, cycle.next) : "no_user";
			}
		} else {
			return await checkAuth(user, pass);
		}
	};

	if (authenticated) {
		return (
			<div className="overlay relative h-screen w-screen top-0 left-0 flex justify-center items-center bg-slate-200">
				<p className="text-4xl font-black text-teal-700 border-4 p-4 border-teal-700 rounded-md">
					You are already logged in as {cookies.username}.<br />
					<br />
					<span>You can change user though.</span>
				</p>
			</div>
		);
	}

	return (
		<div className="bg-gradient-to-r from-teal-500 to-teal-200">
			<div className="h-screen w-screen flex justify-center items-center">
				<div className="form-wrapper p-3 border-2 border-teal-500 border rounded-md bg-slate-200">
					<p className="text-4xl font-black text-center mb-5 text-teal-700">Login Here</p>
					<form action="" method="POST" className="">
						<input
							placeholder="Username"
							type="text"
							name="username"
							className="w-full font-semibold text-xl py-1 px-1.5 border-2 my-1.5 focus-visible:outline-none focus:border-teal-500 rounded-md"
						/>
						<input
							placeholder="Password"
							type="password"
							name="password"
							className="w-full font-semibold text-xl py-1 px-1.5 border-2 my-1.5 focus-visible:outline-none focus:border-teal-500 rounded-md"
						/>
						<button
							type="button"
							onClick={(e) => loginUser(e)}
							id="login-button"
							className="font-semibold text-xl py-2 px-14 my-1.5 border-2 border-teal-500 text-teal-500 rounded-md block mx-auto hover:bg-teal-500 hover:text-slate-100 hover:border-slate-100 transition-all duration-300"
						>
							Login
						</button>
					</form>
				</div>
			</div>
		</div>
	);
};

export default Login;
