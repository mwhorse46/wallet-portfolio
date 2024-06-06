import { NextResponse, NextRequest } from "next/server";
import * as utilities from "../utilities";
import moment from "moment";

// To handle a GET request to /api
export async function GET(request: NextRequest) {
	const urls = [`${process.env.MORALIS_URL}/market-data/erc20s/top-movers`];

	const fetchPromises = urls.map((url) =>
		fetch(url, {
			method: "GET",
			headers: {
				Accept: "application/json",
				"X-API-Key": `${process.env.MORALIS_API_KEY}`,
			},
		}).then((response) => response.json())
	);

	const [top_movers] = await Promise.all(fetchPromises);

	return NextResponse.json(
		{
			top_movers,
		},
		{ status: 200 }
	);
}
