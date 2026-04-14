import { api } from "@/lib/api";
import {
  BookOpen,
  FolderGit2,
  Award,
  Star,
  TrendingUp,
  Code2,
} from "lucide-react";

export const metadata = {
  title: "Analytics — Parag Agnihotri",
  description: "Portfolio analytics and stats for Parag Agnihotri.",
};

function StatCard({
  icon: Icon,
  label,
  value,
  sub,
}: {
  icon: React.ElementType;
  label: string;
  value: string | number;
  sub?: string;
}) {
  return (
    <div className="card p-6 flex items-start gap-4">
      <div className="w-12 h-12 rounded-xl bg-brown-100 flex items-center justify-center flex-shrink-0">
        <Icon size={22} className="text-brown-600" />
      </div>
      <div>
        <p className="text-2xl font-bold font-serif text-brown-900">{value}</p>
        <p className="text-brown-600 text-sm font-medium">{label}</p>
        {sub && <p className="text-brown-400 text-xs mt-0.5">{sub}</p>}
      </div>
    </div>
  );
}

function SkillBar({
  name,
  level,
}: {
  name: string;
  level?: string;
}) {
  const LEVEL_WIDTH: Record<string, string> = {
    Expert: "w-full",
    Advanced: "w-4/5",
    Intermediate: "w-3/5",
    Beginner: "w-2/5",
  };
  const width = level ? (LEVEL_WIDTH[level] ?? "w-1/2") : "w-1/2";

  return (
    <div>
      <div className="flex justify-between text-sm mb-1">
        <span className="text-brown-700 font-medium">{name}</span>
        {level && (
          <span className="text-brown-400 text-xs">{level}</span>
        )}
      </div>
      <div className="h-2 bg-brown-100 rounded-full overflow-hidden">
        <div
          className={`h-full rounded-full bg-gradient-to-r from-brown-500 to-beige-400 ${width} transition-all duration-700`}
        />
      </div>
    </div>
  );
}

export default async function AnalyticsPage() {
  const [profile, projects, certData, posts] = await Promise.all([
    api.getProfile(),
    api.getProjects(),
    api.getCertifications(),
    api.getBlogPosts(),
  ]);

  const totalSkills = profile.skills.reduce(
    (acc, cat) => acc + cat.skills.length,
    0
  );
  const expertSkills = profile.skills.flatMap((c) =>
    c.skills.filter((s) => s.level === "Expert")
  );

  // Top skills by category — pick the first 5 from programming languages or first category
  const topCategory = profile.skills[0];

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
      <h1 className="section-heading">Analytics</h1>
      <p className="section-subheading">
        A snapshot of my portfolio at a glance
      </p>

      {/* Stats grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 mb-16">
        <StatCard
          icon={FolderGit2}
          label="Projects"
          value={projects.length}
          sub="Open-source & professional work"
        />
        <StatCard
          icon={Award}
          label="Certifications"
          value={certData.certificates.length}
          sub={`+ ${certData.badges.length} digital badges`}
        />
        <StatCard
          icon={BookOpen}
          label="Blog Posts"
          value={posts.length}
          sub="Latest thoughts & articles"
        />
        <StatCard
          icon={Code2}
          label="Skills"
          value={totalSkills}
          sub={`Across ${profile.skills.length} categories`}
        />
        <StatCard
          icon={Star}
          label="Expert-Level Skills"
          value={expertSkills.length}
          sub={expertSkills.map((s) => s.name).join(", ")}
        />
        <StatCard
          icon={TrendingUp}
          label="Years of Experience"
          value={`${profile.experiences.length}+`}
          sub="Roles across different companies"
        />
      </div>

      {/* Skills breakdown */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
        {/* Category distribution */}
        <div className="card p-6">
          <h2 className="font-serif text-lg font-semibold text-brown-900 mb-5">
            Skills by Category
          </h2>
          <div className="space-y-4">
            {profile.skills.map((cat) => (
              <div key={cat.category}>
                <div className="flex justify-between text-sm mb-1.5">
                  <span className="text-brown-700 font-medium">
                    {cat.category}
                  </span>
                  <span className="text-brown-400">{cat.skills.length}</span>
                </div>
                <div className="h-2 bg-brown-100 rounded-full overflow-hidden">
                  <div
                    className="h-full rounded-full bg-gradient-to-r from-brown-600 to-beige-400"
                    style={{
                      width: `${(cat.skills.length / totalSkills) * 100}%`,
                    }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Top skills proficiency */}
        {topCategory && (
          <div className="card p-6">
            <h2 className="font-serif text-lg font-semibold text-brown-900 mb-5">
              {topCategory.category} — Proficiency
            </h2>
            <div className="space-y-4">
              {topCategory.skills.map((skill) => (
                <SkillBar
                  key={skill.name}
                  name={skill.name}
                  level={skill.level}
                />
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Experience timeline summary */}
      <div className="card p-6">
        <h2 className="font-serif text-lg font-semibold text-brown-900 mb-5">
          Career Timeline
        </h2>
        <div className="flex flex-col sm:flex-row gap-4">
          {profile.experiences.map((exp, idx) => (
            <div
              key={idx}
              className="flex-1 bg-beige-100 rounded-xl p-4 border border-beige-200"
            >
              <p className="font-semibold text-brown-900 text-sm">
                {exp.role}
              </p>
              <p className="text-brown-600 text-xs mt-0.5">{exp.company}</p>
              <p className="text-brown-400 text-xs mt-2">
                {exp.start_date} — {exp.end_date}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
