import FooterThree from "@/layouts/footers/FooterThree";
import Breadcrumb from "../common/Breadcrumb";
import DocumentArea from "../common/DocumentArea";
import BuyCryptoArea from "./buy-crypto";
import HeaderThree from "@/layouts/headers/HeaderThree";

const BuyCrypto = () => {
	return (
		<main>
			<HeaderThree />
			<Breadcrumb title="BuyCrypto" />
			<BuyCryptoArea />
			<FooterThree />
		</main>
	);
};

export default BuyCrypto;
