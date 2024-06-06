import React, { useState } from "react";
interface ChainDropDownType {
	chains: any;
	onChange: (value: any) => void;
	selectedChain: string;
}
const ChainDropDown = ({
	chains,
	onChange,
	selectedChain,
}: ChainDropDownType) => {
	const handleDropdownChange = (e: any) => {
		const value = e.target.value;
		// Invoke the passed-in onChange callback.
		if (onChange) {
			onChange(value);
		}
	};

	return (
		<div>
			<select
				value={selectedChain}
				onChange={handleDropdownChange}
				style={{
					backgroundColor: "#0f101e",
					cursor: "pointer",
					fontWeight: "600",
					maxWidth: "200px",
					borderRadius: "10px",
					border: "none",
					padding: "10px 15px",
					color: "#fff",
					fontSize: "18px",
				}}
			>
				{chains &&
					chains.length > 0 &&
					chains.map((chain: any) => (
						<option key={chain.chain} value={chain.chain}>
							{chain.label}
						</option>
					))}
			</select>
		</div>
	);
};

export default ChainDropDown;
