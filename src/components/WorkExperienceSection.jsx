import { useRef, useEffect, useState } from "react";
import { motion, useInView } from "framer-motion";

const experiences = [
	{
		year: "2023-2024",
		title: "Associate Software Engineer",
		company: "Snovaspace Information Systems, India",
		details: [
			"Focused on designing the Career Library and Dashboard Page for personalized learning platforms.",
			"Developed wireframes to outline the structure and functionality of key screens.",
			"Collaborated with developers on sprint planning, debugging, and code implementation.",
			"Assisted in streamlining the CI/CD pipeline, reducing build times and merge conflicts using Git for version control.",
			"Utilized microservices architecture for scalable, flexible application development.",
			"Triaged and resolved incoming issues from project managers and stakeholders, ensuring a smooth workflow.",
		],
	},
	{
		year: "2024-2025",
		title: "Developer",
		company: "Sterling Nationals Financial Group, USA",
		details: [
			"Contributed to the architecture planning of ECAMP 3.0, a mass email campaign tool with inbox warming, SMTP rotation, bounce detection, and analytics capabilities.",
			"Integrated Gmail API using OAuth2 for backend email tracking, inbox reading, and response automation using PHP.",
			"Participated in the design and flow of Sterling Force, a multi-module CRM system handling lifecycle stages like Leads, Opportunities, Accounts, and Clients.",
			"Assisted in UI prototyping and replicating Salesforce Lead structure for internal use.",
		],
	},
	{
		year: "2025-Present",
		title: "Freelance Developer",
		company: "Self-Employed",
		details: [
			"Assisting businesses in building and modernizing their digital presence by designing responsive, high-performance websites and portfolios aligned with the latest industry trends.",
		    "Collaborating with clients to understand their brand vision and delivering tailored web solutions that enhance their online visibility.",
		    "Staying updated with cutting-edge technologies in frontend and backend development, including frameworks, design systems, and deployment strategies.",
		    "Helping startups and professionals establish their identity online through customized landing pages, product showcases, and SEO-optimized solutions.",
		],
	},
];

export const WorkExperienceSection = () => {
	const sectionRef = useRef(null);
	const lineRef = useRef(null);
	const isInView = useInView(sectionRef, { once: true, margin: "-100px" });
	const [fillHeight, setFillHeight] = useState(0);

	useEffect(() => {
		const handleScroll = () => {
			if (!sectionRef.current || !lineRef.current) return;
			const section = sectionRef.current;
			const rect = section.getBoundingClientRect();
			const viewportHeight = window.innerHeight;
			const start = rect.top - viewportHeight;
			const end = rect.bottom - viewportHeight;
			const current = window.scrollY;
			const progress = (current - start) / (end - start);
			const lineHeight = lineRef.current.offsetHeight;
			setFillHeight(Math.min(Math.max(progress * lineHeight, 0), lineHeight));
		};

		window.addEventListener("scroll", handleScroll, { passive: true });
		handleScroll();
		return () => window.removeEventListener("scroll", handleScroll);
	}, []);

	return (
		<section
			id="work-experience"
			ref={sectionRef}
			className="py-16 sm:py-24 px-4 relative bg-secondary/30"
		>
			<div className="container mx-auto max-w-5xl">
				<h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-8 sm:mb-12 text-center">
					My <span className="text-primary">Work Experience</span>
				</h2>

				<div className="relative flex flex-col gap-16 sm:gap-24">
					{/* Background vertical line */}
					<div
						ref={lineRef}
						className="absolute left-4 sm:left-8 top-0 w-1 bg-primary/20 rounded-full"
						style={{ height: "100%" }}
					/>

					{/* Animated fill line */}
					<div
						className="absolute left-4 sm:left-8 top-0 w-1 bg-primary rounded-full transition-all duration-1000"
						style={{ height: fillHeight }}
					/>

					{experiences.map((exp, idx) => (
						<motion.div
							key={idx}
							initial={{ opacity: 0, y: 20 }}
							animate={isInView ? { opacity: 1, y: 0 } : {}}
							transition={{ duration: 0.5, delay: idx * 0.2 }}
							className="relative flex flex-col sm:flex-row gap-4 sm:gap-8"
						>
							{/* Timeline dot */}
							<div className="absolute left-4 sm:left-8 -translate-x-1/2 top-0 sm:top-1/2 sm:-translate-y-1/2">
								<span className="block w-4 h-4 rounded-full border-4 border-primary bg-background" />
							</div>

							{/* Content wrapper with left padding for line */}
							<div className="flex flex-col sm:flex-row flex-1 gap-4 sm:gap-8 pl-8 sm:pl-16">
								{/* Left column - year and title */}
								<div className="sm:w-64 flex flex-col justify-center">
									<h3 className="text-xl sm:text-2xl font-bold">
										{exp.year}
									</h3>
									<h4 className="text-lg sm:text-xl text-primary font-bold">
										{exp.title}
									</h4>
									<p className="text-muted-foreground font-medium">
										{exp.company}
									</p>
								</div>

								{/* Right column - details in a card */}
								<div className="flex-1">
									<div className="bg-card/60 backdrop-blur-none border border-border rounded-lg shadow-lg p-4 sm:p-8 w-full overflow-hidden">
										<div className="space-y-3 sm:space-y-4">
											{exp.details.map((detail, i) => (
												<p
													key={i}
													className="text-muted-foreground text-sm sm:text-base"
												>
													{detail}
												</p>
											))}
										</div>
									</div>
								</div>
							</div>
						</motion.div>
					))}
				</div>
			</div>
		</section>
	);
};