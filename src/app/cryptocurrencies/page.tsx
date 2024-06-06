import Cryptocurrencies from "@/component/cryptocurrencies";
import Wrapper from "@/layouts/Wrapper";

export const metadata = {
	title: "Cryptocurrencies",
};

const index = () => {
	return (
		<Wrapper>
			<Cryptocurrencies />
		</Wrapper>
	);
};

export default index;
