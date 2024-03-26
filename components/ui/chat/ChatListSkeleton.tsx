export default function ChatListSkeleton() {
  return (
    <div className=" p-4 cursor-pointer ">
      <div className="flex justify-between">
        <div className="flex gap-4 items-center">
          <div className="bg-gray-800 rounded-full w-12 h-12 animate-pulse"></div>
          <div className="flex flex-col gap-2">
            <span className="bg-gray-800 rounded-full w-36 h-4 animate-pulse"></span>
            <span className="bg-gray-800 rounded-full w-36 h-4 animate-pulse"></span>
          </div>
        </div>
        <div className="hidden md:flex flex-col gap-2 items-end">
          <span className="bg-gray-800 rounded-full w-36 h-4 animate-pulse"></span>
          <span className="bg-gray-800 rounded-full w-28 h-4 animate-pulse"></span>
        </div>
      </div>
    </div>
  );
}
