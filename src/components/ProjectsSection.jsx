import { ArrowRight, ExternalLink, Github } from "lucide-react";
import { useRef, useState } from "react";

const projects = [
	{
		id: 1,
		title: "SaaS Landing Page",
		description: "A beautiful landing page app using React and Tailwind.",
		image: "/projects/banner.png",
		tags: ["React", "TailwindCSS", "Supabase"],
		demoUrl: "#",
		githubUrl: "#",
	},
	{
		id: 2,
		title: "E-commerce Platform",
		description:
			"Full-featured e-commerce platform with user authentication and payment processing.",
		image: "/projects/ecom.png",
		tags: ["React", "Springboot", "Java", "MySQL"],
		demoUrl: "#",
		githubUrl: "#",
	},
	{
		id: 3,
		title: "Linklify",
		description:
			"Linklify is a URL shortening service that allows users to create short links for their long URLs.",
		image: "/projects/linklify.png",
		tags: [
			"React",
			"Springboot",
			"Java",
			"PostgreSQL",
			"TailwindCSS",
			"Docker",
			"ChartJS",
		],
		demoUrl: "https://quiet-panda-8e2dd6.netlify.app/login",
		githubUrl: "https://github.com/Keshav-LB/linklify-react-frontend",
	},
	{
		id: 4,
		title: "Employee Management System",
		description:
			"An EMS involves to manage employee data and records efficiently, often replacing or improving upon manual systems.",
		image: "/projects/EMS.png",
		tags: ["React", "Springboot", "Java", "MySQL"],
		demoUrl: "#",
		githubUrl: "#",
	},
	{
		id: 5,
		title: "Fly Away",
		description:
			"FlyAway is a ticket-booking portal that lets people book flights on the website.",
		image: "/projects/Flyaway.png",
		tags: ["Java", "Servlets", "Bootstrap4", "MySQL"],
		demoUrl: "#",
		githubUrl: "#",
	},
	{
		id: 6,
		title: "Number Guessing game",
		description:
			"A fun and addictive number guessing game built using React and CSS5. Guess the secret number between 0 and 100, and challenge yourself to get the highest score with the fewest attempts!",
		image: "/projects/NumberGuessGame.png",
		tags: ["Javascript", "css5", "React+vite"],
		demoUrl: "https://number-guess-game-steel.vercel.app/",
		githubUrl: "https://github.com/Keshav-LB/NumberGuessGame",
	},
	{
		id: 7,
		title: "Number Guessing game",
		description:
			"A fun and addictive number guessing game built using React and CSS5. Guess the secret number between 0 and 100, and challenge yourself to get the highest score with the fewest attempts!",
		image: "/projects/NumberGuessGame.png",
		tags: ["Javascript", "css5", "React+vite"],
		demoUrl: "https://number-guess-game-steel.vercel.app/",
		githubUrl: "https://github.com/Keshav-LB/NumberGuessGame",
	},
];

const PAGE_SIZE = 3;

export const ProjectsSection = () => {
	const [page, setPage] = useState(1);
	const sectionRef = useRef(null);

	const totalPages = Math.ceil(projects.length / PAGE_SIZE);

	const currentProjects = projects.slice(
		(page - 1) * PAGE_SIZE,
		page * PAGE_SIZE
	);

	const handlePageChange = (newPage) => {
		setPage(newPage);
		// Scroll to the top of the projects section
		setTimeout(() => {
			sectionRef.current?.scrollIntoView({
				behavior: "smooth",
				block: "start",
			});
		}, 0);
	};

	return (
		<section
			id="projects"
			ref={sectionRef}
			className="py-16 px-2 sm:py-24 sm:px-4 relative"
		>
			<div className="container mx-auto max-w-5xl">
				<h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-4 text-center">
					Featured <span className="text-primary"> Projects </span>
				</h2>

				<p className="text-center text-muted-foreground mb-8 sm:mb-12 max-w-2xl mx-auto text-sm sm:text-base">
					Here are some of my recent projects. Each project was carefully
					crafted with attention to detail, performance, and user experience.
				</p>

				{/* Paginated Projects */}
				<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 mb-8">
					{currentProjects.map((project) => (
						<div
							key={project.id}
							className="group bg-card rounded-lg overflow-hidden shadow-xs card-hover flex flex-col"
						>
							<div className="h-40 sm:h-48 overflow-hidden">
								<img
									src={project.image}
									alt={project.title}
									className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
								/>
							</div>
							<div className="p-4 sm:p-6 flex flex-col flex-1">
								<div className="flex flex-wrap gap-2 mb-3 sm:mb-4">
									{project.tags.map((tag) => (
										<span
											key={tag}
											className="px-2 py-1 text-xs font-medium border rounded-full bg-secondary text-secondary-foreground"
										>
											{tag}
										</span>
									))}
								</div>
								<h3 className="text-lg sm:text-xl font-semibold mb-1">
									{project.title}
								</h3>
								<p className="text-muted-foreground text-xs sm:text-sm mb-3 sm:mb-4 flex-1">
									{project.description}
								</p>
								<div className="flex justify-between items-center mt-auto">
									<div className="flex space-x-3">
										<a
											href={project.demoUrl}
											target="_blank"
											rel="noopener noreferrer"
											className="text-foreground/80 hover:text-primary transition-colors duration-300"
										>
											<ExternalLink size={20} />
										</a>
										<a
											href={project.githubUrl}
											target="_blank"
											rel="noopener noreferrer"
											className="text-foreground/80 hover:text-primary transition-colors duration-300"
										>
											<Github size={20} />
										</a>
									</div>
								</div>
							</div>
						</div>
					))}
				</div>

				{/* Pagination Controls */}
				<div className="flex justify-center mt-8 space-x-2">
					<button
						className="px-3 py-1 rounded bg-primary text-primary-foreground disabled:opacity-50"
						onClick={() => handlePageChange(Math.max(1, page - 1))}
						disabled={page === 1}
					>
						Prev
					</button>
					{Array.from({ length: totalPages }, (_, i) => (
						<button
							key={i}
							className={`px-3 py-1 rounded ${
								page === i + 1
									? "bg-primary text-primary-foreground"
									: "bg-secondary text-foreground"
							}`}
							onClick={() => handlePageChange(i + 1)}
						>
							{i + 1}
						</button>
					))}
					<button
						className="px-3 py-1 rounded bg-primary text-primary-foreground disabled:opacity-50"
						onClick={() => handlePageChange(Math.min(totalPages, page + 1))}
						disabled={page === totalPages}
					>
						Next
					</button>
				</div>

				<div className="text-center mt-12">
					<a
						className="cosmic-button w-fit flex items-center mx-auto gap-2"
						target="_blank"
						rel="noopener noreferrer"
						href="https://github.com/Keshav-LB"
					>
						Check My Github <ArrowRight size={16} />
					</a>
				</div>
			</div>
		</section>
	);
};
