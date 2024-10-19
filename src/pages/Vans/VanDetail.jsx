import { useParams, Link, useLocation } from "react-router-dom";
import { useEffect, useState } from "react";

export default function VanDetail() {
	const params = useParams();
	const location = useLocation();
	const [van, setVan] = useState(null);
	useEffect(() => {
		async function getData(route) {
			const res = await fetch(`/api/vans/${route}`);
			const data = await res.json();
			setVan(data.vans);
		}
		getData(params.id);
	}, [params.id]);

	// const search = location.state && location.state.search || ""
	const search = location.state?.search || "";
	const type = location.state?.type || "all";
	return (
		<>
			<div className="van-detail-container">
				<Link to={`..${search}`} relative="path" className="back-button">
					&larr; <span>Back to {type} vans</span>
				</Link>
				{van ? (
					<div className="van-detail">
						<img src={van.imageUrl} alt={`Picture of a ${van.name} van`} />
						<i className={`van-type ${van.type} selected`}>{van.type}</i>
						<h2>{van.name}</h2>
						<p className="van-price">
							<span>${van.price}</span>/day
						</p>
						<p>{van.description}</p>

						<button className="link-button">Rent this van</button>
					</div>
				) : (
					<h2>Loading...</h2>
				)}
			</div>
		</>
	);
}
