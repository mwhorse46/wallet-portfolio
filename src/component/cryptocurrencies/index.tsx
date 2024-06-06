import FooterThree from "@/layouts/footers/FooterThree";
import Breadcrumb from "../common/Breadcrumb";
import DocumentArea from "../common/DocumentArea";
import CryptocurrenciesArea from "./cryptocurrencies";
import HeaderThree from "@/layouts/headers/HeaderThree";

const Cryptocurrencies = () => {
	return (
		<main>
			<HeaderThree />
			<Breadcrumb title="Cryptocurrencies" />
			<CryptocurrenciesArea />
			<FooterThree />
		</main>
	);
};

export default Cryptocurrencies;
