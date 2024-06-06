"use client";
import React, { useState, useContext, useEffect } from "react";
import { AppContext } from "@/hooks/AppContext";
import * as utilities from "../../app/api/utilities";
import Loader from "../misc/loader";
import ChainDropDown from "../misc/chaindropdown";
import TokenLogo from "../portfolio/tokenlogo";
import TransactionImage from "../misc/transactionimage";
import HistoryCategory from "../misc/historycategory";
import HistoryIconv2 from "../misc/historyicon";

import Link from "next/link";
import moment from "moment";

import "../../styles/transactions.scss";

const TransactionsEl = () => {
	const { globalData, setGlobalData } = useContext(AppContext);
	const [loading, setLoading] = useState(false);
	const [error, setError] = useState("");

	const fetchTransactions = (chain: string) => {
		setLoading(true);
		setError("");
		setGlobalData((prevData: any) => ({
			...prevData,
			transactions: null,
			transactionsLoaded: false,
		}));

		fetch(
			`/api/wallet-transactions?chain=${chain}&wallet=${globalData.walletAddress}`
		)
			.then((response) => {
				if (!response.ok) throw new Error("Failed to fetch data");
				return response.json();
			})
			.then((fetchedData) => {
				console.log(" transactions data ===>", fetchedData);
				setGlobalData((prevData: any) => ({
					...prevData,
					transactions: fetchedData.transactions.result,
					transactionsLoaded: true,
				}));
				setLoading(false);
				if (fetchedData.unsupported) {
					setError("Unsupported wallet.");
				}
				console.log(" transactions data ===>", globalData);
			})
			.catch((error) => {
				setError(error.message);
				setLoading(false);
			});
	};

	const handleDropdownChange = (selectedValue: any) => {
		setGlobalData((prevData: any) => ({
			...prevData,
			transactionsLoaded: false,
			selectedChain: selectedValue,
		}));
		fetchTransactions(selectedValue);
	};

	useEffect(() => {
		console.log("Context value changed:", globalData);
	}, [globalData]);

	useEffect(() => {
		localStorage.setItem("selectedChain", globalData.selectedChain);
	}, [globalData.selectedChain]);

	return (
		<div className="container transactions-area">
			<div className="page-header">
				<ChainDropDown
					onChange={handleDropdownChange}
					chains={globalData.chains}
					selectedChain={globalData.selectedChain}
				/>
			</div>
			{loading && <Loader />}
			{error && <div className="text-red-500">{error}</div>}
			{globalData.transactions && (
				<>
					<div className="transaction-item-groupe">
						<div className="groupe-header">
							<div>Type</div>
							<div>Summry</div>
							<div>Date</div>
							<div>Token</div>
						</div>
						{globalData.transactions.map((transaction: any, index: number) => (
							<div className="groupe-item" key={index}>
								<div
									style={{
										textTransform: "capitalize",
										display: "flex",
										gap: "15px",
										alignItems: "center",
									}}
								>
									<HistoryIconv2 category={transaction.category} />
									<HistoryCategory category={transaction.category} />
								</div>
								<div>{transaction.summary}</div>
								<div>
									{moment(transaction.block_timestamp).format(
										"HH:mm A DD MM YYYY"
									)}
								</div>
								<div
									style={{ display: "flex", gap: "10px", alignItems: "center" }}
								>
									{transaction.erc20_transfers.length > 0 && (
										<div className="token-details send" key={index}>
											<div>
												<TokenLogo
													tokenImage={transaction.erc20_transfers[0].token_logo}
													tokenName={transaction.erc20_transfers[0].token_name}
													tokenSymbol={
														transaction.erc20_transfers[0].token_symbol
													}
												/>
											</div>
											<div>
												{Number(
													transaction.erc20_transfers[0].value_formatted
												).toFixed(2)}{" "}
												{transaction.erc20_transfers[0].token_symbol}
											</div>
										</div>
									)}

									{transaction.nft_transfers.length > 0 && (
										<div className="token-details send">
											<div>
												<TransactionImage
													transaction={transaction}
													chain={transaction.chain}
												/>
											</div>
											<div>
												{
													transaction.nft_transfers.filter(
														(item: any) => item.direction === "send"
													).length
												}{" "}
												NFTs
											</div>
										</div>
									)}

									{transaction.native_transfers.length > 0 && (
										<div className="token-details send" key={index}>
											<div>
												<img
													src={`${transaction.native_transfers[0].token_logo}`}
												/>
											</div>
											<div>
												{Number(
													transaction.native_transfers[0].value_formatted
												).toFixed(2)}{" "}
												{transaction.native_transfers[0].token_symbol}
											</div>
										</div>
									)}
								</div>
							</div>
						))}
					</div>
				</>
			)}
		</div>
	);
};

export default TransactionsEl;
