import { authOptions } from "@/lib/auth";
import { Session, getServerSession } from "next-auth";

export default async function RegisterTitle() {
  const session: Session | null = await getServerSession(authOptions);
  return (
    <h1 className="text-3xl text-center md:text-5xl font-extrabold py-10">
      Let`s manage your subscription plan {session!.user?.name.split(" ")[0]}.
    </h1>
  );
}
