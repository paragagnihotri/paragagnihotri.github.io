import { api } from "@/lib/api";
import BadgeCard from "@/components/certifications/BadgeCard";
import CertificateCard from "@/components/certifications/CertificateCard";

export const metadata = {
  title: "Certifications — Parag Agnihotri",
  description: "Certifications and badges earned by Parag Agnihotri.",
};

export default async function CertificationsPage() {
  const { badges, certificates } = await api.getCertifications();

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
      <h1 className="section-heading">Certifications &amp; Badges</h1>
      <p className="section-subheading">
        Professional certifications and credentials I&apos;ve earned
      </p>

      {/* Badges */}
      {badges.length > 0 && (
        <section className="mb-16">
          <h2 className="text-xl font-serif font-semibold text-brown-800 mb-6 flex items-center gap-3">
            <span className="w-8 h-px bg-brown-300 inline-block" />
            Digital Badges
          </h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-5">
            {badges.map((badge) => (
              <BadgeCard key={badge.id} badge={badge} />
            ))}
          </div>
        </section>
      )}

      {/* Certificates */}
      {certificates.length > 0 && (
        <section>
          <h2 className="text-xl font-serif font-semibold text-brown-800 mb-6 flex items-center gap-3">
            <span className="w-8 h-px bg-brown-300 inline-block" />
            Certificates
          </h2>
          <div className="flex flex-col gap-5">
            {certificates.map((cert) => (
              <CertificateCard key={cert.id} certificate={cert} />
            ))}
          </div>
        </section>
      )}
    </div>
  );
}
