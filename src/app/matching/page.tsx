import Link from "next/link";

import { LatestPost } from "~/app/_components/post";
import { api, HydrateClient } from "~/trpc/server";
import PaymentForm from "../../components/organisms/form";

export default function Page() {
  return (
    <main className="bg-background dark flex min-h-screen items-center justify-center">
      <PaymentForm />
    </main>
  );
}
