import Image from "next/image";
import { CalendarDays, Hash, ExternalLink } from "lucide-react";
import type { Certificate } from "@/types";

interface Props {
  certificate: Certificate;
}

export default function CertificateCard({ certificate }: Props) {
  return (
    <article className="card flex flex-col sm:flex-row overflow-hidden group">
      {/* Thumbnail */}
      <div className="sm:w-44 sm:flex-shrink-0 h-36 sm:h-auto bg-brown-100 overflow-hidden relative">
        {certificate.thumbnail ? (
          <Image
            src={certificate.thumbnail}
            alt={certificate.title}
            fill
            sizes="176px"
            className="object-cover group-hover:scale-105 transition-transform duration-500"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-beige-100 to-brown-200">
            <Hash size={32} className="text-brown-300" />
          </div>
        )}
      </div>

      {/* Content */}
      <div className="flex flex-col flex-1 p-6">
        <h3 className="font-serif text-lg font-semibold text-brown-900 mb-1 leading-snug">
          {certificate.title}
        </h3>
        <p className="text-brown-500 text-sm font-medium mb-4">
          {certificate.issuer}
        </p>

        <div className="flex flex-wrap gap-4 text-xs text-brown-500 mb-5">
          <span className="flex items-center gap-1.5">
            <CalendarDays size={13} />
            {certificate.issue_date}
          </span>
          <span className="flex items-center gap-1.5">
            <Hash size={13} />
            {certificate.credential_id}
          </span>
        </div>

        <div className="flex flex-wrap gap-3 mt-auto">
          <a
            href={certificate.credential_url}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-outline text-xs py-2"
          >
            <ExternalLink size={13} />
            View Credential
          </a>
          <a
            href={certificate.exam_link}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-primary text-xs py-2"
          >
            Get Certified
          </a>
        </div>
      </div>
    </article>
  );
}
