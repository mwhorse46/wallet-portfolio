import FooterThree from "@/layouts/footers/FooterThree";
import Breadcrumb from "../common/Breadcrumb";
import DocumentArea from "../common/DocumentArea";
import NewsArea from "./news";
import HeaderThree from "@/layouts/headers/HeaderThree";

const News = () => {
	return (
		<main>
			<HeaderThree />
			<Breadcrumb title="News" />
			<NewsArea />
			<FooterThree />
		</main>
	);
};

export default News;
