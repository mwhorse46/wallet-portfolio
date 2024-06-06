import { NextResponse, NextRequest } from "next/server";

export async function GET(request: NextRequest) {
	const { searchParams } = new URL(request.url);
	const address = searchParams.get("wallet");
	const chain = searchParams.get("chain");
	console.log(address);
	console.log(chain);
	const transactionsPromise = fetch(
		`${process.env.MORALIS_URL}/wallets/${address}/history?chain=${chain}&order=DESC`,
		{
			method: "GET",
			headers: {
				Accept: "application/json",
				"X-API-Key": `${process.env.MORALIS_API_KEY}`,
			},
		}
	);

	const [transactionsResponse] = await Promise.all([transactionsPromise]);

	// Check if positionsResponse is ok
	if (!transactionsResponse.ok) {
		const message = await transactionsResponse.json();
		return NextResponse.json({ message }, { status: 500 });
	}

	const transactions = await transactionsResponse.json();
	return NextResponse.json(
		{
			transactions,
		},
		{ status: 200 }
	);
}
