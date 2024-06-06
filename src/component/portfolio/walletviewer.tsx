"use client";
import { useEffect, useState, useContext } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { AppContext } from "../../hooks/AppContext";
import WalletForm from "./walletform";
import Loader from "../loader/index";
import { debounce } from "lodash";
import "../../styles/walletviewer.scss";
import Overview from "./overview";

const WalletViewer = () => {
	const { globalData, setGlobalData } = useContext(AppContext);
	const [loading, setLoading] = useState(false);
	const [error, setError] = useState(null);

	const { walletAddress } = useParams();
	let hasData = false;

	useEffect(() => {}, []);

	const handleWalletSubmit = async (address: any) => {
		setLoading(true);
		fetchWallet(address);
	};

	const fetchWallet = async (address: string) => {
		try {
			const response = await fetch(`/api/wallet`, {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify({
					walletAddress: address,
					chain: globalData.selectedChain ? globalData.selectedChain : "eth",
				}),
			});
			const data = await response.json();

			console.log(data);
			if (data) {
				hasData = false;

				setGlobalData((prevData: any) => ({
					...prevData,
					selectedChain: localStorage.getItem("selectedChain") || "eth",
					walletAddress: data.address,
					balance: data.balance ? data.balance : 0,
					chains: data.active_chains,
					networth: data.networth,
					networthArray: {
						labels: data.networthDataLabels,
						data: data.networthDatasets,
					},
					tokenData: data.walletTokens,
					// historicalData: data.historicalBalanceData,
					profile: {
						walletAge: data.walletAge,
						firstSeenDate: data.firstSeenDate,
						lastSeenDate: data.lastSeenDate,
						isWhale: data.isWhale,
						earlyAdopter: data.earlyAdopter,
						multiChainer: data.multiChainer,
						speculator: data.speculator,
						isFresh: data.isFresh,
						ens: data.ens,
					},
					days: "7",
				}));
			}
		} catch (err) {
			console.log(err);
		}
	};

	return (
		<>
			{globalData.walletAddress ? (
				<section className="portfolio-area">
					<Overview></Overview>
				</section>
			) : (
				<section className="portfolio-area"></section>
			)}
		</>
	);
};

export default WalletViewer;
