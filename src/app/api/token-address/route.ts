import { NextResponse, NextRequest } from "next/server";

export async function GET(request: NextRequest) {
	// Do whatever you want
	const { searchParams } = new URL(request.url);
	const tokenAddress = searchParams.get("tokenAddress");
	const ownersPromise = fetch(
		`${process.env.MORALIS_URL}/erc20/${tokenAddress}/owners?limit=50`,
		{
			method: "GET",
			headers: {
				Accept: "application/json",
				"X-API-Key": `${process.env.MORALIS_API_KEY}`,
			},
		}
	);

	const [ownersResponse] = await Promise.all([ownersPromise]);

	if (!ownersResponse.ok) {
		const message = await ownersResponse.json();
		return NextResponse.json({ message: message }, { status: 500 });
	}

	const tokenOwners = await ownersResponse.json();

	let topTenHolders = [];
	if (tokenOwners && tokenOwners.result && tokenOwners.result.length > 0) {
		topTenHolders = tokenOwners.result.slice(0, 10);
	}

	let totalBalance = topTenHolders.reduce(
		(acc: any, holder: any) => acc + Number(holder.balance_formatted),
		0
	);
	let totalUsd = topTenHolders.reduce(
		(acc: any, holder: any) => acc + Number(holder.usd_value),
		0
	);
	let totalPercentage = topTenHolders.reduce(
		(acc: any, holder: any) => acc + holder.percentage_relative_to_total_supply,
		0
	);

	const results = await Promise.all(
		topTenHolders.map((owner: any) => fetchDataForOwner(owner))
	);

	let tokenOccurrences = results.reduce((acc, holder) => {
		holder.balanceData.forEach((token: any) => {
			const address = token.token_address;
			if (!acc[address]) {
				acc[address] = { count: 0, tokenDetails: token };
			}
			acc[address].count += 1;
		});
		return acc;
	}, {});

	// Filtering tokens held by at least three holders
	let commonTokens = Object.values(tokenOccurrences)
		.filter((item: any) => item.count >= 3)
		.map((item) => {
			// Extracting necessary token details
			return item;
		});

	return NextResponse.json(
		{
			tokenOwners: tokenOwners.result,
			topTokenOwners: results,
			totalBalance,
			totalUsd,
			totalPercentage,
			commonTokens,
		},
		{ status: 200 }
	);
}

async function fetchDataForOwner(owner: any) {
	let balanceData: any[] = [];
	let networthData = 0;

	if (owner.owner_address.indexOf("0x00000000000000000000000000000") > -1) {
		return { owner, balanceData, networthData };
	}

	try {
		const balanceResponse = await fetch(
			`${process.env.MORALIS_URL}/wallets/${owner.owner_address}/tokens?exclude_spam=true&exclude_unverified_contracts=true&limit=11`,
			{
				method: "GET",
				headers: {
					Accept: "application/json",
					"X-API-Key": `${process.env.MORALIS_API_KEY}`,
				},
			}
		);

		if (balanceResponse.ok) {
			let balances = await balanceResponse.json();
			balanceData = balances.result.filter(
				(item: any) =>
					item.token_address !== "0xEeeeeEeeeEeEeeEeEeEeeEEEeeeeEeeeeeeeEEeE"
			);
		} else {
			console.log(`Failed to fetch balances for owner: ${owner.owner_address}`);
			console.log(balanceResponse.statusText);
			const message = await balanceResponse.json();
			balanceData = [];
		}
	} catch (error) {
		console.error(
			`Error fetching balances for owner: ${owner.owner_address}`,
			error
		);
	}

	try {
		const networthResponse = await fetch(
			`${process.env.MORALIS_URL}/wallets/${owner.owner_address}/net-worth?exclude_spam=true&exclude_unverified_contracts=true`,
			{
				method: "GET",
				headers: {
					Accept: "application/json",
					"X-API-Key": `${process.env.MORALIS_API_KEY}`,
				},
			}
		);

		// Process networthResponse only if OK, otherwise keep networthData as 0
		if (networthResponse.ok) {
			networthData = await networthResponse.json();
		} else {
			console.log(`Failed to fetch networth for owner: ${owner.owner_address}`);
			console.log(networthResponse.statusText);
			networthData = 0;
		}
	} catch (error) {
		console.error(
			`Error fetching networth for owner: ${owner.owner_address}`,
			error
		);
	}

	return { owner, balanceData, networthData };
}
