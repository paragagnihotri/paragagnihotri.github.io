import type { SkillCategory } from "@/types";

const LEVEL_STYLE: Record<string, string> = {
  Expert:       "bg-brown-700 text-cream",
  Advanced:     "bg-brown-500 text-cream",
  Intermediate: "bg-beige-400 text-brown-900",
  Beginner:     "bg-beige-200 text-brown-700",
};

// SimpleIcons slug lookup — keys are lowercased & trimmed skill names
const ICON_SLUG: Record<string, string> = {
  "python":              "python",
  "sql":               "mysql",
  "r":                   "r",
  "fastapi":             "fastapi",
  "langchain":           "langchain",
  "langgraph":           "langgraph",
  "crewai":              "crewai",
  "streamlit":           "streamlit",
  "scikit-learn":        "scikitlearn",
  "matplotlib":          "python",
  "pandas / numpy":      "pandas",
  "mysql":               "mysql",
  "postgresql":          "postgresql",
  "mongodb":             "mongodb",
  "qdrantdb":            "qdrant",
  "git & github":        "github",
  "milvus vector db":       "milvus",
  "postman":             "postman",
  "aws ai (bedrock, sagemaker, lex, polly, comprehend)": "icloud",
  "aws compute(ec2, ecs, eks, lambda, etc.)":            "icloud",
  "aws storage (s3, rds, dynamodb, ebs, etc.)":          "icloud",
  "generative ai":         "claude",
  "agentic ai":           "probot",
  "rag pipelines":        "mediapipe",
  "data pipeline orchestration": "mediapipe",
  "data analytics":       "googleanalytics",
  "system design":        "circuitverse",
  "microservices architecture": "linkerd",
  "rest apis":  "fastapi",
  "agile / scrum":        "jira"
};

function getIconUrl(name: string): string | null {
  const slug = ICON_SLUG[name.trim().toLowerCase()];
  return slug ? `https://cdn.simpleicons.org/${slug}` : null;
}

function initials(name: string): string {
  return name
    .trim()
    .split(/\s+/)
    .slice(0, 2)
    .map((w) => w[0]?.toUpperCase() ?? "")
    .join("");
}

function SkillTile({ name, level }: { name: string; level?: string }) {
  const iconUrl = getIconUrl(name);
  const badgeStyle = level
    ? (LEVEL_STYLE[level] ?? "bg-beige-200 text-brown-700")
    : null;
  const initialsStyle = badgeStyle ?? "bg-beige-200 text-brown-700";

  return (
    <div className="card px-2.5 py-3 flex flex-col items-center gap-1.5 text-center">
      {/* Icon */}
      <div className="w-7 h-7 flex items-center justify-center shrink-0">
        {iconUrl ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={iconUrl}
            alt={name}
            width={28}
            height={28}
            className="w-7 h-7 object-contain"
          />
        ) : (
          <div
            className={`w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold ${initialsStyle}`}
          >
            {initials(name)}
          </div>
        )}
      </div>

      {/* Skill name */}
      <p className="text-brown-900 text-xs font-medium leading-tight text-center flex-1">
        {name.trim()}
      </p>

      {/* Proficiency badge */}
      {level && badgeStyle && (
        <span className={`text-[10px] px-2 py-0.5 rounded-full font-semibold leading-none ${badgeStyle}`}>
          {level}
        </span>
      )}
    </div>
  );
}

interface Props {
  skills: SkillCategory[];
}

export default function SkillsSection({ skills }: Props) {
  return (
    <section className="bg-brown-100/50 py-12">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="section-heading">Technical Skills</h2>
        <p className="section-subheading">
          Technologies and tools I work with daily
        </p>

        {/* Category grid — 2 columns on large screens */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
          {skills.map((category, idx) => {
            const isLastOdd =
              idx === skills.length - 1 && skills.length % 2 !== 0;

            return (
              <div
                key={idx}
                className={`bg-white border border-brown-200 rounded-2xl p-5 shadow-warm animate-fade-up${
                  isLastOdd ? " lg:col-span-2" : ""
                }`}
                style={{ animationDelay: `${idx * 80}ms` }}
              >
                <h3 className="text-xs font-semibold text-brown-500 uppercase tracking-widest mb-3">
                  {category.category}
                </h3>

                {/* Skill tiles — more columns when category spans full width */}
                <div
                  className={`grid gap-2 ${
                    isLastOdd
                      ? "grid-cols-3 sm:grid-cols-5 md:grid-cols-6 lg:grid-cols-9"
                      : "grid-cols-3 sm:grid-cols-4"
                  }`}
                >
                  {category.skills.map((skill, sIdx) => (
                    <SkillTile key={sIdx} name={skill.name} level={skill.level} />
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
