import HeaderOne from "@/layouts/headers/HeaderOne";
import Breadcrumb from "../common/Breadcrumb";
import FooterOne from "@/layouts/footers/FooterOne";
import WalletViewer from "./walletviewer";
import Sidebar from "../sidebar/index";
const Portfolio = () => {
	return (
		<main>
			<HeaderOne />
			<Sidebar />
			<WalletViewer />
			<FooterOne />
		</main>
	);
};

export default Portfolio;
