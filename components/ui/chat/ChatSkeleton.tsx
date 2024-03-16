import { Button } from "../button";

export default function ChatSkeleton() {
  return (
    <div className="flex flex-col h-screen">
      <div className="flex justify-end p-4">
        <div className="flex gap-4">
          <Button className="bg-gray-800 w-10 md:w-32 animate-pulse"></Button>
          <Button className="bg-gray-800 w-10 md:w-32 animate-pulse"></Button>
          <Button className="bg-gray-800 w-10 md:w-32 animate-pulse"></Button>
        </div>
      </div>
      <div className="flex gap-4 overflow-x-auto border-2 rounded-full p-2 my-6 bg-gray-800 animate-pulse h-16"></div>
      <div className="flex flex-col gap-4 flex-grow overflow-y-auto p-4">
        <div className="flex flex-row items-center gap-2 justify-end animate-pulse">
          <div className="bg-gray-800 p-2 rounded-md w-40 h-8"></div>
          <div className="bg-gray-800 rounded-full w-12 h-12"></div>
        </div>
        <div className="flex flex-row items-center gap-2 justify-end  animate-pulse">
          <div className="bg-gray-800 p-2 rounded-md w-80 h-20"></div>
          <div className="bg-gray-800 rounded-full w-12 h-12"></div>
        </div>
        <div className="flex flex-row-reverse items-center gap-2 justify-end  animate-pulse">
          <div className="bg-gray-800 p-2 rounded-md w-40 h-8"></div>
          <div className="bg-gray-800 rounded-full w-12 h-12"></div>
        </div>
        <div className="flex flex-row-reverse items-center gap-2 justify-end  animate-pulse">
          <div className="bg-gray-800 p-2 rounded-md w-80 h-20"></div>
          <div className="bg-gray-800 rounded-full w-12 h-12"></div>
        </div>
      </div>
    </div>
  );
}
