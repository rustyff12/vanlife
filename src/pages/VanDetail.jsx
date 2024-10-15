import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";

export default function VanDetail() {
	const params = useParams();
	const [van, setVan] = useState(null);
	useEffect(() => {
		async function getData(route) {
			const res = await fetch(`/api/vans/${route}`);
			const data = await res.json();
			setVan(data.vans);
		}
		getData(params.id);
	}, [params.id]);

	return (
		<>
			<div className="van-detail-container">
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
