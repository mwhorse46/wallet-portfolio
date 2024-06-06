import { NextResponse, NextRequest } from "next/server";
import * as utilities from "../utilities";
import moment from "moment";

// To handle a GET request to /api
export async function GET(request: NextRequest) {
	const urls = [
		`${process.env.COINGECO_URL}/coins/markets?vs_currency=usd`,
		`${process.env.COINGECO_URL}/coins/categories`,
	];

	const fetchPromises = urls.map((url: any) =>
		fetch(url, {
			method: "GET",
			headers: {
				Accept: "application/json",
				"x-cg-pro-api-key": `${process.env.COINGECKO_API_KEY}`,
			},
		}).then((response) => response.json())
	);

	const [priceMarketData, categoryData] =
		await Promise.all(fetchPromises);

	return NextResponse.json(
		{
			priceMarketData,
			categoryData
		},
		{ status: 200 }
	);
}
