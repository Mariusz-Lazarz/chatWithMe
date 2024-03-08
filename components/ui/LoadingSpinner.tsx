import { ReloadIcon } from "@radix-ui/react-icons";

export default function LoadingSpinner({
  width,
  height,
}: {
  width: string;
  height: string;
}) {
  return (
    <div className="flex justify-center items-center">
      <ReloadIcon className={` h-${height} w-${width} animate-spin`} />
    </div>
  );
}
