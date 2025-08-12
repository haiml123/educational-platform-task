"use client";
import { useState } from "react";
import { Plus } from "lucide-react";
import CreateVideoDialog from "./CreateVideoDialog";
import { CreateVideo } from "@/schemas/video.types";
import { createVideo } from "@/lib/actions/video.api";

type CreateVideoModalButtonProps = {
  onCreateVideoClick?: () => void;
};

export default function CreateVideoModalButton({
  onCreateVideoClick,
}: CreateVideoModalButtonProps) {
  const [open, setOpen] = useState(false);

  const onSubmit = async (video: CreateVideo) => {
    try {
      await createVideo(video);
      setOpen(false);
    } catch (e) {
      // TODO show error toast
      console.error(e);
    }
  };

  return (
    <>
      <button
        type="button"
        onClick={() => {
          onCreateVideoClick?.();
          setOpen(true);
        }}
        className={`flex items-center bg-blue-600 hover:bg-blue-700 text-white px-2 py-2 rounded-md transition-colors cursor-pointer`}
      >
        <Plus className="w-4 h-4 md:mr-4" />
        <span className="max-md:hidden">Create Video</span>
      </button>

      <CreateVideoDialog
        isOpen={open}
        handleOpenChange={setOpen}
        onSubmit={onSubmit}
      />
    </>
  );
}
