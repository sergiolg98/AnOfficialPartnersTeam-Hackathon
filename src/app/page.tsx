import Link from "next/link";
import ClientList from "~/components/organisms/client-list";

export default function Page() {
  return (
    <main className="min-h-screen">
      {/* Hero Background with Gradient Overlay */}
      <div className="relative overflow-hidden bg-black/5 py-24">
        <div className="bg-grid-white/10 absolute inset-0" />
        <div className="absolute inset-0 bg-gradient-to-t from-background to-background/0" />

        {/* Main Hero Content */}
        <div className="container relative mx-auto px-6">
          <div className="mx-auto max-w-4xl text-center">
            <h1 className="mb-6 bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-7xl font-bold tracking-tight text-transparent">
              DevProfile AI
            </h1>
            <p className="mb-4 bg-gradient-to-r from-gray-800 to-gray-600 bg-clip-text text-3xl font-semibold text-transparent">
              Intelligent Team Member Recommendations
            </p>
            <p className="text-xl text-muted-foreground">
              Where Experience Meets Opportunity
            </p>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="mx-auto -mt-8 max-w-7xl px-6">
        {/* Floating Stats Cards */}
        <div className="mb-12 grid grid-cols-1 gap-6 md:grid-cols-3">
          <div className="rounded-xl border bg-card p-8 shadow-lg transition-shadow hover:shadow-xl">
            <div className="flex flex-col">
              <p className="text-sm font-medium uppercase tracking-wide text-muted-foreground">
                Available Developers
              </p>
              <p className="mt-2 text-3xl font-bold">24</p>
              <p className="mt-2 text-sm text-muted-foreground">+3 this week</p>
            </div>
          </div>
          <div className="rounded-xl border bg-card p-8 shadow-lg transition-shadow hover:shadow-xl">
            <div className="flex flex-col">
              <p className="text-sm font-medium uppercase tracking-wide text-muted-foreground">
                Active Projects
              </p>
              <p className="mt-2 text-3xl font-bold">12</p>
              <p className="mt-2 text-sm text-muted-foreground">
                5 need matching
              </p>
            </div>
          </div>
          <div className="rounded-xl border bg-card p-8 shadow-lg transition-shadow hover:shadow-xl">
            <div className="flex flex-col">
              <p className="text-sm font-medium uppercase tracking-wide text-muted-foreground">
                Successful Matches
              </p>
              <p className="mt-2 text-3xl font-bold">89%</p>
              <p className="mt-2 text-sm text-muted-foreground">
                +2.5% from last month
              </p>
            </div>
          </div>
        </div>

        {/* Developer Profiles Section */}
        <div className="space-y-8">
          <div className="flex items-end justify-between">
            <div>
              <h2 className="mb-2 text-3xl font-bold tracking-tight">
                Developer Profiles
              </h2>
              <p className="text-muted-foreground">
                AI-powered matches based on real-time experience tracking
              </p>
            </div>
            <Link href="/new-client">Add New Profile</Link>
          </div>

          {/* Main Content Card */}
          <div className="rounded-xl border bg-card p-8 shadow-sm">
            <ClientList />
          </div>
        </div>

        {/* Feature Cards */}
        <div className="mb-16 mt-12 grid grid-cols-1 gap-8 md:grid-cols-2">
          <div className="rounded-xl border bg-card p-8 transition-shadow hover:shadow-lg">
            <h3 className="mb-3 text-xl font-semibold">
              Real-time Experience Tracking
            </h3>
            <p className="text-muted-foreground">
              Our AI continuously analyzes daily logs and project contributions,
              ensuring the most up-to-date skill profiles for accurate team
              matching.
            </p>
          </div>
          <div className="rounded-xl border bg-card p-8 transition-shadow hover:shadow-lg">
            <h3 className="mb-3 text-xl font-semibold">RAG-powered Matching</h3>
            <p className="text-muted-foreground">
              Advanced retrieval-augmented generation pipeline delivers precise
              recommendations based on comprehensive experience analysis.
            </p>
          </div>
        </div>
      </div>
    </main>
  );
}
