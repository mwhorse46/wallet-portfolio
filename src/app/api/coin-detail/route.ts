import { NextRequest, NextResponse } from "next/server";

// To handle a GET request to /api
export async function GET(request: NextRequest) {
	const { searchParams } = new URL(request.url);
	const coinId = searchParams.get("coinId");
	console.log({coinId})
	const fetch_networth = await fetch(
		`${process.env.COINGECO_URL}/coins/${coinId}`,
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

	let coinDetail = await fetch_networth.json();

	return NextResponse.json(
		{
			coinDetail
		},
		{ status: 200 }
	);
}
