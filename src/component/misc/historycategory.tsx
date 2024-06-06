import React, { useState, useEffect } from "react";

function HistoryCategory({ category }: any) {
	function setCategory(category: any) {
		switch (category) {
			case "send": {
				return `Send`;
			}
			case "receive": {
				return `Receive`;
			}
			case "airdrop": {
				return `Airdrop`;
			}
			case "mint": {
				return `Mint`;
			}
			case "deposit": {
				return `Deposit`;
			}
			case "withdraw": {
				return `Withdraw`;
			}
			case "burn": {
				return `Burn`;
			}
			case "nft receive": {
				return `Received NFT`;
			}
			case "nft send": {
				return `Sent NFT`;
			}
			case "token send": {
				return `Sent Token`;
			}
			case "token receive": {
				return `Received Token`;
			}
			case "nft purchase": {
				return `Purchased NFT`;
			}
			case "nft sale": {
				return `Sold NFT`;
			}
			case "token swap": {
				return `Token Swap`;
			}
			case "approve": {
				return `Approval`;
			}
			case "borrow": {
				return `Borrowed`;
			}
			case "contract interaction": {
				return `Contract Interaction`;
			}
			default:
				return "";
		}
	}

	function setFontColor(category: any) {
		switch (category) {
			case "send": {
				return "#f6d55c";
			}
			case "receive": {
				return "#3caea3";
			}
			case "airdrop": {
				return "#20639b";
			}
			case "mint": {
				return "#f3f3f3";
			}
			case "deposit": {
				return "#ed553b";
			}
			case "withdraw": {
				return "#173f5f";
			}
			case "burn": {
				return "#721c24";
			}
			case "nft receive": {
				return "#4b5320";
			}
			case "nft send": {
				return "#654321";
			}
			case "token send": {
				return "#eac435";
			}
			case "token receive": {
				return "#03a678";
			}
			case "nft purchase": {
				return "#0d3b66";
			}
			case "nft sale": {
				return "#fb3640";
			}
			case "token swap": {
				return "#6788ee";
			}
			case "approve": {
				return "#595959";
			}
			case "borrow": {
				return "#aa1155";
			}
			case "contract interaction": {
				return "#2ec4b6";
			}
			default:
				return "#ffffff";
		}
	}
	return (
		<div style={{ color: setFontColor(category) }}>{setCategory(category)}</div>
	);
}

export default HistoryCategory;
