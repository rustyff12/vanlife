import { useState } from "react";
import { useLoaderData, useNavigate, redirect } from "react-router-dom";
import { loginUser } from "../api";

export function loader({ request }) {
	return new URL(request.url).searchParams.get("message");
}

/**
 * Challenge: Start implementing actions to handle our
 * form data
 *
 *
 * 2. Add a `method` prop to the <Form>.
 * 3. Create an action function in this file. It should just log
 *    "Action function" to the console and `return null` for now.
 * 4. Register the action function on the <Route>
 */

export default function OldLogin() {
	const [loginFormData, setLoginFromData] = useState({
		email: "",
		password: "",
	});

	const [status, setStatus] = useState("idle");
	const [error, setError] = useState(null);
	const message = useLoaderData();
	const navigate = useNavigate();

	function handleSubmit(e) {
		e.preventDefault();
		setStatus("submitting");
		setError(null);
		loginUser(loginFormData)
			.then((data) => {
				navigate("/host", { replace: true });
			})
			.catch((err) => setError(err))
			.finally(() => setStatus("idle"));
	}

	function handleChange(e) {
		const { name, value } = e.target;
		setLoginFromData((prev) => ({
			...prev,
			[name]: value,
		}));
	}

	return (
		<div className="login-container">
			<h1>Sign in to your account</h1>
			{message && <h3 className="red">{message}</h3>}
			{error && <h3 className="red">{error.message}</h3>}
			<Form onSubmit={handleSubmit} className="login-form">
				<input
					name="email"
					onChange={handleChange}
					type="email"
					placeholder="Email address"
					value={loginFormData.email}
				/>
				<input
					name="password"
					onChange={handleChange}
					type="password"
					placeholder="Password"
					value={loginFormData.password}
				/>
				<button disabled={status === "submitting"}>
					{status === "submitting" ? "Logging in..." : "Log in"}
				</button>
			</Form>
		</div>
	);
}

/* 

export async function action({ request }) {
	const formData = await request.formData();
	const email = await formData.get("email");
	const password = await formData.get("password");
	const data = await loginUser({ email, password });
	localStorage.setItem("loggedin", true);

	return redirect("/host");
}
*/
