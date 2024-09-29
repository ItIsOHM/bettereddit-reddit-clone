import GeneralFeed from "@/components/GeneralFeed";
import CustomFeed from "@/components/CustomFeed";
import { buttonVariants } from "@/components/ui/ui/Button";
import { getAuthSession } from "@/lib/auth";
import { HomeIcon } from "lucide-react";
import Link from "next/link";

export const dynamic = "force-dynamic";
export const fetchCache = "force-no-store";

export default async function Home() {
  const session = await getAuthSession();

  return (
    <>
      <h1 className="font-bold text-3xl md:text-4xl">Your Feed</h1>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-y-4 md:gap-x-4 py-6">
        {session ? <CustomFeed /> : <GeneralFeed />}
        <div className="overflow-hidden h-fit rounded-lg border border-gray-400 border-dashed order-first md:order-last">
          <div className="bg-primary px-6 py-4">
            <p className="font-semibold py-3 flex items-center gap-1.5">
              <HomeIcon className="w-4 h-4" />
              Home
            </p>
          </div>

          <div className="-my-3 divide-gray-100 px-6 py-4 text-sm leading-6">
            <div className="flex justify-between gap-x-4 py-3">
              <p>
                Your Redidit Homepage. Checkout your favourite communities
                here!
              </p>
            </div>

            <Link
              className={buttonVariants({
                variant: "outline",
                className: "w-full mt-4 mb-6",
              })}
              href="/r/create"
            >
              Create a Community
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}
