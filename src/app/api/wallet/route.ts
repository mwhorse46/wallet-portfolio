import { NextResponse, NextRequest } from "next/server";
import * as utilities from "../utilities";
import moment from "moment";
import { ethers } from "ethers";

interface BodyJson {
	walletAddress: string;
	chain: string;
}

interface ChainItem {
	chain: string;
	networth_usd: string | number; // Adjust the type based on the expected value (string or number)
}

// Define an interface for the networth object
interface Networth {
	chains: ChainItem[];
	total_networth_usd: number;
}

// To handle a GET request to /api
export async function GET(request: NextRequest) {
	// Do whatever you want
	return NextResponse.json({ message: "Hello World" }, { status: 200 });
}

// To handle a POST request to /api
export async function POST(request: NextRequest) {
	// Do whatever you want
	let bodyText = await request.text();
	let body: BodyJson = JSON.parse(bodyText);
	let address = body.walletAddress;
	let chain = body.chain;
	let ens;
	let unstoppable;

	if (!address) {
		throw new Error("Missing wallet address.");
	}

	let promises = [];
	let isENSAddress = address.indexOf(".eth") > -1;
	if (isENSAddress) {
		promises.push(
			fetch(`${process.env.MORALIS_URL}/resolve/ens/${address}`, {
				method: "GET",
				headers: {
					Accept: "application/json",
					"X-API-Key": `${process.env.MORALIS_API_KEY}`,
				},
			})
		);
	} else {
		promises.push(
			fetch(`${process.env.MORALIS_URL}/resolve/${address}/reverse`, {
				method: "GET",
				headers: {
					Accept: "application/json",
					"X-API-Key": `${process.env.MORALIS_API_KEY}`,
				},
			})
		);
	}

	promises.push(
		fetch(`${process.env.MORALIS_URL}/resolve/${address}/domain`, {
			method: "GET",
			headers: {
				Accept: "application/json",
				"X-API-Key": `${process.env.MORALIS_API_KEY}`,
			},
		})
	);

	const [ensOrReverseResponse, udResponse] = await Promise.all(promises);

	if (isENSAddress) {
		let domain = await ensOrReverseResponse.json();
		address = domain.address;
		ens = body.walletAddress;
	} else {
		let ens_domain = await ensOrReverseResponse.json();
		ens = ens_domain.address;
	}

	let ud_domain = await udResponse.json();
	unstoppable = ud_domain.name;

	// Fetching wallet chains and balance in parallel
	const queryString = utilities.chains
		.map((chain) => `chains=${chain.chain}`)
		.join("&");

	const walletTokensPromise = fetch(
		`${process.env.MORALIS_URL}/wallets/${address}/tokens?$exclude_spam=true&exclude_unverified_contracts=true`,
		{
			method: "GET",
			headers: {
				Accept: "application/json",
				"X-API-Key": `${process.env.MORALIS_API_KEY}`,
			},
		}
	);
	const walletChainsPromise = fetch(
		`${process.env.MORALIS_URL}/wallets/${address}/chains?${queryString}`,
		{
			method: "GET",
			headers: {
				Accept: "application/json",
				"X-API-Key": `${process.env.MORALIS_API_KEY}`,
			},
		}
	);

	const balancePromise = fetch(
		`${process.env.MORALIS_URL}/${address}/balance?chain=${chain}`,
		{
			method: "get",
			headers: {
				accept: "application/json",
				"X-API-Key": `${process.env.MORALIS_API_KEY}`,
			},
		}
	);

	const [response, get_balance, getTokens] = await Promise.all([
		walletChainsPromise,
		balancePromise,
		walletTokensPromise,
	]);

	if (!response.ok) {
		throw new Error(`Error fetching chains: ${response.statusText}`);
	}
	const active_chains = await response.json();
	const balance = await get_balance.json();
	const walletTokens = await getTokens.json();

	const activeChains = active_chains.active_chains
		.map((chain: any) => `chains=${chain.chain}`)
		.join("&");
	const fetch_networth = await fetch(
		`${process.env.MORALIS_URL}/wallets/${address}/net-worth?${activeChains}&exclude_spam=false&exclude_unverified_contracts=true`,
		{
			method: "get",
			headers: {
				accept: "application/json",
				"X-API-Key": `${`${process.env.MORALIS_API_KEY}`}`,
			},
		}
	);

	if (!fetch_networth.ok) {
		console.log(`Error fetching net-worth: ${fetch_networth.statusText}`);
	}

	let networth: Networth = await fetch_networth.json();

	let networthDataLabels: string[] = [];
	let networthDatasets: Number[] = [];

	if (networth.chains && networth.chains.length > 0) {
		networth.chains.forEach(function (item: any) {
			networthDataLabels.push(item.chain);
			networthDatasets.push(Number(item.networth_usd));
		});
	}

	let isWhale = false;
	let earlyAdopter = false;
	let multiChainer = false;
	let speculator = false;
	let isFresh = false;

	if (
		ethers.formatEther(balance.balance) >
		ethers.formatEther(`100000000000000000000`)
	)
		isWhale = true;

	let wallet_chains = [];
	let earlyAdopterDate = new Date("2016-01-01");

	for (const chain of active_chains.active_chains) {
		if (chain.first_transaction) {
			wallet_chains.push(chain);

			if (chain.first_transaction) {
				if (
					new Date(chain.first_transaction.block_timestamp) < earlyAdopterDate
				)
					earlyAdopter = true;
			}
		}
	}

	const one_day_ago = moment().subtract(1, "days");
	let firstSeenDate = utilities.findEarliestAndLatestTimestamps(
		active_chains.active_chains
	).earliest;
	let lastSeenDate = utilities.findEarliestAndLatestTimestamps(
		active_chains.active_chains
	).latest;

	wallet_chains.forEach((item) => {
		item.label = utilities.getChainName(item.chain);
		if (
			item.first_transaction.block_timestamp &&
			firstSeenDate &&
			new Date(item.first_transaction.block_timestamp) < new Date(firstSeenDate)
		) {
			firstSeenDate = item.first_transaction.block_timestamp;
		}
		if (
			item.first_transaction.block_timestamp &&
			lastSeenDate &&
			new Date(item.last_transaction.block_timestamp) > new Date(lastSeenDate)
		) {
			lastSeenDate = item.last_transaction.block_timestamp;
		}
	});

	let walletAge = utilities.calcAge(firstSeenDate);
	const currentDate = new Date();
	if (
		firstSeenDate &&
		new Date(firstSeenDate) >
			new Date(currentDate.getTime() - 24 * 60 * 60 * 1000)
	)
		isFresh = true;

	if (wallet_chains.length > 1) multiChainer = true;

	return NextResponse.json(
		{
			address,
			networth: networth.total_networth_usd,
			networthDataLabels,
			networthDatasets,
			active_chains: wallet_chains,
			walletAge,
			firstSeenDate,
			lastSeenDate,
			ens,
			unstoppable,
			isWhale,
			earlyAdopter,
			multiChainer,
			speculator,
			balance: balance.balance,
			moment,
			isFresh,
			walletTokens,
		},
		{ status: 200 }
	);
}
