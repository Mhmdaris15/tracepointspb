import LandingPage from "@/app/components/LandingPage";

// LandingPage is a Client Component that manages locale state (EN ↔ RU)
// and renders the full site. This Server Component is intentionally minimal.
export default function Home() {
  return <LandingPage />;
}
