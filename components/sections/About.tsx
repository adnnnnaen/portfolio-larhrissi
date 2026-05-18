import { AnimatedSection } from "@/components/shared/AnimatedSection";
import { SectionHeading } from "@/components/shared/SectionHeading";

export function About() {
  return (
    <AnimatedSection id="about" className="container py-24">
      <SectionHeading index="01" title="À propos" />

      <div className="grid md:grid-cols-[1.5fr_1fr] gap-10 items-start">
        <div className="space-y-5 text-foreground/90 leading-relaxed">
          <p>
            Diplômé de <span className="text-foreground font-medium">Grenoble INP — ESISAR</span> en 2025,
            après deux années de classes préparatoires MP au Maroc. Je suis ingénieur
            en systèmes embarqués, passionné par le développement bas niveau et la
            mécanique fine des microcontrôleurs.
          </p>

          <p>
            Ce qui m'anime techniquement : descendre dans la pile.
            Comprendre comment un programme C devient des cycles d'horloge sur un
            cœur ARM ou RISC-V, comment un firmware orchestre des périphériques
            via DMA et interruptions, comment un RTOS découpe le temps. J'aime
            les projets où il faut <span className="text-foreground font-medium">lire la datasheet</span>,
            ouvrir l'analyseur logique, et écrire du code qui dialogue
            directement avec le matériel.
          </p>

          <p>
            À côté du code, je suis fasciné par l'<span className="text-foreground font-medium">astronomie</span> et
            le secteur spatial — l'électronique embarquée satellite, le NewSpace, et tout ce qui se passe dans
            ce silicium qui tient dans la paume.
          </p>
        </div>

        <aside className="rounded-lg border border-border bg-card p-6 space-y-4">
          <p className="font-mono text-xs text-accent uppercase tracking-wider">
            En bref
          </p>
          <ul className="space-y-3 text-sm">
            <Item label="Basé à" value="Valence, France" />
            <Item label="Diplôme" value="Grenoble INP ESISAR (2025)" />
            <Item label="Cherche" value="Poste en développement embarqué" />
            <Item label="Langues" value="FR (bilingue) · EN (C1) · AR (natif)" />
          </ul>
        </aside>
      </div>
    </AnimatedSection>
  );
}

function Item({ label, value }: { label: string; value: string }) {
  return (
    <li className="grid grid-cols-[5rem_1fr] gap-4">
      <span className="font-mono text-[11px] text-muted-foreground uppercase tracking-wider mt-0.5">
        {label}
      </span>
      <span className="text-foreground/90">{value}</span>
    </li>
  );
}
