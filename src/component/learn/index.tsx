import FooterThree from "@/layouts/footers/FooterThree";
import Breadcrumb from "../common/Breadcrumb";
import DocumentArea from "../common/DocumentArea";
import LearnArea from "./learn";
import HeaderThree from "@/layouts/headers/HeaderThree";

const Learn = () => {
	return (
		<main>
			<HeaderThree />
			<Breadcrumb title="Learn" />
			<LearnArea />
			<FooterThree />
		</main>
	);
};

export default Learn;
