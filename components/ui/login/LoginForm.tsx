import Image from "next/image";
import { Button } from "../button";

export default function LoginForm({ login }: { login: () => void }) {
  return (
    <div className="flex justify-center items-center">
      <div className="border-2 rounded-xl p-10 flex justify-center items-center flex-col gap-6">
        <Image src={"/img/locker.png"} alt="locker" width={100} height={100} />
        <h1 className="text-4xl font-bold">Sign In</h1>
        <p>Use your Google account to get started.</p>
        <Button
          className="flex items-center justify-center gap-2 p-6  rounded-md w-full"
          onClick={() => login()}
        >
          <Image src={"/img/2504739.png"} alt="locker" width={20} height={20} />
          <span className="font-bold text-lg">Continiue with Google</span>
        </Button>
      </div>
    </div>
  );
}
