import Link from "next/link";
import { buttonVariants } from "@/components/ui/button";

export default function NotFound() {
  return (
    <div className="container min-h-[70vh] flex flex-col items-center justify-center text-center py-20">
      <p className="font-mono text-xs text-accent uppercase tracking-wider">
        Erreur 0x404
      </p>
      <h1 className="mt-3 text-4xl md:text-5xl font-semibold tracking-tight">
        Page introuvable
      </h1>
      <p className="mt-4 text-muted-foreground max-w-md text-balance">
        L'adresse demandée ne pointe vers aucune ressource. Soit le lien est
        cassé, soit la page n'a jamais existé.
      </p>
      <Link
        href="/"
        className={`mt-8 ${buttonVariants({ variant: "primary", size: "lg" })}`}
      >
        Retour à l'accueil
      </Link>
    </div>
  );
}
