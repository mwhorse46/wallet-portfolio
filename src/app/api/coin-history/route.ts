import { NextRequest, NextResponse } from "next/server";

// To handle a GET request to /api
export async function GET(request: NextRequest) {
	const { searchParams } = new URL(request.url);
	const coinId = searchParams.get("coinId");
	const fetch_networth = await fetch(
		`${process.env.COINGECO_URL}/coins/${coinId}/market_chart?vs_currency=usd&days=2`,
		{
			method: "get",
			headers: {
				accept: "application/json",
				"x-cg-pro-api-key": `${`${process.env.COINGECKO_API_KEY}`}`,
			},
		}
	);

	if (!fetch_networth.ok) {
		console.log(`Error fetching net-worth: ${fetch_networth.statusText}`);
	}

	let coinHistory = await fetch_networth.json();

	return NextResponse.json(
		{
			coinHistory
		},
		{ status: 200 }
	);
}
