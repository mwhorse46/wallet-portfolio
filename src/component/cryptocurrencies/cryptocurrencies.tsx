"use client";
import React, { useState, useContext, useEffect } from "react";
import { AppContext } from "@/hooks/AppContext";
import Skeleton from "../misc/skeleton";
import TokenLogo from "../portfolio/tokenlogo";
import { Nav, NavItem, NavLink, TabContent, TabPane } from "reactstrap";
import classnames from "classnames";
import "../../styles/cryptocurrencies.scss";

const CryptocurrenciesArea = () => {
	const { globalData, setGlobalData } = useContext(AppContext);
	const [loading, setLoading] = useState(false);
	const [moversLoading, setMoversLoading] = useState(false);
	const [error, setError] = useState(null);
	const [marketDataLoading, setMarketDataLoading] = useState(false);

	const [activeTab, setActiveTab] = useState("1");

	const toggle = (tab: any) => {
		if (activeTab !== tab) setActiveTab(tab);
	};

	const handleTokenClick = (token: any) => { };

	const fetchFirstTab = () => {
		setMoversLoading(true);
		setError(null);
		setGlobalData((prevData: any) => ({
			...prevData,
			marketCap: null,
			tradingVolume: null,
			marketDataLoaded: false,
		}));
		fetch(`/api/market-data-movers`)
			.then((response) => {
				if (!response.ok) throw new Error("Failed to fetch data");
				return response.json();
			})
			.then((fetchedData) => {
				setGlobalData((prevData: any) => ({
					...prevData,
					tokenMovers: fetchedData.top_movers,
				}));
				setMoversLoading(false);
			})
			.catch((error) => {
				setError(error.message);
				setMoversLoading(false);
			});
	};
	const fetchLivePriceData = () => {
		setMoversLoading(true);
		setError(null);
		setGlobalData((prevData: any) => ({
			...prevData,
			livePriceData: null,
			categoryData: null,
			livePriceDataLoaded: false,
		}));
		fetch(`/api/markets`)
			.then((response) => {
				if (!response.ok) throw new Error("Failed to fetch data");
				return response.json();
			})
			.then((fetchedData) => {
				console.log(" fetch coingecko price data", fetchedData);
				setGlobalData((prevData: any) => ({
					...prevData,
					livePriceData: fetchedData.priceMarketData,
					categoryData: fetchedData.categoryData,
					livePriceDataLoaded: true,
				}));
				setMoversLoading(false);
			})
			.catch((error) => {
				setError(error.message);
				setMoversLoading(false);
			});
	};
	const fetchMarketData = () => {
		setLoading(true);
		setError(null);
		setGlobalData((prevData: any) => ({
			...prevData,
			marketCap: null,
			tradingVolume: null,
			marketDataLoaded: false,
		}));
		fetch(`/api/market-data`)
			.then((response) => {
				if (!response.ok) throw new Error("Failed to fetch data");
				return response.json();
			})
			.then((fetchedData) => {
				setGlobalData((prevData: any) => ({
					...prevData,
					marketCap: fetchedData.market_cap,
					tradingVolume: fetchedData.trading_volume,
					topTokens: fetchedData.top_tokens,
					nftMarketCap: fetchedData.nft_market_cap,
					nftVolume: fetchedData.nft_volume,
					marketDataLoaded: true,
				}));
				setLoading(false);
			})
			.catch((error) => {
				setError(error.message);
				setLoading(false);
			});
	};

	useEffect(() => {
		fetchLivePriceData();

		if (!globalData.marketDataLoaded) {
			setLoading(true);
			setMoversLoading(true);
			fetchFirstTab();
			fetchMarketData();
		}
	}, []);

	useEffect(() => {
		console.log("context changed", globalData);
	}, [globalData]);

	useEffect(() => {
		localStorage.setItem("selectedChain", globalData.selectedChain);
	}, [globalData.selectedChain]);

	return (
		<div className="container cryptocurrencies-area" id="market-data">
			<div>
				<Nav tabs>
					<NavItem>
						<NavLink
							className={classnames({ active: activeTab === "1" })}
							onClick={() => {
								toggle("1");
							}}
						>
							Cryptocurrencies
						</NavLink>
					</NavItem>

					<NavItem>
						<NavLink
							className={classnames({ active: activeTab === "2" })}
							onClick={() => {
								toggle("2");
							}}
						>
							Ethereum (ERC20)
						</NavLink>
					</NavItem>

					<NavItem>
						<NavLink
							className={classnames({ active: activeTab === "3" })}
							onClick={() => {
								toggle("3");
							}}
						>
							ERC-20 Winners & Losers
						</NavLink>
					</NavItem>

					<NavItem>
						<NavLink
							className={classnames({ active: activeTab === "4" })}
							onClick={() => {
								toggle("4");
							}}
						>
							Crypto Trade Volume
						</NavLink>
					</NavItem>

					<NavItem>
						<NavLink
							className={classnames({ active: activeTab === "5" })}
							onClick={() => {
								toggle("5");
							}}
						>
							NFTs
						</NavLink>
					</NavItem>

					<NavItem>
						<NavLink
							className={classnames({ active: activeTab === "6" })}
							onClick={() => {
								toggle("6");
							}}
						>
							NFT Trade Volume
						</NavLink>
					</NavItem>
					<NavItem>
						<NavLink
							className={classnames({ active: activeTab === "7" })}
							onClick={() => {
								toggle("7");
							}}
						>
							Coin Live Prices
						</NavLink>
					</NavItem>
					<NavItem>
						<NavLink
							className={classnames({ active: activeTab === "8" })}
							onClick={() => {
								toggle("8");
							}}
						>
							Categories
						</NavLink>
					</NavItem>
				</Nav>
				<TabContent activeTab={activeTab}>
					<TabPane tabId="1">
						<h3>New 🔥: Top 100 Cryptocurrencies by Market Cap</h3>
						<ul className="token-list market-data">
							<li className="header-row">
								<div>Token</div>
								<div></div>
								<div>Price</div>
								<div>1h %</div>
								<div>24h %</div>
								<div>7d %</div>
								<div>30d %</div>
								<div>24h High</div>
								<div>24h Low</div>
								<div>All Time High</div>
								<div>Market Cap</div>
							</li>
							{loading && <Skeleton />}
							{error && <div className="text-red-500">{error}</div>}
							{/* Assuming globalData.tokensData is an array */}

							{globalData.marketCap &&
								globalData.marketCap.map((token: any, index: number) => (
									<li key={index}>
										<TokenLogo
											tokenImage={token.logo}
											tokenName={token.name}
											tokenSymbol={token.symbol}
										/>
										<div>
											<div className="token-name">{token.name}</div>
											<div className="token-symbol">{token.symbol}</div>
										</div>
										<div className="token-price">
											{token.usd_price &&
												`${Number(
													Number(token.usd_price).toFixed(2)
												).toLocaleString("en-US", {
													style: "currency",
													currency: "USD",
												})}`}
										</div>
										<div
											className={
												token.usd_price_1hr_percent_change < 0
													? "negative"
													: "positive"
											}
										>
											{Number(token.usd_price_1hr_percent_change).toFixed(2)}%
										</div>
										<div
											className={
												token.usd_price_24hr_percent_change < 0
													? "negative"
													: "positive"
											}
										>
											{Number(token.usd_price_24hr_percent_change).toFixed(2)}%
										</div>
										<div
											className={
												token.usd_price_7d_percent_change < 0
													? "negative"
													: "positive"
											}
										>
											{Number(token.usd_price_7d_percent_change).toFixed(2)}%
										</div>
										<div
											className={
												token.usd_price_30d_percent_change < 0
													? "negative"
													: "positive"
											}
										>
											{Number(token.usd_price_30d_percent_change).toFixed(2)}%
										</div>
										<div className="">
											{Number(token.usd_price_24hr_high).toLocaleString(
												"en-US",
												{ style: "currency", currency: "USD" }
											)}
										</div>
										<div className="">
											{Number(token.usd_price_24hr_low).toLocaleString(
												"en-US",
												{ style: "currency", currency: "USD" }
											)}
										</div>
										<div className="">
											<div>
												{Number(token.usd_price_ath).toLocaleString("en-US", {
													style: "currency",
													currency: "USD",
												})}
											</div>
											<div
												className={
													token.ath_percent_change < 0 ? "negative" : "positive"
												}
											>
												{Number(token.ath_percent_change).toFixed(2)}%
											</div>
										</div>
										<div className="">
											<div>
												{Number(token.market_cap_usd).toLocaleString("en-US", {
													style: "currency",
													currency: "USD",
												})}
											</div>
											<div
												className={
													token.market_cap_24hr_percent_change < 0
														? "negative"
														: "positive"
												}
											>
												{Number(token.market_cap_24hr_percent_change).toFixed(
													2
												)}
												%
											</div>
										</div>
									</li>
								))}
						</ul>
					</TabPane>

					<TabPane tabId="2">
						<h3>Top ERC20 Tokens by Market Cap</h3>
						<ul className="token-list market-data wider-col-1">
							<li className="header-row">
								<div>Token</div>
								<div></div>
								<div>Price</div>
								<div>24h %</div>
								<div>7d %</div>
								<div>Market Cap</div>
							</li>
							{loading && <Skeleton />}
							{error && <div className="text-red-500">{error}</div>}
							{/* Assuming globalData.tokensData is an array */}

							{globalData.topTokens &&
								globalData.topTokens.map((token: any, index: number) => (
									<li key={index}>
										<TokenLogo
											tokenImage={token.token_logo}
											tokenName={token.token_name}
											tokenSymbol={token.token_symbol}
										/>
										<div>
											<div className="token-name">{token.token_name}</div>
											<div className="token-symbol">{token.token_symbol}</div>
										</div>
										<div className="token-price">
											{token.price_usd &&
												`${Number(
													Number(token.price_usd).toFixed(2)
												).toLocaleString("en-US", {
													style: "currency",
													currency: "USD",
												})}`}
										</div>
										<div
											className={
												token.price_24h_percent_change < 0
													? "negative"
													: "positive"
											}
										>
											{Number(token.price_24h_percent_change).toFixed(2)}%
										</div>
										<div
											className={
												token.price_7d_percent_change < 0
													? "negative"
													: "positive"
											}
										>
											{Number(token.price_7d_percent_change).toFixed(2)}%
										</div>
										<div className="">
											{Number(token.market_cap_usd).toLocaleString("en-US", {
												style: "currency",
												currency: "USD",
											})}
										</div>
									</li>
								))}
						</ul>
					</TabPane>

					<TabPane tabId="3">
						<div className="row">
							<div className="col-md-6">
								<div className="wallet-card">
									<h3>📈 Winners (24hrs)</h3>
									<ul className="token-list market-data wider-col-1">
										<li className="header-row">
											<div>Token</div>
											<div></div>
											<div>Price</div>
											<div>24h %</div>
											<div>Market Cap</div>
										</li>
										{loading && <Skeleton />}
										{error && <div className="text-red-500">{error}</div>}
										{/* Assuming globalData.tokensData is an array */}

										{globalData.tokenMovers &&
											globalData.tokenMovers.gainers
												.slice(0, 20)
												.map((token: any, index: number) => (
													<li
														key={index}
														onClick={() => handleTokenClick(token)}
													>
														<TokenLogo
															tokenImage={token.token_logo}
															tokenName={token.token_name}
															tokenSymbol={token.token_symbol}
														/>
														<div>
															<div className="token-name">
																{token.token_name}
															</div>
															<div className="token-symbol">
																{token.token_symbol}
															</div>
														</div>
														<div className="token-price">
															{token.price_usd &&
																`${Number(
																	Number(token.price_usd).toFixed(2)
																).toLocaleString("en-US", {
																	style: "currency",
																	currency: "USD",
																})}`}
														</div>
														<div
															className={
																token.price_24h_percent_change < 0
																	? "negative"
																	: "positive"
															}
														>
															{Number(token.price_24h_percent_change).toFixed(
																2
															)}
															%
														</div>
														<div className="">
															{Number(token.market_cap_usd).toLocaleString(
																"en-US",
																{ style: "currency", currency: "USD" }
															)}
														</div>
													</li>
												))}
									</ul>
								</div>
							</div>

							<div className="col-md-6">
								<div className="wallet-card">
									<h3>📉 Losers (24hrs)</h3>
									<ul className="token-list market-data wider-col-1">
										<li className="header-row">
											<div>Token</div>
											<div></div>
											<div>Price</div>
											<div>24h %</div>
											<div>Market Cap</div>
										</li>
										{loading && <Skeleton />}
										{error && <div className="text-red-500">{error}</div>}
										{/* Assuming globalData.tokensData is an array */}

										{globalData.tokenMovers &&
											globalData.tokenMovers.losers
												.slice(0, 20)
												.map((token: any, index: number) => (
													<li
														key={index}
														onClick={() => handleTokenClick(token)}
													>
														<TokenLogo
															tokenImage={token.token_logo}
															tokenName={token.token_name}
															tokenSymbol={token.token_symbol}
														/>
														<div>
															<div className="token-name">
																{token.token_name}
															</div>
															<div className="token-symbol">
																{token.token_symbol}
															</div>
														</div>
														<div className="token-price">
															{token.price_usd &&
																`${Number(
																	Number(token.price_usd).toFixed(2)
																).toLocaleString("en-US", {
																	style: "currency",
																	currency: "USD",
																})}`}
														</div>
														<div
															className={
																token.price_24h_percent_change < 0
																	? "negative"
																	: "positive"
															}
														>
															{Number(token.price_24h_percent_change).toFixed(
																2
															)}
															%
														</div>
														<div className="">
															{Number(token.market_cap_usd).toLocaleString(
																"en-US",
																{ style: "currency", currency: "USD" }
															)}
														</div>
													</li>
												))}
									</ul>
								</div>
							</div>
						</div>
					</TabPane>
					<TabPane tabId="4">
						<h3>New 🔥: Top 100 Cryptocurrencies by Trade Volume</h3>
						<ul className="token-list market-data">
							<li className="header-row">
								<div>Token</div>
								<div></div>
								<div>Price</div>
								<div>1h %</div>
								<div>24h %</div>
								<div>7d %</div>
								<div>30d %</div>
								<div>24h High</div>
								<div>24h Low</div>
								<div>All Time High</div>
								<div>Trade Volume</div>
							</li>
							{loading && <Skeleton />}
							{error && <div className="text-red-500">{error}</div>}
							{/* Assuming globalData.tokensData is an array */}

							{globalData.tradingVolume &&
								globalData.tradingVolume.map((token: any, index: number) => (
									<li key={index}>
										<TokenLogo
											tokenImage={token.logo}
											tokenName={token.name}
											tokenSymbol={token.symbol}
										/>
										<div>
											<div className="token-name">{token.name}</div>
											<div className="token-symbol">{token.symbol}</div>
										</div>
										<div className="token-price">
											{token.usd_price &&
												`${Number(
													Number(token.usd_price).toFixed(2)
												).toLocaleString("en-US", {
													style: "currency",
													currency: "USD",
												})}`}
										</div>
										<div
											className={
												token.usd_price_1hr_percent_change < 0
													? "negative"
													: "positive"
											}
										>
											{Number(token.usd_price_1hr_percent_change).toFixed(2)}%
										</div>
										<div
											className={
												token.usd_price_24hr_percent_change < 0
													? "negative"
													: "positive"
											}
										>
											{Number(token.usd_price_24hr_percent_change).toFixed(2)}%
										</div>
										<div
											className={
												token.usd_price_7d_percent_change < 0
													? "negative"
													: "positive"
											}
										>
											{Number(token.usd_price_7d_percent_change).toFixed(2)}%
										</div>
										<div
											className={
												token.usd_price_30d_percent_change < 0
													? "negative"
													: "positive"
											}
										>
											{Number(token.usd_price_30d_percent_change).toFixed(2)}%
										</div>
										<div className="">
											{Number(token.usd_price_24hr_high).toLocaleString(
												"en-US",
												{ style: "currency", currency: "USD" }
											)}
										</div>
										<div className="">
											{Number(token.usd_price_24hr_low).toLocaleString(
												"en-US",
												{ style: "currency", currency: "USD" }
											)}
										</div>
										<div className="">
											<div>
												{Number(token.usd_price_ath).toLocaleString("en-US", {
													style: "currency",
													currency: "USD",
												})}
											</div>
											<div
												className={
													token.ath_percent_change < 0 ? "negative" : "positive"
												}
											>
												{Number(token.ath_percent_change).toFixed(2)}%
											</div>
										</div>
										<div className="">
											{Number(token.total_volume).toLocaleString("en-US", {
												style: "currency",
												currency: "USD",
											})}
										</div>
									</li>
								))}
						</ul>
					</TabPane>

					<TabPane tabId="5">
						<h3>Top NFT Collections by Market Cap</h3>
						<ul className="token-list market-data wider-col-1">
							<li className="header-row">
								<div>Collection</div>
								<div></div>
								<div>Floor Price</div>
								<div>Floor Price USD</div>
								<div>Floor Price 24h %</div>
								<div>Market Cap</div>
								<div>Market Cap 24h %</div>
							</li>
							{loading && <Skeleton />}
							{error && <div className="text-red-500">{error}</div>}
							{/* Assuming globalData.tokensData is an array */}

							{globalData.nftMarketCap &&
								globalData.nftMarketCap.map((token: any, index: number) => (
									<li key={index}>
										<TokenLogo
											tokenImage={token.collection_image}
											tokenName={token.collection_title}
											tokenSymbol={token.symbol}
										/>
										<div>
											<div className="token-name">{token.collection_title}</div>
										</div>
										<div className="token-price">{token.floor_price} ETH</div>
										<div className="token-price">
											{token.floor_price_usd &&
												`${Number(
													Number(token.floor_price_usd).toFixed(2)
												).toLocaleString("en-US", {
													style: "currency",
													currency: "USD",
												})}`}
										</div>
										<div
											className={
												token.floor_price_24hr_percent_change < 0
													? "negative"
													: "positive"
											}
										>
											{Number(token.floor_price_24hr_percent_change).toFixed(2)}
											%
										</div>
										<div className="">
											{Number(token.market_cap_usd).toLocaleString("en-US", {
												style: "currency",
												currency: "USD",
											})}
										</div>
										<div
											className={
												token.market_cap_24hr_percent_change < 0
													? "negative"
													: "positive"
											}
										>
											{Number(token.market_cap_24hr_percent_change).toFixed(2)}%
										</div>
									</li>
								))}
						</ul>
					</TabPane>

					<TabPane tabId="6">
						<h3>Top NFT Collections by Trade Volume</h3>
						<ul className="token-list market-data wider-col-1">
							<li className="header-row">
								<div>Collection</div>
								<div></div>
								<div>Floor</div>
								<div>Floor USD</div>
								<div>Floor 24h %</div>
								<div>Floor 7d %</div>
								<div>Floor 30d %</div>
								<div>Trade Volume 24h</div>
								<div>Trade Volume 24h %</div>
								<div>Avg. Trade Price</div>
								<div>Avg. Trade Price USD</div>
							</li>
							{loading && <Skeleton />}
							{error && <div className="text-red-500">{error}</div>}
							{/* Assuming globalData.tokensData is an array */}

							{globalData.nftVolume &&
								globalData.nftVolume.map((token: any, index: number) => (
									<li key={index}>
										<TokenLogo
											tokenImage={token.collection_image}
											tokenName={token.collection_title}
											tokenSymbol=""
										/>
										<div>
											<div className="token-name">{token.collection_title}</div>
										</div>
										<div className="token-price">{token.floor_price} ETH</div>
										<div className="token-price">
											{token.floor_price_usd &&
												`${Number(
													Number(token.floor_price_usd).toFixed(2)
												).toLocaleString("en-US", {
													style: "currency",
													currency: "USD",
												})}`}
										</div>
										<div
											className={
												token.floor_price_24hr_percent_change < 0
													? "negative"
													: "positive"
											}
										>
											{Number(token.floor_price_24hr_percent_change).toFixed(2)}
											%
										</div>
										<div
											className={
												token.floor_price_7d_percent_change < 0
													? "negative"
													: "positive"
											}
										>
											{Number(token.floor_price_7d_percent_change).toFixed(2)}%
										</div>
										<div
											className={
												token.floor_price_30d_percent_change < 0
													? "negative"
													: "positive"
											}
										>
											{Number(token.floor_price_30d_percent_change).toFixed(2)}%
										</div>
										<div className="">
											{Number(token.volume_usd).toLocaleString("en-US", {
												style: "currency",
												currency: "USD",
											})}
										</div>
										<div
											className={
												token.volume_24hr_percent_change < 0
													? "negative"
													: "positive"
											}
										>
											{Number(token.volume_24hr_percent_change).toFixed(2)}%
										</div>
										<div className="">
											{Number(token.average_price).toFixed(2)} ETH
										</div>
										<div className="token-price">
											{token.average_price_usd &&
												`${Number(
													Number(token.average_price_usd).toFixed(2)
												).toLocaleString("en-US", {
													style: "currency",
													currency: "USD",
												})}`}
										</div>
									</li>
								))}
						</ul>
					</TabPane>

					<TabPane tabId="7">
						<h3>New 🔥: Top 100 Coins by Coingecko API</h3>
						<ul className="token-list market-data">
							<li className="header-row">
								<div>Token</div>
								<div></div>
								<div>Price</div>
								<div>Circulating Supply</div>
								<div>24h High</div>
								<div>24h Low</div>
								<div>Price 24h%</div>
								<div>Market Cap</div>
								<div>Total Supply</div>
							</li>
							{loading && <Skeleton />}
							{error && <div className="text-red-500">{error}</div>}
							{/* Assuming globalData.tokensData is an array */}

							{globalData.livePriceData &&
								globalData.livePriceData.map((token: any, index: number) => (
									<li key={index}>
										<TokenLogo
											tokenImage={token.image}
											tokenName={token.name}
											tokenSymbol={token.symbol}
										/>
										<div>
											<div className="token-name">{token.name}</div>
											<div className="token-symbol">{token.symbol}</div>
										</div>
										<div className="token-price">
											{token.current_price &&
												`${Number(
													Number(token.current_price).toFixed(2)
												).toLocaleString("en-US", {
													style: "currency",
													currency: "USD",
												})}`}
										</div>
										<div className="token-price">
											{Number(token.circulating_supply).toFixed(2)}
										</div>
										<div className="">
											{Number(token.high_24h).toLocaleString("en-US", {
												style: "currency",
												currency: "USD",
											})}
										</div>
										<div className="">
											{Number(token.low_24h).toLocaleString("en-US", {
												style: "currency",
												currency: "USD",
											})}
										</div>

										<div
											className={
												token.price_change_percentage_24h < 0
													? "negative"
													: "positive"
											}
										>
											{Number(token.price_change_percentage_24h).toFixed(2)}%
										</div>
										<div className="">
											<div>
												{Number(token.market_cap).toLocaleString("en-US", {
													style: "currency",
													currency: "USD",
												})}
											</div>
											<div
												className={
													Number(token.market_cap_change_percentage_24h) < 0
														? "negative"
														: "positive"
												}
											>
												{Number(token.market_cap_change_percentage_24h).toFixed(
													2
												)}
												%
											</div>
										</div>
										<div className="">
											{Number(token.total_supply).toFixed(2)}
										</div>
									</li>
								))}
						</ul>
					</TabPane>
					<TabPane tabId="8">
						<h3>New 🔥: Top 100 Coins by Coingecko API</h3>
						<ul className="token-list-category">
							<li className="header-row">
								<div>Category</div>
								<div>Top Gainers</div>
								<div>24h</div>
								<div>Market Cap</div>
								<div>24h Volume</div>
							</li>
							{loading && <Skeleton />}
							{error && <div className="text-red-500">{error}</div>}
							{/* Assuming globalData.tokensData is an array */}

							{globalData.categoryData &&
								globalData.categoryData.map((category: any, index: number) => (
									<li key={index}>
										<div className="">{category.name}</div>
										<div
											className="category-image"
										>
											{
												category.top_3_coins.map((avatar: any, index: number) =>(
												<img src={avatar} alt={avatar} key={index}/>
												))
											}
										</div>
										<div
											className={
												category.market_cap_change_24h < 0
													? "negative"
													: "positive"
											}
										>
											{Number(category.market_cap_change_24h).toFixed(2)}%
										</div>
										<div className="">
											{Number(category.market_cap).toLocaleString("en-US", {
												style: "currency",
												currency: "USD",
											})}
										</div>
										<div className="">
										{Number(category.volume_24h).toLocaleString("en-US", {
												style: "currency",
												currency: "USD",
											})}
										</div>
									</li>
								))}
						</ul>
					</TabPane>
				</TabContent>
			</div>
		</div>
	);
};

export default CryptocurrenciesArea;
