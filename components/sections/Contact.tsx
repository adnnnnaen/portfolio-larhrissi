import Link from "next/link";
import { Download, Github, Linkedin, Mail, Phone } from "lucide-react";
import { AnimatedSection } from "@/components/shared/AnimatedSection";
import { SectionHeading } from "@/components/shared/SectionHeading";
import { buttonVariants } from "@/components/ui/button";
import { profile } from "@/data/profile";

export function Contact() {
  return (
    <AnimatedSection id="contact" className="container py-24">
      <SectionHeading index="06" title="Contact" />

      <div className="rounded-lg border border-border bg-card p-8 md:p-12">
        <p className="font-mono text-xs text-accent uppercase tracking-wider mb-3">
          Disponible
        </p>
        <h3 className="text-2xl md:text-3xl font-semibold tracking-tight text-balance">
          Je cherche un poste en développement embarqué.
        </h3>
        <p className="mt-3 text-muted-foreground leading-relaxed max-w-2xl text-balance">
          Si tu travailles sur du firmware, du RTOS, du Linux embarqué, ou un
          projet qui touche au bas niveau — je serais ravi d'en discuter.
        </p>

        <div className="mt-8 grid sm:grid-cols-2 gap-3">
          <ContactRow
            icon={<Mail className="h-4 w-4" />}
            label="Email"
            value={profile.email}
            href={`mailto:${profile.email}`}
          />
          <ContactRow
            icon={<Phone className="h-4 w-4" />}
            label="Téléphone"
            value={profile.phone}
            href={`tel:${profile.phone.replace(/\s/g, "")}`}
          />
          <ContactRow
            icon={<Linkedin className="h-4 w-4" />}
            label="LinkedIn"
            value={profile.linkedinUrl.replace(/^https?:\/\//, "")}
            href={profile.linkedinUrl}
            external
          />
          <ContactRow
            icon={<Github className="h-4 w-4" />}
            label="GitHub"
            value={profile.githubUrl.replace(/^https?:\/\//, "")}
            href={profile.githubUrl}
            external
          />
        </div>

        <div className="mt-10 flex flex-wrap gap-3">
          <Link
            href={`mailto:${profile.email}`}
            className={buttonVariants({ variant: "primary", size: "lg" })}
          >
            <Mail className="h-4 w-4" />
            Écrire un message
          </Link>
          <Link
            href={profile.cvPath}
            download
            className={buttonVariants({ variant: "secondary", size: "lg" })}
          >
            <Download className="h-4 w-4" />
            Télécharger le CV
          </Link>
        </div>
      </div>
    </AnimatedSection>
  );
}

function ContactRow({
  icon,
  label,
  value,
  href,
  external = false,
}: {
  icon: React.ReactNode;
  label: string;
  value: string;
  href: string;
  external?: boolean;
}) {
  return (
    <Link
      href={href}
      target={external ? "_blank" : undefined}
      rel={external ? "noopener noreferrer" : undefined}
      className="flex items-center gap-3 px-4 py-3 rounded-md border border-border bg-background hover:border-accent/50 hover:text-accent transition-colors group"
    >
      <span className="text-muted-foreground group-hover:text-accent transition-colors">
        {icon}
      </span>
      <span className="flex-1 min-w-0">
        <span className="block font-mono text-[10px] uppercase tracking-wider text-muted-foreground">
          {label}
        </span>
        <span className="block text-sm text-foreground group-hover:text-accent transition-colors truncate">
          {value}
        </span>
      </span>
    </Link>
  );
}
