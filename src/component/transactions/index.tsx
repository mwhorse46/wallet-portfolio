import HeaderOne from "@/layouts/headers/HeaderOne";
import Breadcrumb from "../common/Breadcrumb";
import FooterOne from "@/layouts/footers/FooterOne";
import TransactionsEl from "./transactions";
import Sidebar from "../sidebar/index";
const Transactions = () => {
	return (
		<main>
			<HeaderOne />
			<Sidebar />
			<TransactionsEl />
		</main>
	);
};

export default Transactions;
