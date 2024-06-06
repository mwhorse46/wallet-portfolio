import HeaderOne from "@/layouts/headers/HeaderOne";
import Breadcrumb from "../common/Breadcrumb";
import FooterOne from "@/layouts/footers/FooterOne";
import DefiEl from "./defi";
import Sidebar from "../sidebar/index";
const Defi = () => {
	return (
		<main>
			<HeaderOne />
			<Sidebar />
			<DefiEl />
		</main>
	);
};

export default Defi;
