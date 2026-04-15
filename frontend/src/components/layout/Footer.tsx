import { Github, Instagram, Linkedin, Mail, MapPin, Phone } from "lucide-react";

const CONTACT_LINKS = [
  {
    icon: Phone,
    label: "Phone",
    href: "tel:+918889656366",
    display: "(+91) 8889656366",
  },
  {
    icon: Mail,
    label: "Email",
    href: "mailto:agnihotriparag2201@gmail.com",
    display: "agnihotriparag2201@gmail.com",
  },
];

const SOCIAL_LINKS = [
  {
    icon: Github,
    label: "GitHub",
    href: "https://github.com/paragagnihotri",
    display: "agnihotriparag22",
  },
  {
    icon: Linkedin,
    label: "LinkedIn",
    href: "https://linkedin.com/in/agnihotriparag",
    display: "agnihotriparag",
  },
  {
    icon: Instagram,
    label: "Instagram",
    href: "https://instagram.com/agnihotriiparag",
    display: "@agnihotriiparag",
  },
];

function LinkList({
  links,
}: {
  links: { icon: React.ElementType; label: string; href: string; display: string }[];
}) {
  return (
    <ul className="space-y-3">
      {links.map(({ icon: Icon, label, href, display }) => (
        <li key={label}>
          <a
            href={href}
            target={href.startsWith("http") ? "_blank" : undefined}
            rel={href.startsWith("http") ? "noopener noreferrer" : undefined}
            className="flex items-center gap-3 text-brown-300 hover:text-cream transition-colors text-sm group"
          >
            <span className="w-8 h-8 rounded-full bg-brown-800 group-hover:bg-brown-700 flex items-center justify-center transition-colors shrink-0">
              <Icon size={15} />
            </span>
            <span>{display}</span>
          </a>
        </li>
      ))}
    </ul>
  );
}

export default function Footer() {
  return (
    <footer className="bg-brown-900 text-beige-200 mt-20">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-10">

          {/* Brand */}
          <div className="flex flex-col gap-3">
            <p className="font-serif text-2xl font-semibold text-cream">
              Parag Agnihotri
            </p>
            <p className="text-brown-400 text-sm leading-relaxed">
              Data Scientist passionate about building scalable systems and
              elegant solutions.
            </p>
            <div className="flex items-center gap-2 text-brown-400 text-sm mt-1">
              <MapPin size={14} className="shrink-0 text-brown-500" />
              <span>Indore (M.P), India</span>
            </div>
          </div>

          {/* Contact */}
          <div>
            <p className="text-xs font-semibold text-beige-300 uppercase tracking-widest mb-4">
              Contact
            </p>
            <LinkList links={CONTACT_LINKS} />
          </div>

          {/* Social */}
          <div>
            <p className="text-xs font-semibold text-beige-300 uppercase tracking-widest mb-4">
              Social
            </p>
            <LinkList links={SOCIAL_LINKS} />
          </div>

        </div>

        <div className="mt-10 pt-6 border-t border-brown-800 text-center text-brown-500 text-xs">
          © {new Date().getFullYear()} Parag Agnihotri. All rights reserved.
        </div>
      </div>
    </footer>
  );
}
