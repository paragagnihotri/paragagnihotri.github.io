import Image from "next/image";
import { Award, ExternalLink } from "lucide-react";
import type { Badge } from "@/types";

interface Props {
  badge: Badge;
}

export default function BadgeCard({ badge }: Props) {
  return (
    <div className="card p-6 flex flex-col items-center text-center group">
      {/* Badge image */}
      <a
        href={badge.public_link}
        target="_blank"
        rel="noopener noreferrer"
        className="block mb-4 rounded-full overflow-hidden w-28 h-28 bg-beige-100 border-2 border-beige-200 hover:border-brown-400 transition-colors shadow-warm"
        title={`View ${badge.title} badge`}
      >
        {badge.badge_url ? (
          <Image
            src={badge.badge_url}
            alt={badge.title}
            width={112}
            height={112}
            className="object-contain w-full h-full group-hover:scale-105 transition-transform duration-300 p-2"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center">
            <Award size={40} className="text-brown-400" />
          </div>
        )}
      </a>

      <h3 className="font-semibold text-brown-900 text-sm leading-snug mb-1">
        {badge.title}
      </h3>
      <p className="text-brown-500 text-xs mb-4">{badge.issuer}</p>

      <div className="flex flex-col gap-2 w-full mt-auto">
        <a
          href={badge.public_link}
          target="_blank"
          rel="noopener noreferrer"
          className="btn-outline text-xs py-2 justify-center"
        >
          <ExternalLink size={13} />
          View Badge
        </a>
        <a
          href={badge.exam_link}
          target="_blank"
          rel="noopener noreferrer"
          className="btn-primary text-xs py-2 justify-center"
        >
          Get Certified
        </a>
      </div>
    </div>
  );
}
