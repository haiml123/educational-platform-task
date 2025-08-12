import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";
import CreateVideo from "@/components/video/CreateVideo";
import { CreateVideo as CreateVideoType } from "@/schemas/video.types";
import { VisuallyHidden } from "@radix-ui/react-visually-hidden";

interface CreateVideoDialogProps {
  isOpen: boolean;
  handleOpenChange: (isOpen: boolean) => void;
  onSubmit?: (data: CreateVideoType) => void;
}

export default function CreateVideoDialog({
  isOpen,
  handleOpenChange,
  onSubmit,
}: CreateVideoDialogProps) {
  return (
    <Dialog open={isOpen} onOpenChange={handleOpenChange}>
      <DialogContent className="p-0 border-0">
        <VisuallyHidden asChild>
          <DialogTitle>Create Video</DialogTitle>
        </VisuallyHidden>
        <CreateVideo
          onSubmit={onSubmit}
          onCancel={() => handleOpenChange(false)}
        />
      </DialogContent>
    </Dialog>
  );
}
