import HeaderOne from "@/layouts/headers/HeaderOne";
import Breadcrumb from "../common/Breadcrumb";
import FooterOne from "@/layouts/footers/FooterOne";
import SwapEl from "./swap";
import Sidebar from "../sidebar/index";
const Swap = () => {
	return (
		<main>
			<HeaderOne />
			<Sidebar />
			<SwapEl />
		</main>
	);
};

export default Swap;
