import Image from "next/image";
import { Quote } from "lucide-react";
import type { Profile } from "@/types";
import HeroButtons from "./HeroButtons";

interface Props {
  readonly profile: Profile;
}

export default function HeroSection({ profile }: Props) {
  return (
    <section className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
      <div className="flex flex-col-reverse md:flex-row items-center gap-12">
        {/* Text content */}
        <div className="flex-1 animate-fade-up">
          {/* Quote */}
          <div className="flex items-start gap-3 mb-8">
            <Quote
              size={20}
              className="text-brown-400 mt-1 flex-shrink-0 fill-brown-200"
            />
            <p className="font-serif text-lg italic text-brown-500">
              {profile.quote}
            </p>
          </div>

          {/* Name & title */}
          <h1 className="font-serif text-5xl sm:text-6xl font-bold text-brown-900 leading-tight mb-3">
            {profile.name}
          </h1>
          <p className="text-brown-500 text-xl font-medium mb-6">
            {profile.title}
          </p>

          {/* Introduction */}
          <p className="text-brown-700 text-base leading-relaxed max-w-xl">
            {profile.introduction}
          </p>

          {/* Action buttons */}
          <HeroButtons />
        </div>

        {/* Avatar */}
        <div className="flex-shrink-0">
          <div className="w-56 h-56 md:w-64 md:h-64 rounded-full bg-brown-100 border-4 border-brown-200 shadow-warm-lg overflow-hidden flex items-center justify-center">
            {profile.avatar ? (
              <Image
                src={profile.avatar}
                alt={profile.name}
                width={256}
                height={256}
                className="object-cover w-full h-full"
              />
            ) : (
              <span className="font-serif text-7xl font-bold text-brown-300 select-none">
                {profile.name.charAt(0)}
              </span>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
