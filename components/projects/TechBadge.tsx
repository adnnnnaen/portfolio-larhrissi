import { Badge } from "@/components/ui/badge";

export function TechBadge({ name }: { name: string }) {
  return <Badge variant="default">{name}</Badge>;
}
