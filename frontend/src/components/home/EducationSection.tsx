import { BookOpen, Calendar } from "lucide-react";
import type { Education } from "@/types";

interface Props {
  readonly education: Education[];
}

export default function EducationSection({ education }: Props) {
  return (
    <section className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
      <h2 className="section-heading">Education</h2>
      <p className="section-subheading">
        Academic background that supports my technical and analytical foundation.
      </p>

      <div className="relative">
        <div className="absolute left-5 top-0 bottom-0 w-px bg-brown-200 hidden sm:block" />
        <div className="space-y-10">
          {education.map((item, idx) => (
            <div
              key={`${item.institution}-${item.start_date}`}
              className="relative flex gap-6 sm:pl-14 animate-fade-up"
              style={{ animationDelay: `${idx * 100}ms` }}
            >
              <div className="hidden sm:flex absolute left-0 top-1 w-10 h-10 rounded-full bg-brown-100 border-2 border-brown-300 items-center justify-center flex-shrink-0 shadow-warm text-brown-600">
                <BookOpen size={16} />
              </div>

              <div className="card flex-1 p-6">
                <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-2 mb-3">
                  <div>
                    <h3 className="text-lg font-semibold text-brown-900">
                      {item.institution}
                    </h3>
                    <p className="text-brown-600 font-medium">
                      {item.degree} · {item.specialization}
                    </p>
                  </div>
                  <span className="flex items-center gap-1.5 text-sm text-brown-400 whitespace-nowrap">
                    <Calendar size={14} />
                    {item.start_date} — {item.end_date}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
