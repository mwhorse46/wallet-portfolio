import HeaderOne from "@/layouts/headers/HeaderOne";
import Breadcrumb from "../common/Breadcrumb";
import FooterOne from "@/layouts/footers/FooterOne";
import SettingsEl from "./settings";
import Sidebar from "../sidebar/index";
const Settings = () => {
	return (
		<main>
			<HeaderOne />
			<Sidebar />
			<SettingsEl />
		</main>
	);
};

export default Settings;
