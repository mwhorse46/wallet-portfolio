import { NextResponse, NextRequest } from "next/server";

interface BodyJson {
	address: string;
}

export async function POST(request: NextRequest) {
	let bodyText = await request.text();
	let body: BodyJson = JSON.parse(bodyText);
	let address = body.address;
	console.log(address);

	const get_metadata = await fetch(
		`${process.env.MORALIS_URL}/erc20/metadata?addresses=${address}`,
		{
			method: "GET",
			headers: {
				Accept: "application/json",
				"X-API-Key": `${process.env.MORALIS_API_KEY}`,
			},
		}
	);

	if (!get_metadata.ok) {
		console.log(get_metadata.statusText);
		const message = await get_metadata.json();
		throw new Error(message);
	}

	let tokenMetadata = await get_metadata.json();

	const pricePromise = fetch(
		`${process.env.MORALIS_URL}/erc20/${address}/price?include=percent_change`,
		{
			method: "GET",
			headers: {
				Accept: "application/json",
				"X-API-Key": `${process.env.MORALIS_API_KEY}`,
			},
		}
	);

	const blockPromise = fetch(
		`${process.env.MORALIS_URL}/block/${tokenMetadata[0].block_number}`,
		{
			method: "GET",
			headers: {
				Accept: "application/json",
				"X-API-Key": `${process.env.MORALIS_API_KEY}`,
			},
		}
	);

	const [priceResponse, blockResponse] = await Promise.all([
		pricePromise,
		blockPromise,
	]);

	if (!blockResponse.ok) {
		const message = await blockResponse.json();
		console.log(blockResponse.statusText);
		return NextResponse.json({ message: message }, { status: 500 });
	}

	// const tokenOwners = await ownersResponse.json();
	const tokenPrice = await priceResponse.json();
	const blockCreated = await blockResponse.json();

	if (tokenMetadata[0].total_supply_formatted) {
		if (tokenPrice.usdPrice) {
			tokenMetadata[0].fdv =
				Number(tokenMetadata[0].total_supply_formatted) *
				Number(tokenPrice.usdPrice);
			tokenMetadata[0].fdv = Number(tokenMetadata[0].fdv).toLocaleString(
				undefined,
				{ minimumFractionDigits: 0, maximumFractionDigits: 0 }
			);
		}

		tokenMetadata[0].total_supply_formatted = Number(
			tokenMetadata[0].total_supply_formatted
		).toLocaleString(undefined, {
			minimumFractionDigits: 0,
			maximumFractionDigits: 0,
		});
	}

	if (!tokenPrice.usdPrice) {
		tokenPrice.usdPrice = 0;
		tokenPrice.usdPriceFormatted = "0";
		tokenPrice["24hrPercentChange"] = "0";
	}

	return NextResponse.json(
		{ address, tokenMetadata: tokenMetadata[0], tokenPrice, blockCreated },
		{ status: 200 }
	);
}
