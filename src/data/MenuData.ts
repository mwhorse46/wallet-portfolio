interface MenuItem {
	id: number;
	page: string;
	title: string;
	link: string;
	has_dropdown: boolean;
	sub_menus?: {
		link: string;
		title: string;
	}[];
}
[];

const menu_data: MenuItem[] = [
	{
		id: 1,
		page: "nav_1",
		has_dropdown: true,
		title: "Dashboard",
		link: "/",
	},
	{
		id: 2,
		page: "nav_1",
		has_dropdown: false,
		title: "Portfolio",
		link: "/portfolio",
	},
	{
		id: 3,
		page: "nav_1",
		has_dropdown: false,
		title: "Cryptocurrencies",
		link: "/cryptocurrencies",
	},
	{
		id: 4,
		page: "nav_1",
		has_dropdown: true,
		title: "News",
		link: "/news",
	},
	{
		id: 5,
		page: "nav_1",
		has_dropdown: true,
		title: "Learn",
		link: "/learn",
	},
	{
		id: 6,
		page: "nav_1",
		has_dropdown: true,
		title: "Buy Crypto",
		link: "/buy-crypto",
	},
];
export default menu_data;
