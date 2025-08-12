import type React from "react";
import { formatDate } from "@/helpers";
import { Comment as CommentType } from "@/schemas/comment.types";
interface CommentProps {
  comment: CommentType;
  isNew?: boolean;
}

export default function Comment({ comment, isNew = false }: CommentProps) {
  const getAvatarColor = (userId: string) => {
    const colors = [
      "from-blue-500 to-blue-600",
      "from-green-500 to-green-600",
      "from-purple-500 to-purple-600",
      "from-red-500 to-red-600",
      "from-yellow-500 to-yellow-600",
      "from-indigo-500 to-indigo-600",
      "from-pink-500 to-pink-600",
      "from-teal-500 to-teal-600",
    ];
    const hash = userId.split("").reduce((a, b) => {
      a = (a << 5) - a + b.charCodeAt(0);
      return a & a;
    }, 0);
    return colors[Math.abs(hash) % colors.length];
  };

  return (
    <div
      className={`border-b border-gray-100 pb-4 last:border-b-0 transition-all duration-300 ${
        isNew ? "bg-blue-50 -mx-4 px-4 rounded-md animate-fade-in" : ""
      }`}
    >
      <div className="flex items-start gap-3">
        {/* Avatar */}
        <div
          className={`w-9 h-9 bg-gradient-to-br ${getAvatarColor(comment.user_id)} rounded-full flex items-center justify-center flex-shrink-0 shadow-sm`}
        >
          <span className="text-white text-sm font-semibold">
            {comment.user_id.charAt(0).toUpperCase()}
          </span>
        </div>

        {/* Comment Content */}
        <div className="flex-1 min-w-0">
          {/* Header with user info and timestamp */}
          <div className="flex items-center gap-2 mb-1">
            <span className="font-medium text-sm text-gray-900 truncate">
              {comment.user_id}
            </span>
            <span className="text-xs text-gray-500 flex-shrink-0">
              {formatDate(comment.created_at)}
            </span>
          </div>

          <p className="text-sm text-gray-700 leading-relaxed break-words">
            {comment.content}
          </p>
        </div>
      </div>
    </div>
  );
}
