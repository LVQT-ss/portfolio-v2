import { site } from "@/content/site";

export default function Footer() {
  return (
    <footer className="border-t border-border/60 px-4 py-8 sm:px-6">
      <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-3 text-sm text-muted sm:flex-row">
        <p>
          © {new Date().getFullYear()} {site.name}
        </p>
        <p>
          Built with Next.js · <span className="text-gold">Available for projects</span>
        </p>
      </div>
    </footer>
  );
}
