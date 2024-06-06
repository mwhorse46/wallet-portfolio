"use client";
import React, { useState, useContext, useEffect } from "react";
import { AppContext } from "@/hooks/AppContext";

import "../../styles/analytics.scss";

const AnalyticsEl = () => {
	const { globalData, setGlobalData } = useContext(AppContext);

	useEffect(() => {
		console.log("analytics page", globalData);
	});

	return (
		<div className="container analytics-area">
			<h3> Analytics Page </h3>
		</div>
	);
};
export default AnalyticsEl;
