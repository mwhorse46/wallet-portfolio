import News from "@/component/news";
import Wrapper from "@/layouts/Wrapper";

export const metadata = {
	title: "News",
};

const index = () => {
	return (
		<Wrapper>
			<News />
		</Wrapper>
	);
};

export default index;
