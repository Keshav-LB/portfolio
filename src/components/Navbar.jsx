import { cn } from "@/lib/utils";
import { Menu, X } from "lucide-react";
import { useEffect, useState, useRef } from "react";
import { ThemeToggle } from "@/components/ThemeToggle"; // Import ThemeToggle

const navItems = [
	{ name: "Home", href: "#hero" },
	{ name: "About", href: "#about" },
	{ name: "Skills", href: "#skills" },
	{ name: "Projects", href: "#projects" },
	{ name: "Contact", href: "#contact" },
];

export const Navbar = () => {
	const [isScrolled, setIsScrolled] = useState(false);
	const [isMenuOpen, setIsMenuOpen] = useState(false);
	const [showNavbar, setShowNavbar] = useState(true);

	const lastScrollY = useRef(window.scrollY);
	const scrollTimeout = useRef(null);

	useEffect(() => {
		const handleScroll = () => {
			const currentScrollY = window.scrollY;
			setIsScrolled(currentScrollY > 10);

			// Agar menu open hai toh navbar ko hide/show na karein
			if (isMenuOpen) return;

			// Scroll direction detect karo
			if (currentScrollY > lastScrollY.current) {
				// Scroll down
				setShowNavbar(false);
			} else {
				// Scroll up
				setShowNavbar(true);
			}
			lastScrollY.current = currentScrollY;

			// 1000ms inactivity par navbar show ho
			if (scrollTimeout.current) clearTimeout(scrollTimeout.current);
			scrollTimeout.current = setTimeout(() => {
				setShowNavbar(true);
			}, 1000);
		};

		window.addEventListener("scroll", handleScroll, { passive: true });
		return () => {
			window.removeEventListener("scroll", handleScroll);
			if (scrollTimeout.current) clearTimeout(scrollTimeout.current);
		};
	}, [isMenuOpen]);

	// Jab menu open ho toh navbar hamesha dikhe
	useEffect(() => {
		if (isMenuOpen) setShowNavbar(true);
	}, [isMenuOpen]);

	return (
		<>
			<nav
				className={cn(
					"fixed w-full z-50 transition-all duration-300",
					isScrolled
						? "py-3 bg-background/80 backdrop-blur-md shadow-xs"
						: "py-5",
					showNavbar ? "translate-y-0" : "-translate-y-full",
					"transform"
				)}
			>
				<div className="container flex items-center justify-between">
					<a
						className="text-xl font-bold text-primary flex items-center"
						href="#hero"
					>
						<span className="relative z-10">
							<span className="text-glow text-foreground"> </span> KeshavMishra
						</span>
					</a>

					{/* desktop nav */}
					<div className="hidden md:flex space-x-8 items-center">
						{navItems.map((item, key) => (
							<a
								key={key}
								href={item.href}
								className="text-foreground/80 hover:text-primary transition-colors duration-300"
							>
								{item.name}
							</a>
						))}
						<div className="ml-4">
							<ThemeToggle />
						</div>
					</div>

					{/* mobile nav */}
					<div className="flex md:hidden items-center space-x-2">
						<ThemeToggle />
						<button
							onClick={() => setIsMenuOpen((prev) => !prev)}
							className="p-2 text-foreground z-50"
							aria-label={isMenuOpen ? "Close Menu" : "Open Menu"}
						>
							{isMenuOpen ? <X size={24} /> : <Menu size={24} />}{" "}
						</button>
					</div>
				</div>
			</nav>

			{/* Mobile Menu Overlay OUTSIDE nav/container */}
			<div
				className={cn(
					"fixed inset-0 bg-background/70 backdrop-blur-[7px] z-40 flex flex-col items-center justify-center",
					"transition-all duration-300 md:hidden",
					isMenuOpen
						? "opacity-100 pointer-events-auto"
						: "opacity-0 pointer-events-none"
				)}
			>
				<div className="flex flex-col items-center justify-center space-y-8 text-xl">
					{navItems.map((item, key) => (
						<a
							key={key}
							href={item.href}
							className="text-foreground/80 hover:text-primary transition-colors duration-300"
							onClick={() => setIsMenuOpen(false)}
						>
							{item.name}
						</a>
					))}
				</div>
			</div>
		</>
	);
};