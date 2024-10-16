import { useParams, Link, NavLink, Outlet, useOutletContext } from "react-router-dom";
import { useEffect, useState } from "react";
export default function HostVanDetail() {
	const { id } = useParams();
	const [currentVan, setCurrentVan] = useState(null);

	const activeStyles = {
		fontWeight: "bold",
		textDecoration: "underline",
		color: "#161616",
	};

	useEffect(() => {
		async function getData(route) {
			const res = await fetch(`/api/host/vans/${route}`);
			const data = await res.json();
			setCurrentVan(data.vans);
		}
		getData(id);
	}, [id]);

	if (!currentVan) {
		return <h1>Loading...</h1>;
	}

	return (
		<section>
			<Link to=".." relative="path" className="back-button">
				&larr; <span>Back to all vans</span>
			</Link>

			<div className="host-van-detail-layout-container">
				<div className="host-van-detail">
					<img src={currentVan.imageUrl} />
					<div className="host-van-detail-info-text">
						<i className={`van-type van-type-${currentVan.type}`}>{currentVan.type}</i>
						<h3>{currentVan.name}</h3>
						<h4>${currentVan.price}/day</h4>
					</div>
				</div>
				<nav className="host-van-detail-nav">
					<NavLink to="." end style={({ isActive }) => (isActive ? activeStyles : null)}>
						Details
					</NavLink>
					<NavLink
						to="pricing"
						style={({ isActive }) => (isActive ? activeStyles : null)}>
						Pricing
					</NavLink>
					<NavLink to="photos" style={({ isActive }) => (isActive ? activeStyles : null)}>
						Photos
					</NavLink>
				</nav>
				<Outlet context={{ currentVan }} />
			</div>
		</section>
	);
}
