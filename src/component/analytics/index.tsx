import HeaderOne from "@/layouts/headers/HeaderOne";
import Breadcrumb from "../common/Breadcrumb";
import FooterOne from "@/layouts/footers/FooterOne";
import AnalyticsEl from "./analytics";
import Sidebar from "../sidebar/index";
const Swap = () => {
	return (
		<main>
			<HeaderOne />
			<Sidebar />
			<AnalyticsEl />
		</main>
	);
};

export default Swap;
