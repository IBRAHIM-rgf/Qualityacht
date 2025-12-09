import Image from "next/image";
import Link from "next/link";
import ItemsGrid from "../components/ItemsGrid";

const salesItems = [
	{
		title: "Motor Yacht Sales",
		description:
			"Discover our selection of motor yachts for sale, combining power and elegance.",
		image: "/images/Sales/motoryacht.jpg",
		href: "/sales/motor",
	},
	{
		title: "Sailing Yacht Sales",
		description: "Sail with our premium sailing yachts available for sale.",
		image: "/images/Sales/Sailing-Yacht-Sales.jpg",
		href: "/sales/sailing",
	},
	{
		title: "Water Toys & Equipment",
		description:
			"Jetskis, seabobs, tenders, and other water toys to enhance your sea experience.",
		image: "/images/Sales/toy.jpg",
		href: "/sales/toys",
	},
];

export default function SalesPage() {
	return (
		<ItemsGrid
			title="Sales"
			bgImage="/images/services-bg.png"
			items={salesItems}
			imageWrapperClassName="h-[300px] rounded-lg overflow-hidden"
      		imageClassName="clip-path-oval"
		/>
	);
}
