export const profile = {
  name: "Sahil Joshi",
  role: "Builder, co-founder of Kramiva Technologies",
  location: "Pune, India",
  school: "Electronics & Communication Engineering, MIT-WPU, Pune",
  email: "sahiljo.work@gmail.com",
  github: "https://github.com/sahiljo14",
  kramiva: "https://kramiva.com",
};

export const site = {
  url:
    process.env.NEXT_PUBLIC_SITE_URL ??
    "https://sahiljo14.github.io/sahilsportfolio",
  title: "Sahil Joshi — I wanted a gaming PC. Everything else followed.",
  description:
    "The story of how wanting a gaming PC led Sahil Joshi through hardware, crypto, Python, Linux and electronics to building Agent Orchestrator and co-founding Kramiva Technologies.",
};

export const socialImage = {
  url: `${site.url}/images/social-preview.png`,
  width: 1200,
  height: 630,
  alt: "Sahil Joshi — I wanted a gaming PC. Everything else followed.",
};

export function asset(path: string) {
  return `${process.env.NEXT_PUBLIC_BASE_PATH ?? ""}${path}`;
}
