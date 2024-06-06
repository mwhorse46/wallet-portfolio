import { NextResponse, NextRequest } from "next/server";

interface BodyJson {
	walletAddress: string;
	chain: string;
}

// To handle a GET request to /api
export async function GET(request: NextRequest) {
	const { searchParams } = new URL(request.url);
	const address = searchParams.get("wallet");
	const chain = searchParams.get("chain");

	// Define both fetch requests as promises
	const protocolsPromise = fetch(
		`${process.env.MORALIS_URL}/wallets/${address}/defi/summary?chain=${chain}`,
		{
			method: "GET",
			headers: {
				Accept: "application/json",
				"X-API-Key": `${process.env.MORALIS_API_KEY}`,
			},
		}
	);

	const positionsPromise = fetch(
		`${process.env.MORALIS_URL}/wallets/${address}/defi/positions?chain=${chain}`,
		{
			method: "GET",
			headers: {
				Accept: "application/json",
				"X-API-Key": `${process.env.MORALIS_API_KEY}`,
			},
		}
	);

	// Use Promise.all to wait for all promises to resolve
	const [protocolsResponse, positionsResponse] = await Promise.all([
		protocolsPromise,
		positionsPromise,
	]);

	// Check if positionsResponse is ok
	if (!positionsResponse.ok) {
		const message = await positionsResponse.json();
		return NextResponse.json({ message }, { status: 500 });
	}

	const protocolSummary = await protocolsResponse.json();
	const defiPositions = await positionsResponse.json();

	let uniswapRewards = 0;
	let uniswapValue = 0;
	let totalUsdValue = 0; // Ensure this is defined if you're using it

	if (
		protocolSummary &&
		protocolSummary.protocols &&
		protocolSummary.protocols.length > 0
	) {
		for (const protocol of protocolSummary.protocols) {
			if (protocol.protocol_name === "uniswap-v3") {
				uniswapRewards = protocol.unclaimed_total_value_usd;
				uniswapValue = protocol.total_value_usd;
				totalUsdValue += protocol.total_value_usd;
			}
		}
	}

	return NextResponse.json(
		{
			protocols: protocolSummary,
			uniswapRewards,
			uniswapValue,
			defiPositions,
		},
		{ status: 200 }
	);
}
