import Image from "next/image";
import Link from "next/link";
import ItemsGrid from "../components/ItemsGrid";
import VideoHero from "@/components/vibe/VideoHero";
import { one } from "@/lib/quality-media";
import ChartersCtaAndFaq from "./ChartersCtaAndFaq";

// Hero du hub (client 2026-09-29) : meme video et memes 2 CTA que le hero
// Caribbean (caribbean-v15), titre « Charters ».
const heroVideo = one({ cat: "aerial", kind: "video", role: "hero-bg", orientation: "portrait" });
const BTN_PRIMARY =
	"inline-flex min-h-[48px] max-w-full items-center justify-center text-center rounded-full border border-[#C0C0C0] bg-[#26272a] px-8 py-3.5 text-[13px] font-semibold uppercase tracking-[0.18em] text-[#c2622a] shadow-[0_0_18px_rgba(192,192,192,0.35)] transition-[border-color,box-shadow] duration-300 hover:border-[#c2622a] hover:shadow-[0_0_24px_rgba(194,98,42,0.45)] focus:outline-none focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#c2622a]";
const BTN_SECONDARY =
	"inline-flex min-h-[48px] items-center justify-center rounded-full border border-[#C0C0C0] bg-[#26272a]/40 backdrop-blur-sm px-8 py-3.5 text-[11px] font-semibold uppercase tracking-[0.2em] text-[#C0C0C0] transition-colors duration-300 hover:border-[#c2622a] hover:text-[#c2622a] focus:outline-none focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#c2622a]";

const charterItems = [
	{
		title: "Last-Minute Charter",
		description: "Take advantage of exceptional offers for immediate departures.",
		image: "/images/charters/last-minute.png",
		href: "/charters/last-minute",
	},
	// Carte Day Charter ajoutee au hub (client 2026-09-29).
	{
		title: "Day Charter",
		description: "A private yacht for the day, from morning swim to sunset return.",
		image: "/media/client/lydie/2026-09-13/day-charter/hero-day-charter-poster.jpg",
		href: "/charters/day-charter",
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
		title: "Tailored Halal Private Charter",
		description: "A fully halal charter shaped around your family, your faith, and the way you like to travel.",
		image: "/images/halal/vecteezy_woman-in-hijab-gazes-thoughtfully-at-the-ocean-while_69947790.jpg",
		href: "/charters/halal",
	},
	{
		title: "Group Yacht Charter",
		description: "Ideal for events, seminars, or group cruises.",
		image: "/images/new/photo-1722009040906-0fc91b7e2942.jpeg",
		href: "/charters/group",
	},
	{
		title: "Only Couple Charter",
		description: "Intimate and romantic cruises exclusively for couples.",
		image: "/images/management/only_couple.jpeg",
		href: "/charters/only-couple",
	},
];

export default function CharterPage() {
	return (
		<ItemsGrid
			title="Charters"
			bgImage="/images/services-bg.png"
			items={charterItems}
			heroNode={
				<VideoHero
					key="charters-hero"
					videoLandscape={heroVideo?.src}
					posterLandscape={heroVideo?.poster}
					videoPortrait={heroVideo?.src}
					posterPortrait={heroVideo?.poster}
					title="Charters"
					align="bottom"
				>
					<div className="flex flex-col sm:flex-row items-center justify-center gap-4">
						<Link href="/request-quote" className={BTN_PRIMARY}>Design Your Charter</Link>
						<Link href="/contact" className={BTN_SECONDARY}>Contact a Broker</Link>
					</div>
				</VideoHero>
			}
			afterNode={<ChartersCtaAndFaq key="charters-cta-faq" />}
		/>
	);
}
