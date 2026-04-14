import { Briefcase, Calendar } from "lucide-react";
import type { Experience } from "@/types";

interface Props {
  experiences: Experience[];
}

export default function ExperienceSection({ experiences }: Props) {
  return (
    <section className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
      <h2 className="section-heading">Professional Experience</h2>
      <p className="section-subheading">Where I&apos;ve worked and what I&apos;ve built</p>

      <div className="relative">
        {/* Vertical timeline line */}
        <div className="absolute left-5 top-0 bottom-0 w-px bg-brown-200 hidden sm:block" />

        <div className="space-y-10">
          {experiences.map((exp, idx) => (
            <div
              key={idx}
              className="relative flex gap-6 sm:pl-14 animate-fade-up"
              style={{ animationDelay: `${idx * 100}ms` }}
            >
              {/* Timeline dot */}
              <div className="hidden sm:flex absolute left-0 top-1 w-10 h-10 rounded-full bg-brown-100 border-2 border-brown-300 items-center justify-center flex-shrink-0 shadow-warm">
                <Briefcase size={16} className="text-brown-600" />
              </div>

              {/* Card */}
              <div className="card flex-1 p-6">
                <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-2 mb-3">
                  <div>
                    <h3 className="text-lg font-semibold text-brown-900">
                      {exp.role}
                    </h3>
                    <p className="text-brown-600 font-medium">{exp.company}</p>
                  </div>
                  <span className="flex items-center gap-1.5 text-sm text-brown-400 whitespace-nowrap">
                    <Calendar size={14} />
                    {exp.start_date} — {exp.end_date}
                  </span>
                </div>
                <p className="text-brown-700 text-sm leading-relaxed">
                  {exp.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
