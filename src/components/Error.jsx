import { useRouteError } from "react-router-dom";
export default function Error() {
	const err = useRouteError();

	return (
		<>
			<h1>{err.message || "Something went wrong"}</h1>

			<pre>
				{err.status} - {err.statusText}
			</pre>
		</>
	);
}
