import React, { useState } from "react";
import { Button } from "reactstrap";
interface WalletFormProps {
	onSubmit: (address: string) => void; // Replace '() => void' with the actual type signature for your onSubmit handler
	loading: boolean;
	placeholder: string;
	buttonText: string;
}

const WalletForm = ({
	onSubmit,
	loading,
	placeholder,
	buttonText,
}: WalletFormProps) => {
	const [address, setAddress] = useState("");
	const [error, setError] = useState<string | null>(null);

	const isValidEthereumAddress = (address: string) =>
		/^(0x[a-fA-F0-9]{40})|([a-zA-Z0-9-]+\.eth)$/.test(address);

	const handleSubmit = (e: any) => {
		e.preventDefault();
		if (isValidEthereumAddress(address)) {
			setError(null);
			onSubmit(address);
		} else {
			setError("Please enter a valid Ethereum address.");
		}
	};

	return (
		<div className="container wallet-form">
			<form onSubmit={handleSubmit}>
				<div className="row">
					<div
						className="col-md-12 col-xs-12 d-flex"
						style={{ gap: "15px", justifyContent: "center" }}
					>
						<input
							type="text"
							placeholder={placeholder}
							value={address}
							onChange={(e) => setAddress(e.target.value)}
						/>
						<Button color="primary">
							{loading ? "Loading..." : buttonText}
						</Button>
					</div>
				</div>
			</form>
			{error && <p className="error-msg">{error}</p>}
		</div>
	);
};

export default WalletForm;
