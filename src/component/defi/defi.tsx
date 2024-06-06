"use client";
import React, { useState, useContext, useEffect } from "react";
import { AppContext } from "@/hooks/AppContext";
import Loader from "../misc/loader";
import ChainDropDown from "../misc/chaindropdown";
import TokenLogo from "../portfolio/tokenlogo";
import ExternalLinkIcon from "../misc/externallinkicon";
import * as utilities from "../../app/api/utilities";
import Link from "next/link";
import "../../styles/defi.scss";

const DefiEl = () => {
	const { globalData, setGlobalData } = useContext(AppContext);
	const [loading, setLoading] = useState(false);
	const [error, setError] = useState("");

	const handleProtocolClick = (protocol: any) => {
		setGlobalData((prevData: any) => ({
			...prevData,
			defiPosition: {
				protocol,
			},
		}));
	};

	const fetchDeFi = (chain: any) => {
		setLoading(true);
		setError("");
		setGlobalData((prevData: any) => ({
			...prevData,
			defi: null,
			defiLoaded: false,
		}));
		fetch(`/api/wallet-defi?chain=${chain}&wallet=${globalData.walletAddress}`)
			.then((response) => {
				if (!response.ok) throw new Error("Failed to fetch data");
				return response.json();
			})
			.then((fetchedData) => {
				console.log(" defi data ===>", fetchedData);
				setGlobalData((prevData: any) => ({
					...prevData,
					defi: fetchedData,
					defiLoaded: true,
				}));
				setLoading(false);
				if (fetchedData.unsupported) {
					setError("Unsupported wallet.");
				}
			})
			.catch((error) => {
				setError(error.message);
				setLoading(false);
			});
	};

	const handleDropdownChange = (selectedValue: any) => {
		setGlobalData((prevData: any) => ({
			...prevData,
			nftsLoaded: false,
			tokensLoaded: false,
			defiLoaded: false,
			selectedChain: selectedValue,
		}));
		fetchDeFi(selectedValue);
	};

	useEffect(() => {
		console.log("Context value changed:", globalData);
	}, [globalData]);

	useEffect(() => {
		localStorage.setItem("selectedChain", globalData.selectedChain);
	}, [globalData.selectedChain]);

	return (
		<div className="container defi-area" id="defi-page">
			<div className="page-header">
				<ChainDropDown
					onChange={handleDropdownChange}
					chains={globalData.chains}
					selectedChain={globalData.selectedChain}
				/>
			</div>
			{loading && <Loader />}
			{error && <div className="text-red-500">{error}</div>}
			{/* Assuming globalDataCache.tokensData is an array */}

			{globalData.defi && (
				<>
					<h3 className="sub-header">Wallet Summary</h3>
					<div className="summary-section">
						<div className="row">
							<div className="col-lg-3">
								<div className="wallet-card">
									<div className="heading">Total Value</div>
									<div className="big-value">
										$
										{globalData.defi.protocols.total_usd_value
											? utilities.formatPriceNumber(
													globalData.defi.protocols.total_usd_value
											  )
											: 0}
									</div>
								</div>
							</div>

							<div className="col-lg-3">
								<div className="wallet-card">
									<div className="heading">Active Protocols</div>
									<div className="big-value">
										{globalData.defi.protocols.active_protocols}
									</div>
								</div>
							</div>

							<div className="col-lg-3">
								<div className="wallet-card">
									<div className="heading">Current Positions</div>
									<div className="big-value">
										{globalData.defi.protocols.total_positions}
									</div>
								</div>
							</div>

							<div className="col-lg-3">
								<div className="wallet-card">
									<div className="heading">Unclaimed Rewards</div>
									<div className="big-value">
										$
										{utilities.formatPriceNumber(
											globalData.defi.protocols.total_unclaimed_usd_value
										)}
									</div>
								</div>
							</div>
						</div>
					</div>

					<h3 className="sub-header" style={{ marginTop: "30px" }}>
						Protocol Breakdown
					</h3>
					<ul className="summary-protocols">
						{globalData.defi.protocols.protocols.map(
							(protocol: any, index: number) => (
								<li key={index}>
									<img
										src={protocol.protocol_logo}
										alt={protocol.protocol_name}
									/>
									<div>
										<div className="protocol-title">
											{protocol.protocol_name}
										</div>
										<div className="protocol-value">
											{protocol.total_usd_value
												? `$${utilities.formatPriceNumber(
														protocol.total_usd_value
												  )}`
												: null}
										</div>
										<div className="position-count">
											{protocol.positions} positions
										</div>
									</div>
								</li>
							)
						)}
					</ul>

					{!loading &&
						!error &&
						globalData.defi &&
						globalData.defi.totalDeFiPositions === 0 && (
							<h5>
								No DeFi positions found. More protocols will be supported soon.
							</h5>
						)}

					<h3 className="sub-header" style={{ marginTop: "30px" }}>
						Wallet Positions
					</h3>

					{globalData.defi.defiPositions &&
						globalData.defi.defiPositions.length > 0 && (
							<div className="summary-positions">
								{globalData.defi.protocols.protocols.map(
									(protocol: any, index: number) => (
										<div key={index}>
											<div
												className="wallet-card"
												key={protocol.name_name}
												onClick={() => handleProtocolClick(protocol)}
											>
												<div className="protocol-details">
													<img
														src={protocol.protocol_logo}
														alt={protocol.protocol_name}
													/>
													<div className="protocol-title">
														{protocol.protocol_name}{" "}
														{protocol.total_usd_value
															? `- $${utilities.formatPriceNumber(
																	protocol.total_usd_value
															  )}`
															: null}
														{protocol.total_unclaimed_usd_value && (
															<span className="rewards-available">
																+$
																{utilities.formatPriceNumber(
																	protocol.total_unclaimed_usd_value
																)}{" "}
																Unclaimed Rewards
															</span>
														)}
														<div className="position-count">
															{protocol.positions} positions
														</div>
													</div>

													{protocol.protocal_url && (
														<Link href={protocol.protocol_url}>
															<button className="btn btn-outline icon btn-sm">
																Manage Positions <ExternalLinkIcon width="15" />
															</button>
														</Link>
													)}
												</div>

												<ul className="defi-list">
													<div className="position-detail">
														<li className="header-row">
															<div>Token</div>
															<div></div>
															<div>Token Balances</div>
															<div>Position Type</div>
															<div>Position Value</div>
														</li>

														{globalData.defi.defiPositions
															.filter(
																(position: any) =>
																	position.protocol_id === protocol.protocol_id
															)
															.map((position: any, index: number) => (
																<li key={index}>
																	<>
																		<div>
																			{position.position.tokens.map(
																				(position_token: any, ind: number) =>
																					(position_token.token_type !==
																						"reward" ||
																						!position_token.token_type) && (
																						<div key={ind}>
																							<TokenLogo
																								tokenImage={position_token.logo}
																								tokenName={position_token.name}
																								tokenSymbol={
																									position_token.symbol
																								}
																							/>
																						</div>
																					)
																			)}
																		</div>
																		<div>
																			{position.position.tokens.map(
																				(position_token: any, i: number) =>
																					(position_token.token_type !==
																						"reward" ||
																						!position_token.token_type) && (
																						<div key={i}>
																							{position_token.symbol}
																						</div>
																					)
																			)}
																		</div>

																		<div className="token-balance">
																			{position.position.tokens.map(
																				(position_token: any, ind: number) =>
																					(position_token.token_type !==
																						"reward" ||
																						!position_token.token_type) && (
																						<div key={ind}>
																							{Number(
																								position_token.balance_formatted
																							).toFixed(4)}
																						</div>
																					)
																			)}
																		</div>
																	</>

																	<div>{position.position.label}</div>
																	<div className="value">
																		$
																		{utilities.formatPriceNumber(
																			Number(position.position.balance_usd)
																		)}
																	</div>

																	{position.position
																		.total_unclaimed_usd_value && (
																		<div className="rewards-available">
																			Claim Rewards
																		</div>
																	)}
																</li>
															))}
													</div>
												</ul>
											</div>
										</div>
									)
								)}
							</div>
						)}
				</>
			)}
		</div>
	);
};

export default DefiEl;
