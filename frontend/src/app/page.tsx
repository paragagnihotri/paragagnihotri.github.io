import { api } from "@/lib/api";

export const dynamic = "force-dynamic";
import HeroSection from "@/components/home/HeroSection";
import ExperienceSection from "@/components/home/ExperienceSection";
import SkillsSection from "@/components/home/SkillsSection";
import EducationSection from "@/components/home/EducationSection";

export default async function HomePage() {
  const profile = await api.getProfile();

  return (
    <>
      <HeroSection profile={profile} />

      {/* Divider */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="border-t border-brown-200" />
      </div>

      <ExperienceSection experiences={profile.experiences} />

      <SkillsSection skills={profile.skills} />

      <EducationSection education={profile.education} />
    </>
  );
}
