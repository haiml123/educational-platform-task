import React, { useState } from "react";
import { Video, Upload, Send } from "lucide-react";
import { CreateVideo as CreateVideoType } from "@/schemas/video.types";

interface CreateVideoProps {
  onSubmit?: (data: CreateVideoType) => void;
  onCancel?: () => void;
}

export default function CreateVideo({ onSubmit, onCancel }: CreateVideoProps) {
  const [submitting, setSubmitting] = useState(false);
  const [formData, setFormData] = useState<CreateVideoType>({
    title: "",
    description: "",
    video_url: "",
    user_id: "",
  });

  const handleInputChange = (field: keyof CreateVideoType, value: string) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleSubmit = (e: React.MouseEvent<HTMLButtonElement>) => {
    setSubmitting(true);
    e.preventDefault();
    if (onSubmit) {
      onSubmit(formData);
    }
    setSubmitting(false);
  };

  const handleCancel = () => {
    if (onCancel) {
      onCancel();
    }
  };

  // Validation: Check if all required fields are filled
  const isFormValid =
    formData.title.trim() !== "" &&
    formData.description.trim() !== "" &&
    formData.video_url.trim() !== "";

  return (
    <div className="bg-white">
      <div className="text-center p-6">
        <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
          <Video className="w-8 h-8 text-blue-600" />
        </div>
        <h2 className="text-2xl font-semibold">Create New Video</h2>
        <p className="text-gray-600 mt-2">
          Share your educational content with the community
        </p>
      </div>

      <div className="p-6">
        <div className="space-y-6">
          <div className="space-y-2">
            <label htmlFor="title" className="text-sm font-medium">
              Video Title *
            </label>
            <input
              id="title"
              type="text"
              placeholder="Enter a descriptive title for your video"
              value={formData.title}
              onChange={(e) => handleInputChange("title", e.target.value)}
              required
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>

          <div className="space-y-2">
            <label htmlFor="description" className="text-sm font-medium">
              Description *
            </label>
            <textarea
              id="description"
              placeholder="Describe what viewers will learn from this video"
              value={formData.description}
              onChange={(e) => handleInputChange("description", e.target.value)}
              rows={4}
              required
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
            />
          </div>

          <div className="space-y-2">
            <label htmlFor="video_url" className="text-sm font-medium">
              Video URL *
            </label>
            <input
              id="video_url"
              type="url"
              placeholder="https://example.com/your-video.mp4"
              value={formData.video_url}
              onChange={(e) => handleInputChange("video_url", e.target.value)}
              required
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
            <p className="text-sm text-gray-600">
              Provide a direct link to your video file (MP4, WebM, etc.)
            </p>
          </div>

          <div className="flex gap-4 pt-4">
            <button
              type="button"
              onClick={handleCancel}
              className="flex-1 px-4 py-2 border border-gray-300 rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 cursor-pointer"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={!isFormValid}
              onClick={handleSubmit}
              className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center cursor-pointer"
            >
              {submitting ? (
                <>
                  <div className="animate-spin mr-2 rounded-full h-4 w-4 border-2 border-white border-t-transparent"></div>
                  Saving...
                </>
              ) : (
                <>
                  <Upload className="w-4 h-4 mr-2" />
                  Create Video
                </>
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
