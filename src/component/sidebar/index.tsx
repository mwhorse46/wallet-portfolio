"use client";
import React from "react";
import Link from "next/link";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
	faWhiskeyGlass,
	faChartSimple,
	faRightLeft,
	faCoins,
	faWallet,
	faGear,
} from "@fortawesome/free-solid-svg-icons";
import { usePathname } from "next/navigation";
import "../../styles/sidebar.scss";

const Sidebar = () => {
	const currentRoute = usePathname();

	const isMenuItemActive = (menuLink: string) => {
		return currentRoute === menuLink;
	};

	return (
		<div className="sidebar">
			<Link
				href="/portfolio"
				className={`section-link ${
					isMenuItemActive("/portfolio") ? "active" : ""
				}`}
			>
				<FontAwesomeIcon icon={faWhiskeyGlass} />
				Assets
			</Link>
			<Link
				href="/analytics"
				className={`section-link ${
					isMenuItemActive("/analytics") ? "active" : ""
				}`}
			>
				<FontAwesomeIcon icon={faChartSimple} />
				Analytics
			</Link>
			<Link
				href="/swap"
				className={`section-link ${isMenuItemActive("/swap") ? "active" : ""}`}
			>
				<FontAwesomeIcon icon={faRightLeft} />
				Swap
			</Link>
			<Link
				href="/defi"
				className={`section-link ${isMenuItemActive("/defi") ? "active" : ""}`}
			>
				<FontAwesomeIcon icon={faCoins} />
				De-fi
			</Link>
			<Link
				href="/transactions"
				className={`section-link ${
					isMenuItemActive("/transactions") ? "active" : ""
				}`}
			>
				<FontAwesomeIcon icon={faWallet} />
				Transactions
			</Link>
			<Link
				href="/settings"
				className={`section-link ${
					isMenuItemActive("/settings") ? "active" : ""
				}`}
			>
				<FontAwesomeIcon icon={faGear} />
				Settings
			</Link>
			{/* Add other links here */}
		</div>
	);
};

export default Sidebar;
