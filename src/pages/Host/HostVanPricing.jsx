import { useOutletContext } from "react-router-dom";
export default function HostVPricing() {
	const { currentVan } = useOutletContext();
	return <h3 className="host-van-price">${currentVan.price}</h3>;
}
