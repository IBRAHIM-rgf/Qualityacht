import Image from "next/image";
import Link from "next/link";
import ItemsGrid from "../components/ItemsGrid";

const charterItems = [
	{
		title: "Last-Minute Charter",
		description: "Take advantage of exceptional offers for immediate departures.",
		image: "/images/charters/last-minute.png",
		href: "/charters/last-minute",
	},
	{
		title: "Destinations",
		description: "Explore various sunset for an unforgettable cruise experience.",
		image: "/images/charters/destination.png",
		href: "/charters/destinations",
	},
	{
		title: "Pet-Friendly Charter",
		description: "Bring your pets along for an unforgettable cruise.",
		image: "/images/charters/pet-friendly.png",
		href: "/charters/pet-friendly",
	},
	{
		title: "On-Demand Yacht Charter",
		description: "Book a yacht on demand, according to your wishes and availability.",
		image: "/images/charters/on-demande.png",
		href: "/charters/on-demand",
	},
	{
		title: "Accessible Charter Yacht",
		description: "Yachts adapted for everyone, for an inclusive experience.",
		image: "/images/charters/acces.png",
		href: "/charters/accessible",
	},
	{
		title: "Sports Yacht Charter",
		description: "Experience the adrenaline of water sports aboard our yachts.",
		image: "/images/charters/Sport yacht charter.png",
		href: "/charters/sports",
	},
	{
		title: "Helicopter Yacht Charter",
		description: "Combine the luxury of yachting with the exclusivity of a helicopter.",
		image: "/images/charters/helicoptaire.png",
		href: "/charters/helicopter",
	},
	{
		title: "Group Yacht Charter",
		description: "Ideal for events, seminars, or group cruises.",
		image: "/images/new/photo-1722009040906-0fc91b7e2942.jpeg",
		href: "/charters/group",
	},
];

export default function CharterPage() {
	return (
		<ItemsGrid
			title="Charters"
			bgImage="/images/services-bg.png"
			items={charterItems}
		/>
	);
}
