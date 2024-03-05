export default function LoadingSpinner({
  width,
  height,
}: {
  width: string;
  height: string;
}) {
  return (
    <div className="flex justify-center items-center">
      <div
        className={`animate-spin rounded-full h-${height} w-${width} border-2 border-gray-300 border-t-gray-900`}
      ></div>
    </div>
  );
}
