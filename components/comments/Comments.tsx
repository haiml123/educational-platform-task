import type React from "react";
import { useState } from "react";
import { Send } from "lucide-react";
import Comment from "@/components/comments/Comment";
import { Comments as CommentsType } from "@/schemas/comment.types";
import { createComment } from "@/lib/actions/comment.api";

interface CommentsProps {
  videoId: string;
  comments: CommentsType;
}

export default function Comments({ videoId, comments }: CommentsProps) {
  const [newComment, setNewComment] = useState("");
  const [commentAuthor, setCommentAuthor] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [recentlyAddedId, setRecentlyAddedId] = useState<string | null>(null);

  const handleSubmitComment = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newComment.trim() || !commentAuthor.trim()) return;

    setSubmitting(true);
    try {
      await createComment(
        {
          user_id: commentAuthor,
          video_id: videoId,
          content: newComment,
        },
        `/videos/${videoId}`,
      );
      setNewComment("");
      setTimeout(() => setRecentlyAddedId(null), 3000);
    } catch (error) {
      console.error("Failed to create comment:", error);
      // TODO toast notification
    } finally {
      setSubmitting(false);
    }
  };

  const isDisabled = submitting || !newComment.trim() || !commentAuthor.trim();

  return (
    <div
      className={`bg-white rounded-lg border border-gray-200 hover:shadow-lg transition-shadow`}
    >
      {/* Header */}
      <div className="p-6 border-b border-gray-100">
        <h2 className="text-lg font-semibold text-gray-900 flex items-center gap-2">
          Comments ({comments.length})
        </h2>
      </div>

      {/* Content */}
      <div className="p-6">
        {/* Add Comment Form */}
        <form onSubmit={handleSubmitComment} className="mb-6">
          <div className="space-y-4">
            <div>
              <input
                type="text"
                placeholder="Your name"
                value={commentAuthor}
                onChange={(e) => setCommentAuthor(e.target.value)}
                required
                maxLength={50}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
              />
            </div>

            <div>
              <textarea
                placeholder="Add a comment..."
                value={newComment}
                onChange={(e) => setNewComment(e.target.value)}
                rows={3}
                required
                maxLength={500}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none transition-all duration-200"
              />
              <div className="text-xs text-gray-500 mt-1 text-right">
                {newComment.length}/500
              </div>
            </div>

            <button
              type="submit"
              disabled={isDisabled}
              className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed transition-colors flex items-center justify-center gap-2"
            >
              {submitting ? (
                <>
                  <div className="animate-spin rounded-full h-4 w-4 border-2 border-white border-t-transparent"></div>
                  Posting...
                </>
              ) : (
                <>
                  <Send className="w-4 h-4" />
                  Post Comment
                </>
              )}
            </button>
          </div>
        </form>

        <div className="space-y-4 max-h-96 overflow-y-auto">
          {comments.length === 0 ? (
            <div className="text-center py-8">
              <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Send className="w-6 h-6 text-gray-400" />
              </div>
              <p className="text-gray-500 text-sm">
                No comments yet. Be the first to comment!
              </p>
            </div>
          ) : (
            comments.map((comment) => (
              <Comment
                key={comment.id}
                comment={comment}
                isNew={comment.id === recentlyAddedId}
              />
            ))
          )}
        </div>
      </div>
    </div>
  );
}
