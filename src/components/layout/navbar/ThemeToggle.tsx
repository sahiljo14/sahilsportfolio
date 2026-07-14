import { Button } from "@/components/ui/button";
import { Moon } from "lucide-react";

export default function ThemeToggle() {
  return (
    <Button
      type="button"
      variant="ghost"
      size="icon"
      disabled
      aria-label="Theme toggle coming soon"
      title="Theme toggle coming soon"
    >
      <Moon />
    </Button>
  );
}
