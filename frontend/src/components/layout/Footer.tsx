import { Github, Instagram, Linkedin, Mail, Phone } from "lucide-react";

const SOCIAL_LINKS = [
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
  {
    icon: Github,
    label: "GitHub",
    href: "https://github.com/agnihotriparag22",
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

export default function Footer() {
  return (
    <footer className="bg-brown-900 text-beige-200 mt-20">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 items-start">
          {/* Brand */}
          <div>
            <p className="font-serif text-2xl font-semibold text-cream mb-2">
              Parag Agnihotri
            </p>
            <p className="text-brown-400 text-sm max-w-xs">
              Data Scientist passionate about building scalable systems and
              elegant solutions.
            </p>
          </div>

          {/* Contact links */}
          <div>
            <p className="text-sm font-semibold text-beige-300 uppercase tracking-widest mb-4">
              Get in Touch
            </p>
            <ul className="space-y-3">
              {SOCIAL_LINKS.map(({ icon: Icon, label, href, display }) => (
                <li key={label}>
                  <a
                    href={href}
                    target={href.startsWith("http") ? "_blank" : undefined}
                    rel={
                      href.startsWith("http") ? "noopener noreferrer" : undefined
                    }
                    className="flex items-center gap-3 text-brown-300 hover:text-cream transition-colors text-sm group"
                  >
                    <span className="w-8 h-8 rounded-full bg-brown-800 group-hover:bg-brown-700 flex items-center justify-center transition-colors">
                      <Icon size={15} />
                    </span>
                    <span>{display}</span>
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="mt-10 pt-6 border-t border-brown-800 text-center text-brown-500 text-xs">
          © {new Date().getFullYear()} Parag Agnihotri. All rights reserved.
        </div>
      </div>
    </footer>
  );
}
