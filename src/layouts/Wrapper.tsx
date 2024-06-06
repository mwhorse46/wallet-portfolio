"use client";
import React, { useEffect, useState } from "react";
import { ToastContainer } from "react-toastify";
import { animationCreate } from "@/utils/utils";
import ScrollToTop from "@/component/common/ScrollToTop";
import { AppProvider } from "@/hooks/AppContext";
import "../styles/wrapper.scss";
if (typeof window !== "undefined") {
	require("bootstrap/dist/js/bootstrap");
}

const Wrapper = ({ children }: any) => {
	useEffect(() => {
		// animation
		const timer = setTimeout(() => {
			animationCreate();
		}, 100);

		return () => clearTimeout(timer);
	}, []);

	return (
		<AppProvider>
			{children}
			<ScrollToTop />
			<ToastContainer position="top-center" />
		</AppProvider>
	);
};

export default Wrapper;
