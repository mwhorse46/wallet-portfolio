import React, { createContext, ReactNode, useState, useEffect } from "react";

interface AppProviderProps {
	children: ReactNode;
}

const initialDataCache: any = {
	selectedChain: "eth",
};

const initialContext: any = {
	globalData: {},
	setGlobalData: () => {},
};
export const AppContext = createContext(initialContext);

export const AppProvider: React.FC<AppProviderProps> = ({ children }) => {
	const [globalData, setGlobalData] = useState(() => {
		// Check if window is defined, i.e., code is running in the client-side environment
		if (typeof window !== "undefined") {
			const storedData = localStorage.getItem("globalData");
			return storedData !== null ? JSON.parse(storedData) : initialDataCache;
		}
		// Return initial cache data if on server-side
		return initialDataCache;
	});

	useEffect(() => {
		// Again, run localStorage code only on the client side
		if (typeof window !== "undefined") {
			localStorage.setItem("globalData", JSON.stringify(globalData));
		}
	}, [globalData]);

	return (
		<AppContext.Provider value={{ globalData, setGlobalData }}>
			{children}
		</AppContext.Provider>
	);
};
