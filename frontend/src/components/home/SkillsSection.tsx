import type { SkillCategory } from "@/types";

const LEVEL_COLOR: Record<string, string> = {
  Expert: "bg-brown-700 text-cream",
  Advanced: "bg-brown-500 text-cream",
  Intermediate: "bg-beige-400 text-brown-900",
  Beginner: "bg-beige-200 text-brown-700",
};

interface Props {
  skills: SkillCategory[];
}

export default function SkillsSection({ skills }: Props) {
  return (
    <section className="bg-brown-100/50 py-16">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="section-heading">Technical Skills</h2>
        <p className="section-subheading">
          Technologies and tools I work with daily
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {skills.map((category, idx) => (
            <div
              key={idx}
              className="card p-6 animate-fade-up"
              style={{ animationDelay: `${idx * 80}ms` }}
            >
              <h3 className="text-sm font-semibold text-brown-500 uppercase tracking-widest mb-4">
                {category.category}
              </h3>
              <div className="flex flex-wrap gap-2">
                {category.skills.map((skill, sIdx) => (
                  <span
                    key={sIdx}
                    className="inline-flex items-center gap-1.5 bg-beige-100 text-brown-800 text-sm px-3 py-1.5 rounded-full font-medium border border-beige-200"
                    title={skill.level}
                  >
                    {skill.name}
                    {skill.level && (
                      <span
                        className={`text-xs px-1.5 py-0.5 rounded-full font-semibold ${
                          LEVEL_COLOR[skill.level] ?? "bg-beige-200 text-brown-700"
                        }`}
                      >
                        {skill.level}
                      </span>
                    )}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
