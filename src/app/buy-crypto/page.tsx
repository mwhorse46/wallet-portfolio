import BuyCrypto from "@/component/buy-crypto";
import Wrapper from "@/layouts/Wrapper";

export const metadata = {
	title: "Buy Crypto",
};

const index = () => {
	return (
		<Wrapper>
			<BuyCrypto />
		</Wrapper>
	);
};

export default index;
