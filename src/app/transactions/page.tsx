import Transactions from "@/component/transactions";
import Wrapper from "@/layouts/Wrapper";

export const metadata = {
	title: "Transactions",
};

const index = () => {
	return (
		<Wrapper>
			<Transactions />
		</Wrapper>
	);
};

export default index;
