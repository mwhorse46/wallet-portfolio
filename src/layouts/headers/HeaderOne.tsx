"use client";
import Link from "next/link";
import { useContext, useEffect, useState } from "react";
import UseSticky from "../../hooks/UseSticky";
import Image from "next/image";
import NavMenu from "./Menu/NavMenu";
import Sidebar from "./Menu/Sidebar";
import HeaderOffcanvas from "./Menu/HeaderOffcanvas";
import { AppContext } from "@/hooks/AppContext";
import logo_1 from "@/assets/img/logo/logo.png";
import "../../styles/headerone.scss";
import WalletLoginModal from "@/modals/WalletLoginModal";

const HeaderOne = () => {
	const { sticky } = UseSticky();
	const [isActive, setIsActive] = useState<boolean>(false);
	const [offCanvas, setOffCanvas] = useState<boolean>(false);
	const { globalData, setGlobalData } = useContext(AppContext);
	const [address, setAddress] = useState("");
	const [isOpenLoginModal, setIsOpenLoginModal] = useState(false);
	const [isClient, setIsClient] = useState(false);

	useEffect(() => {
        setIsClient(true);
    }, []);

	const handleInputChange = (e: any) => {
		setAddress(e.target.value);
	};

	const handleKeyPress = async (e: any) => {
		if (e.key == "Enter") {
			await fetchWallet(address);
		}
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

			if (data) {
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

				// localStorage.setItem("globalData", JSON.stringify(globalData));
			}
		} catch (err) {
			console.log(err);
		}
	};

	const setDisableMyAccount = () => {
		setGlobalData((prevData: any) => ({
			...prevData,
			accountIdFromLogin: ""
		}));
	}

	return (
		<>
			<header id="header" className="header-layout1">
				<div
					id="sticky-header"
					className={`menu-area transparent-header ${
						sticky ? "sticky-menu" : ""
					}`}
					style={{
						boxShadow:
							"rgba(153, 87, 171, 0.16) 0px 8px 14px,	rgba(153, 87, 171, 0.23) 0px 8px 14px",
					}}
				>
					<div className="container custom-container">
						<div className="row">
							<div className="col-12">
								<div className="menu-wrap">
									<nav className="menu-nav">
										<div className="logo">
											<Link href="/">
												<Image src={logo_1} alt="Logo" />
											</Link>
										</div>
										<div className="navbar-wrap main-menu d-none d-lg-flex">
											<NavMenu />
										</div>
										<div className="header-action">
											<ul className="list-wrap">
												<li>
													<input
														className="search-input"
														value={address}
														onChange={handleInputChange}
														onKeyDown={handleKeyPress}
														type="text"
														placeholder="Search Address, ENS or Txn"
													/>
												</li>
												<li className="header-login">
													{isClient && (
														!globalData.accountIdFromLogin ? (
															<Link href={""} className="btn2" onClick={() => setIsOpenLoginModal(true)}>
																LOGIN
															</Link>
														) : (
															<Link href={""} className="btn2" onClick={() => setDisableMyAccount()}>
																LOGOUT
															</Link>
														)
													)}												
												</li>
											</ul>
										</div>
										<div
											onClick={() => setIsActive(true)}
											className="mobile-nav-toggler"
										>
											<i className="fas fa-bars"></i>
										</div>
									</nav>
								</div>
							</div>
						</div>
					</div>
				</div>
			</header>
			<Sidebar style={false} isActive={isActive} setIsActive={setIsActive} />
			<HeaderOffcanvas offCanvas={offCanvas} setOffCanvas={setOffCanvas} />
			<WalletLoginModal modalIsOpen={isOpenLoginModal} closeModal={() => setIsOpenLoginModal(false)} />
		</>
	);
};

export default HeaderOne;
