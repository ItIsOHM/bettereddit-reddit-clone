import Link from "next/link";
import { Icons } from "./Icons";
import { buttonVariants } from "./ui/Button";
import { getAuthSession } from "@/lib/auth";
import UserAccountNav from "./UserAccountNav";
import { ThemeToggle } from "./ThemeToggle";
import SearchBar from "../SearchBar";

const Navbar = async () => {
  const session = await getAuthSession();
  return (
    <div className="fixed top-0 inset-x-0 h-fit border-b border-zinc-300 z-[10] py-2 backdrop-filter backdrop-blur-lg bg-opacity-30">
      <div className="container max-w-7xl h-full mx-auto flex items-center justify-between gap-2">
        <Link href="/" className="flex gap-2 items-center">
          <Icons.logo className="h-8 w-8 sm:h-6 sm:w-6" />
          <p className="sr-only md:not-sr-only text-sm font-medium">
            Bettereddit
          </p>
        </Link>

        <SearchBar/>
        
        <div className="h-full flex items-center justify-between">
          {session?.user ? (
            <UserAccountNav user={session.user} />
          ) : (
            <Link
              href="/sign-in"
              className={buttonVariants({ variant: "default" })}
            >
              Sign In
            </Link>
          )}
        </div>
      </div>
    </div>
  );
};

export default Navbar;
