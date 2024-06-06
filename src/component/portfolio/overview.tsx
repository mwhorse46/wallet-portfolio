import React, { useState, useContext, useEffect } from "react";
import { AppContext } from "@/hooks/AppContext";
import ExternalLinkIcon from "../misc/externallinkicon";
import CopyToClipboard from "../misc/copytoclipboard";
import ChainDropDown from "../misc/chaindropdown";
import NetworthChart from "./networthchart";
import { UncontrolledTooltip } from "reactstrap";
import WalletInteractions from "./walletinteractions";
import ArrowIcon from "../misc/arrowicon";
import moment from "moment";
import Link from "next/link";
import TxChart from "./txchart";
import TokenLogo from "./tokenlogo";
import Moralis from "moralis";
import * as utilities from "../../app/api/utilities";
import "../../styles/overview.scss";

// UncontrolledTooltip.defaultPropos = {
// 	target: "tooltip-eth",
// 	placement: "top",
// };
const Overview = () => {
	const { globalData, setGlobalData } = useContext(AppContext);
	const [loading, setLoading] = useState(!globalData);
	const [currentPage, setCurrentPage] = useState(1);
	const itemsPerPage = 10;
	const [itemOffset, setItemOffset] = useState(0);
	const endOffset = itemOffset + itemsPerPage;
	const currentItems = globalData.tokenData.result.slice(itemOffset, endOffset);
	const pageCount = Math.ceil(
		globalData.tokenData.result.length / itemsPerPage
	);

	useEffect(() => {
		if (globalData.walletAddress && !globalData.stats) {
			setLoading(true);
			fetchProfile(
				globalData.selectedChain ||
					localStorage.getItem("selectedChain") ||
					"eth"
			);
		}
	}, []);

	const fetchProfile = (chain: string) => {
		setLoading(true);
		fetch(
			`/api/wallet-profile?wallet=${globalData.walletAddress}&chain=${chain}`
		)
			.then((response) => {
				if (!response.ok) {
					throw new Error("Network response was not ok");
				}
				return response.json();
			})
			.then((data) => {
				console.log("fetch-profile", data);
				setGlobalData((prevData: any) => ({
					...prevData,
					chartArray: data.chartArray,
					stats: data.stats,
					profile: {
						...prevData.profile,
						collector: data.collector,
					},
					interactions: data.addressOccurrences,
					tokenCount: data.tokens.length,
					token_balances: data.tokens,
				}));
				setLoading(false);
			})
			.catch((error) => {
				setLoading(false);
			});
	};

	// click to request another page.
	const handlePageClick = (pageNumber: number) => {
		if (pageNumber < 1 || pageNumber > totalPages) {
			return; // Avoid going to negative pages or beyond the total number of pages
		}

		const newOffset = (pageNumber - 1) * itemsPerPage; // Calculate the new offset
		setItemOffset(newOffset);
		setCurrentPage(pageNumber); // Update the currentPage state
	};

	// Calculate total number of pages
	const totalPages = Math.ceil(
		globalData.tokenData.result.length / itemsPerPage
	);

	const pageNumbers = Array.from(
		{ length: totalPages },
		(_, index) => index + 1
	);

	// Render pagination links
	const renderPaginationLinks = () => {
		return pageNumbers.map((pageNumber) => (
			<li
				key={pageNumber}
				className={pageNumber === currentPage ? "active" : ""}
			>
				<a
					style={{ cursor: "pointer" }}
					onClick={() => handlePageClick(pageNumber)}
				>
					{pageNumber}
				</a>
			</li>
		));
	};

	const handleDropdownChange = (selectedValue: any) => {
		setGlobalData((prevData: any) => ({
			...prevData,
			nftsLoaded: false,
			tokensLoaded: false,
			defiLoaded: false,
			selectedChain: selectedValue,
		}));
		fetchProfile(selectedValue);
	};
	return (
		<div>
			<div className="container overview">
				<div className="page-header">
					<div style={{ display: "flex", gap: "20px" }}>
						<h2> ${utilities.formatNumber(globalData.networth)} </h2>
						<div className="domains">
							<a
								href={`https://etherscan.io/address/${globalData.walletAddress}`}
								target="_blank"
							>
								<img
									className="etherscan"
									src="assets/img/cryptos/etherscan.svg"
									alt="etherscan"
									style={{ width: "20px", marginRight: "5px" }}
								/>
								{utilities.shortAddress(globalData.walletAddress)}{" "}
								<ExternalLinkIcon width={16} />
							</a>
						</div>
					</div>
					<ChainDropDown
						onChange={handleDropdownChange}
						chains={globalData.chains}
						selectedChain={globalData.selectedChain}
					/>
				</div>
				<div className="wallet-card top">
					<div className="title">Wallet Profile</div>
					<div className="row">
						<div className="col-lg-9">
							<div className="row">
								<div className="col-lg-4">
									<div className="profile-intro">
										<div>
											<img
												src={`https://api.dicebear.com/7.x/identicon/svg?backgroundColor=b6e3f4&seed=${globalData.walletAddress}`}
												alt="profile"
											/>
										</div>

										<div>
											<div className="heading">Address</div>
											<div className="big-value networth copy-container">
												{utilities.shortAddress(globalData.walletAddress)}
												<CopyToClipboard valueToCopy={globalData.walletAddress}>
													<button></button>
												</CopyToClipboard>
											</div>
										</div>
									</div>
								</div>
								<div className="col-lg-4">
									<div className="heading">Active chains</div>
									<ul className="big-value">
										{globalData.chains.map((item: any) => (
											<li className="chain" key={item.chain}>
												<img
													src={`assets/img/cryptos/${item.chain}-icon.png`}
													id={`tooltip-${item.chain}`} // this ID is required for the tooltip
													alt={item.label}
												/>
												<UncontrolledTooltip
													target={`tooltip-${item.chain}`}
													placement="top"
												>
													{item.label}
												</UncontrolledTooltip>
											</li>
										))}
									</ul>
								</div>
								<div className="col networth">
									<div className="heading">Cross-chain Networth</div>
									<div className="big-value">
										$
										{globalData.networth
											? utilities.formatPriceNumber(
													Number(globalData.networth).toFixed(0)
											  )
											: "0"}
									</div>
								</div>
							</div>
							<div className="row">
								<div className="col-lg-4">
									<div className="heading">
										First seen
										{globalData?.profile?.isFresh && (
											<span className="fresh">FRESH</span>
										)}
									</div>
									<div className="big-value">
										{moment(globalData.profile.firstSeenDate).fromNow()}
									</div>
								</div>

								<div className="col-lg-4">
									<div className="heading">Last seen</div>
									<div className="big-value">
										{moment(globalData.profile.lastSeenDate).fromNow()}
									</div>
								</div>
							</div>
						</div>
						<div className="col-lg-2">
							<NetworthChart chartArray={globalData.networthArray} />
						</div>
					</div>
					<div className="title" style={{ marginTop: "30px" }}>
						{" "}
						Wallet Tokens
					</div>
					<div className="row tokens-list">
						<div className="col-lg-12">
							<div className="wallet-table">
								<table style={{ width: "100%" }}>
									<thead>
										<tr>
											<th>Name</th>
											<th>Amount</th>
											<th>Price</th>
											<th>24h Change</th>
											<th>Total</th>
										</tr>
									</thead>
									<tbody>
										{!!globalData.tokenData &&
											currentItems.map((token: any) => (
												<tr key={token.name}>
													<td>
														<div
															style={{
																display: "flex",
																gap: "10px",
																alignItems: "center",
															}}
														>
															<img
																src={token.thumbnail}
																style={{
																	width: "35px",
																	height: "35px",
																	borderRadius: "50%",
																}}
															/>
															<span
																style={{
																	overflow: "hidden",
																	whiteSpace: "nowrap",
																	textOverflow: "ellipsis",
																	maxWidth: "150px",
																	fontSize: "20px",
																}}
															>
																{token.name}
															</span>
														</div>
													</td>
													<td>
														{utilities.formatNumber(token.balance_formatted)}
													</td>
													<td>${utilities.formatPrice(token.usd_price)}</td>
													<td>
														{token.usd_price_24hr_percent_change > 0 ? (
															<span className="increase-percent">
																{utilities.formatPrice(
																	token.usd_price_24hr_usd_change
																)}{" "}
																%
															</span>
														) : token.usd_price_24hr_percent_change == 0 ? (
															<span> - </span>
														) : (
															<span className="decrease-percent">
																{utilities.formatPrice(
																	Math.abs(token.usd_price_24hr_usd_change)
																)}{" "}
																%
															</span>
														)}
													</td>
													<td>${utilities.formatPrice(token.usd_value)}</td>
												</tr>
											))}
									</tbody>
								</table>
							</div>
							<nav className="pagination-wrap" style={{ marginTop: "30px" }}>
								<ul className="list-wrap">
									<li>
										<a
											onClick={() => handlePageClick(currentPage - 1)}
											style={{ cursor: "pointer" }}
											className={currentPage === 1 ? "disabled" : ""}
										>
											<i className="fas fa-arrow-left"></i>
										</a>
									</li>
									{renderPaginationLinks()}
									<li>
										<a
											onClick={() => handlePageClick(currentPage + 1)}
											style={{ cursor: "pointer" }}
											className={currentPage === totalPages ? "disabled" : ""}
										>
											<i className="fas fa-arrow-right"></i>
										</a>
									</li>
								</ul>
							</nav>
						</div>
					</div>
				</div>

				<div className="chart-area">
					<div className="row">
						{globalData.chartArray && (
							<div className="col-lg-12">
								<div className="wallet-card">
									<div className="title">Wallet Activity</div>
									<div className="card-info">
										Weekly transactions over the last 90 days
									</div>
									<TxChart chartArray={globalData.chartArray} />
								</div>
								<hr />

								<div className="wallet-card interactions">
									<div className="title">Wallet Interactions</div>
									<div className="card-info">
										Wallet interactions based on the last 90 days
									</div>
									<WalletInteractions />
								</div>
							</div>
						)}
					</div>
				</div>
			</div>
		</div>
	);
};

export default Overview;
