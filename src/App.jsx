import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import Home from "./pages/Home";
import About from "./pages/About";
import NotFound from "./pages/NotFound";
import Vans from "./pages/Vans/Vans";
import VanDetail from "./pages/Vans/VanDetail";
import Dashboard from "./pages/Host/Dashboard";
import HostVanInfo from "./pages/Host/HostVanInfo";
import Income from "./pages/Host/Income";
import HostVans from "./pages/Host/HostVans";
import Reviews from "./pages/Host/Reviews";
import HostVanDetail from "./pages/Host/HostVanDetail";
import HostVanPhotos from "./pages/Host/HostVanPhotos";
import HostVanPricing from "./pages/Host/HostVanPricing";
import Layout from "./components/Layout";
import HostLayout from "./components/HostLayout";

export default function App() {
	return (
		<BrowserRouter>
			<Routes>
				<Route path="/" element={<Layout />}>
					<Route index element={<Home />} />
					<Route path="about" element={<About />} />
					<Route path="vans" element={<Vans />} />
					<Route path="vans/:id" element={<VanDetail />} />

					<Route path="host" element={<HostLayout />}>
						<Route index element={<Dashboard />} />
						<Route path="income" element={<Income />} />
						<Route path="reviews" element={<Reviews />} />
						<Route path="vans" element={<HostVans />} />
						<Route path="vans/:id" element={<HostVanDetail />}>
							<Route index element={<HostVanInfo />} />
							<Route path="pricing" element={<HostVanPricing />} />
							<Route path="photos" element={<HostVanPhotos />} />
						</Route>
					</Route>
					<Route path="*" element={<NotFound />} />
				</Route>
			</Routes>
		</BrowserRouter>
	);
}
