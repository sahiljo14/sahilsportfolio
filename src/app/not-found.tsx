import { Arrow } from "@/components/icons";
import { asset } from "@/data/profile";

export default function NotFound() {
  return (
    <main id="main-content" tabIndex={-1} className="missing">
      <h1>Nothing here. Probably something I haven’t built yet.</h1>
      <a className="text-link" href={asset("/")}>
        <Arrow /> Back to the story
      </a>
    </main>
  );
}
