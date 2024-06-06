import { NextResponse, NextRequest } from "next/server";
import * as utilities from "../utilities";
import moment from "moment";

// To handle a GET request to /api
export async function GET(request: NextRequest) {
	const urls = [
		`${process.env.MORALIS_URL}/market-data/global/market-cap`,
		`${process.env.MORALIS_URL}/market-data/global/volume`,
		`${process.env.MORALIS_URL}/market-data/erc20s/top-tokens`,
		`${process.env.MORALIS_URL}/market-data/nfts/top-collections`,
		`${process.env.MORALIS_URL}/market-data/nfts/hottest-collections`,
	];

	const fetchPromises = urls.map((url: any) =>
		fetch(url, {
			method: "GET",
			headers: {
				Accept: "application/json",
				"X-API-Key": `${process.env.MORALIS_API_KEY}`,
			},
		}).then((response) => response.json())
	);

	const [market_cap, trading_volume, top_tokens, nft_market_cap, nft_volume] =
		await Promise.all(fetchPromises);

	return NextResponse.json(
		{
			market_cap,
			trading_volume,
			top_tokens,
			nft_market_cap,
			nft_volume,
		},
		{ status: 200 }
	);
}
