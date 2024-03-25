import { CopyIcon } from "@radix-ui/react-icons";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ShareIcon } from "@heroicons/react/24/solid";
import { useRef } from "react";
import { useToast } from "../use-toast";
export function ShareLinkButton() {
  const { toast } = useToast();
  const inputRef = useRef(null);

  const copyToClipboard = async () => {
    if (inputRef.current) {
      const url = (inputRef.current as HTMLInputElement).value;
      try {
        await navigator.clipboard.writeText(url);
        toast({
          title: "Success",
          description: "URL copied to clipboard!",
          variant: "success",
          duration: 1000,
        });
      } catch (err) {
        toast({
          title: "Uh oh! Something went wrong.",
          description: "Failed to copy!",
          variant: "destructive",
          duration: 1000,
        });
      }
    }
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button className="flex gap-2 items-center">
          <ShareIcon className="h-[1rem] w-[1rem]" />
          <span className="hidden md:block">Share Link</span>
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Share link</DialogTitle>
          <DialogDescription>
            Anyone who has this link will be able to view this.
          </DialogDescription>
        </DialogHeader>
        <div className="flex items-center space-x-2">
          <div className="grid flex-1 gap-2">
            <Label htmlFor="link" className="sr-only">
              Link
            </Label>
            <Input
              id="link"
              ref={inputRef}
              defaultValue={
                typeof window !== "undefined" ? window.location.href : ""
              }
              readOnly
            />
          </div>
          <Button
            type="button"
            size="sm"
            className="px-3"
            onClick={copyToClipboard}
          >
            <span className="sr-only">Copy</span>
            <CopyIcon className="h-4 w-4" />
          </Button>
        </div>
        <DialogFooter className="sm:justify-start">
          <DialogClose asChild>
            <Button type="button" variant="secondary">
              Close
            </Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
