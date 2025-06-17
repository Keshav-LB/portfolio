import { useState } from "react";
import { cn } from "@/lib/utils";

const skills = [
  // Frontend
  { name: "HTML/CSS", level: 95, category: "frontend"},
  { name: "JavaScript", level: 90, category: "frontend", highlighted: true },
  { name: "React", level: 90, category: "frontend", highlighted: true },
  { name: "Tailwind CSS", level: 50, category: "frontend" },
  { name: "Bootstrap", level: 70, category: "frontend" },

  // Backend
  { name: "Java + Springboot", level: 80, category: "backend", highlighted: true },
  { name: "Php + Laravel", level: 75, category: "backend" },
  { name: "MySQL", level: 70, category: "backend", highlighted: true },
  { name: "MsSQLServer", level: 65, category: "backend" },
  { name: "MongoDb", level: 60, category: "backend" },

  // Tools
  { name: "Git/GitHub", level: 90, category: "tools", highlighted: true },
  { name: "Docker", level: 70, category: "tools", highlighted: true  },
  { name: "Figma", level: 70, category: "tools" },
  { name: "VS Code", level: 95, category: "tools" },
  { name: "Eclipse IDE", level: 95, category: "tools" },
];

const categories = ["highlighted", "all", "frontend", "backend", "tools"];
const PAGE_SIZE = 9; // Show 9 skills per page (3x3 grid)

export const SkillsSection = () => {
  const [activeCategory, setActiveCategory] = useState("highlighted");
  const [page, setPage] = useState(1);

  let filteredSkills;
  if (activeCategory === "highlighted") {
    filteredSkills = skills.filter((skill) => skill.highlighted);
  } else if (activeCategory === "all") {
    filteredSkills = skills;
  } else {
    filteredSkills = skills.filter((skill) => skill.category === activeCategory);
  }

  const totalPages = Math.ceil(filteredSkills.length / PAGE_SIZE);

  const currentSkills = filteredSkills.slice(
    (page - 1) * PAGE_SIZE,
    page * PAGE_SIZE
  );

  const handleCategoryChange = (category) => {
    setActiveCategory(category);
    setPage(1); // Reset to first page when category changes
    setTimeout(() => {
      document.getElementById("skills")?.scrollIntoView({ behavior: "smooth", block: "start" });
    }, 0);
  };

  const handlePageChange = (newPage) => {
    setPage(newPage);
    // Optionally, scroll to top of section
    setTimeout(() => {
      document.getElementById("skills")?.scrollIntoView({ behavior: "smooth", block: "start" });
    }, 0);
  };

  return (
    <section id="skills" className="py-24 px-4 relative bg-secondary/30">
      <div className="container mx-auto max-w-5xl">
        <h2 className="text-3xl md:text-4xl font-bold mb-12 text-center">
          My <span className="text-primary"> Skills</span>
        </h2>

        <div className="flex flex-wrap justify-center gap-4 mb-12">
          {categories.map((category, key) => (
            <button
              key={key}
              onClick={() => handleCategoryChange(category)}
              className={cn(
                "px-5 py-2 rounded-full transition-colors duration-300 capitalize",
                activeCategory === category
                  ? "bg-primary text-primary-foreground"
                  : "bg-secondary/70 text-forefround hover:bd-secondary"
              )}
            >
              {category === "highlighted" ? "Highlighted" : category}
            </button>
          ))}
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {currentSkills.map((skill, key) => (
            <div
              key={key}
              className="bg-card p-6 rounded-lg shadow-xs card-hover"
            >
              <div className="text-left mb-4">
                <h3 className="font-semibold text-lg"> {skill.name}</h3>
              </div>
              <div className="w-full bg-secondary/50 h-2 rounded-full overflow-hidden">
                <div
                  className="bg-primary h-2 rounded-full origin-left animate-[grow_1.5s_ease-out]"
                  style={{ width: skill.level + "%" }}
                />
              </div>
              <div className="text-right mt-1">
                <span className="text-sm text-muted-foreground">
                  {skill.level}%
                </span>
              </div>
            </div>
          ))}
        </div>

        {/* Pagination Controls */}
        {totalPages > 1 && (
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
        )}

        {/* See All Skills Button for Highlighted */}
        {activeCategory === "highlighted" && (
          <div className="flex justify-center mt-8">
            <button
              className="cosmic-button"
              onClick={() => handleCategoryChange("all")}
            >
              See All Skills
            </button>
          </div>
        )}
      </div>
    </section>
  );
};