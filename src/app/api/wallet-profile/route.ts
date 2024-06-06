import { NextResponse, NextRequest } from "next/server";
import * as utilities from "../utilities";
import moment from "moment";

export async function GET(request: NextRequest) {
	// Do whatever you want

	const { searchParams } = new URL(request.url);
	const address = searchParams.get("wallet");
	const chain = searchParams.get("chain");

	const statsPromise = fetch(
		`${process.env.MORALIS_URL}/wallets/${address}/stats?chain=${chain}`,
		{
			method: "get",
			headers: {
				accept: "application/json",
				"X-API-Key": `${process.env.MORALIS_API_KEY}`,
			},
		}
	);

	const tokensPromise = fetch(
		`${process.env.MORALIS_URL}/wallets/${address}/tokens?exclude_spam=true&exclude_unverified_contracts=true&chain=${chain}`,
		{
			method: "GET",
			headers: {
				Accept: "application/json",
				"X-API-Key": `${process.env.MORALIS_API_KEY}`,
			},
		}
	);

	// Initialize chart data for the last 90 days
	let chart_data: any = [];
	// Start from today
	let currentDate = new Date();

	for (let i = 0; i < 90; i++) {
		let formattedDate = currentDate.toISOString().split("T")[0];
		chart_data.push({ x: formattedDate, y: 0 });

		// Subtract a day for the next iteration
		currentDate.setDate(currentDate.getDate() - 1);
	}

	const days = moment().subtract(90, "days").format("YYYY-MM-DD");
	let cursor = null;
	let all_txs = [];

	do {
		const response: any = await fetch(
			`${process.env.MORALIS_URL}/${address}?${
				cursor ? `cursor=${cursor}&` : ""
			}` +
				new URLSearchParams({
					from_date: days,
					...(chain ? { chain } : {}),
				}),
			{
				method: "get",
				headers: {
					accept: "application/json",
					"X-API-Key": `${process.env.MORALIS_API_KEY}`,
				},
			}
		);

		const txs = await response.json();
		cursor = txs.cursor;

		if (txs.result) {
			for (let item of txs.result) {
				all_txs.push(item);
			}
		}
	} while (cursor !== "" && cursor !== null);

	// Process transaction data for chart
	if (all_txs.length > 0) {
		all_txs.forEach(function (data) {
			let blockDate = data.block_timestamp.split("T")[0];
			// Find the corresponding date in the chartArray
			let chartItem = chart_data.find((item: any) => item.x === blockDate);

			if (chartItem) {
				chartItem.y += 1;
			}
		});
	}

	let chartArray = utilities.generateWeekArray(9);

	utilities.updateChartArrayByWeek(chartArray, all_txs);
	chartArray = chartArray.reverse();

	// Resolve promises for wallet stats, tokens, and net worth
	const [statsResponse, tokensResponse] = await Promise.all([
		statsPromise,
		tokensPromise,
	]);
	const stats = await statsResponse.json();
	const tokens = await tokensResponse.json();

	let collector = false;
	if (Number(stats.nfts) > 20) {
		collector = true;
	}

	return NextResponse.json(
		{
			addressOccurrences: utilities.findAddressOccurrences(all_txs, address),
			chartArray,
			stats,
			tokens: tokens.result,
			collector,
		},
		{ status: 200 }
	);
}
