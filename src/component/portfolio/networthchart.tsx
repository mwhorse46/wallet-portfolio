import React, { useRef, useEffect } from "react";
import Chart, { ChartConfiguration } from "chart.js/auto";

interface ChartData {
	labels: string[];
	data: number[];
}
function NetworthChart({ chartArray }: any) {
	const chartRef = useRef<HTMLCanvasElement>(null);
	const chartInstance = useRef<Chart<"doughnut"> | null>(null);

	useEffect(() => {
		if (chartInstance.current) {
			chartInstance.current.destroy();
			chartInstance.current = null; // Set to null for good measure
		}

		// Ensure the chartRef is available
		if (chartRef && chartRef.current) {
			const ctx = chartRef.current.getContext("2d");

			const options = {
				plugins: {
					legend: {
						display: false,
					},
				},
			};

			const data = {
				labels: chartArray.labels,
				datasets: [
					{
						label: "Chain Networth: $",
						data: chartArray.data,
						backgroundColor: [
							"#0D6EFD",
							"#0BC18D",
							"#7A3FE4",
							"#F2C537",
							"#FF13B4",
							"#E84141",
							"#F6931A",
							"#009393",
							"#FFA500",
						],
						borderWidth: 0,
						hoverOffset: 4,
					},
				],
			};

			const chartConfig: ChartConfiguration<"doughnut"> = {
				type: "doughnut",
				data,
				options,
			};
			// Create a new Chart instance and store in the ref
			if (ctx) {
				chartInstance.current = new Chart(ctx, chartConfig as any);
			}
		}

		// Cleanup: destroy the chart instance on component unmount
		return () => {
			if (chartInstance.current) {
				chartInstance.current.destroy();
			}
		};
	}, [chartArray]);

	return <canvas ref={chartRef} width="200" height="100"></canvas>;
}

export default NetworthChart;
