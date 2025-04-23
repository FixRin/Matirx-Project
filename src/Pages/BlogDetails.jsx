// src/pages/BlogDetails.jsx
import React, { useEffect, useState, useCallback } from "react";
import { useSelector } from "react-redux";
import { useParams, useNavigate } from "react-router-dom";
import supabase from "../Utils/Supabase";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "../Css/BlogDetails.css";

const tableMap = {
  trendingblog: "trendingblog",
  latestblog:   "latestblog",
  featuredblog: "featuredblog",
};

export default function BlogDetails() {
  const { section, slug } = useParams();
  const navigate = useNavigate();
  const theme = useSelector((s) => s.theme.mode);
  const lang  = useSelector((s) => s.lang.mode);

  const [post,           setPost]           = useState(null);
  const [loading,        setLoading]        = useState(true);
  const [comments,       setComments]       = useState([]);
  const [newCommentText, setNewCommentText] = useState("");
  const [replyInputs,    setReplyInputs]    = useState({});
  const [replyTo,        setReplyTo]        = useState(null);

  const [session,    setSession]    = useState(null);
  const [profile,    setProfile]    = useState(null);
  const [profilesMap, setProfilesMap] = useState({});

  // Load Supabase session
  useEffect(() => {
    async function loadSession() {
      const { data: { session } } = await supabase.auth.getSession();
      setSession(session);
      const { data: sub } = supabase.auth.onAuthStateChange((_, s) =>
        setSession(s)
      );
      return () => sub.unsubscribe();
    }
    loadSession();
  }, []);

  // Load current user profile
  useEffect(() => {
    if (!session) return;
    supabase
      .from("profiles")
      .select("id, FirstName, Surname, ProfilePicture, role")
      .eq("id", session.user.id)
      .single()
      .then(({ data }) => setProfile(data));
  }, [session]);

  // Build map of "firstname surname" -> ProfilePicture URL
  useEffect(() => {
    supabase
      .from("profiles")
      .select("FirstName, Surname, ProfilePicture")
      .then(({ data }) => {
        const m = {};
        (data || []).forEach((u) => {
          m[`${u.FirstName} ${u.Surname}`.toLowerCase()] = u.ProfilePicture;
        });
        setProfilesMap(m);
      });
  }, []);

  // Keys for localized fields
  const suffix   = lang.toUpperCase();
  const titleKey = `Title${suffix}`;
  const descKey  = `Desc${suffix}`;
  const fullKey  = `FullBlog${suffix}`;

  // Utility to generate IDs
  const genId = () =>
    crypto.randomUUID?.() ?? Math.random().toString(36).slice(2, 10);

  // Fetch post + comments
  const fetchPost = useCallback(async () => {
    if (!tableMap[section]) {
      setLoading(false);
      return;
    }
    const { data, error } = await supabase
      .from(tableMap[section])
      .select("*, comments")
      .eq("Slug", slug)
      .single();
    if (!error) {
      setPost(data);
      setComments(data.comments || []);
    }
    setLoading(false);
  }, [section, slug]);

  useEffect(() => {
    fetchPost();
  }, [fetchPost]);

  // Add comment or reply
  const handleAddComment = async (parent_id = null) => {
    if (!profile) {
      toast.error("You must be logged in to comment");
      return;
    }
    const text = parent_id
      ? (replyInputs[parent_id]?.text || "").trim()
      : newCommentText.trim();
    if (!text) {
      toast.error("Comment cannot be empty");
      return;
    }

    const author = `${profile.FirstName} ${profile.Surname}`;
    const newC = {
      id:           genId(),
      parent_id,
      user_id:      session.user.id,
      author_name:  author,
      comment_text: text,
      created_at:   new Date().toISOString(),
    };
    const updated = [...comments, newC];
    const { error } = await supabase
      .from(tableMap[section])
      .update({ comments: updated })
      .eq("id", post.id);
    if (!error) {
      setComments(updated);
      setNewCommentText("");
      setReplyInputs((p) => ({ ...p, [parent_id]: { text: "" } }));
      setReplyTo(null);
      toast.success("Comment posted");
    } else {
      toast.error("Failed to post comment");
    }
  };

  // Delete comment + nested replies
  const handleDeleteComment = async (commentId) => {
    const filtered = comments.filter(
      (c) => c.id !== commentId && c.parent_id !== commentId
    );
    const { error } = await supabase
      .from(tableMap[section])
      .update({ comments: filtered })
      .eq("id", post.id);
    if (!error) {
      setComments(filtered);
      toast.info("Comment deleted");
    } else {
      toast.error("Failed to delete comment");
    }
    setShowCommentModal(false);
    setCommentToDelete(null);
  };

  // Delete the post (admin only)
  const handleDeletePost = async () => {
    const { error } = await supabase
      .from(tableMap[section])
      .delete()
      .eq("id", post.id);
    if (!error) {
      toast.success("Post deleted");
      navigate(`/${section}`);
    } else {
      toast.error("Failed to delete post");
    }
    setShowPostModal(false);
  };

  // Modal state
  const [showCommentModal, setShowCommentModal] = useState(false);
  const [commentToDelete,  setCommentToDelete]  = useState(null);
  const [showPostModal,    setShowPostModal]    = useState(false);

  // Recursive comments renderer
  const renderComments = (parent_id = null, level = 0) =>
    comments
      .filter((c) => c.parent_id === parent_id)
      .map((c) => {
        const keyName   = c.author_name.toLowerCase();
        const avatarUrl = profilesMap[keyName];
        return (
          <div key={c.id} className="pb-4">
            <div className={`
              ${theme === "dark" ? "bg-gray-800" : "bg-white"}
              rounded-lg shadow-sm p-4
              ${level > 0 ? `ml-[${level * 1.5}rem]` : ""}
            `}>
              <div className="flex items-start space-x-3">
                {avatarUrl ? (
                  <img
                    src={avatarUrl}
                    alt={c.author_name}
                    className="w-10 h-10 rounded-full object-cover"
                  />
                ) : (
                  <div className="w-10 h-10 rounded-full bg-pink-500 flex items-center justify-center text-white font-bold">
                    {c.author_name.charAt(0)}
                  </div>
                )}
                <div className="flex-1">
                  <div className={`
                    flex justify-between items-center text-sm mb-1
                    ${theme === "dark" ? "text-gray-400" : "text-gray-600"}
                  `}>
                    <span className={`font-semibold ${theme === "dark" ? "text-gray-200" : "text-gray-800"}`}>
                      {c.author_name}
                    </span>
                    <span>{new Date(c.created_at).toLocaleDateString()}</span>
                  </div>
                  <p className={`
                    mb-2 whitespace-pre-wrap
                    ${theme === "dark" ? "text-gray-300" : "text-gray-700"}
                  `}>
                    {c.comment_text}
                  </p>
                  <div className="flex items-center space-x-4 mb-2">
                    <button
                      onClick={() => setReplyTo(replyTo === c.id ? null : c.id)}
                      className="text-blue-400 hover:underline text-sm"
                    >
                      {replyTo === c.id ? "Cancel" : "Reply"}
                    </button>
                    {(profile?.role === "admin" || session?.user?.id === c.user_id) && (
                      <button
                        onClick={() => {
                          setCommentToDelete(c);
                          setShowCommentModal(true);
                        }}
                        className="text-red-500 hover:underline text-sm"
                      >
                        Delete
                      </button>
                    )}
                  </div>
                  {replyTo === c.id && (
                    <div className="space-y-2 mb-2">
                      <textarea
                        rows={2}
                        placeholder="Your reply…"
                        value={replyInputs[c.id]?.text || ""}
                        onChange={(e) =>
                          setReplyInputs((p) => ({
                            ...p,
                            [c.id]: { text: e.target.value },
                          }))
                        }
                        className={`
                          w-full px-3 py-2 rounded-lg border focus:ring-2 focus:ring-pink-500
                          ${theme === "dark" ? "border-gray-600 bg-gray-800" : "border-gray-300 bg-gray-50"}
                        `}
                      />
                      <button
                        onClick={() => handleAddComment(c.id)}
                        className="px-4 py-2 bg-pink-600 text-white rounded-lg hover:bg-pink-700"
                      >
                        Post Reply
                      </button>
                    </div>
                  )}
                  {renderComments(c.id, level + 1)}
                </div>
              </div>
            </div>
          </div>
        );
      });

  if (loading) return <div className="pt-20 text-center">Loading…</div>;
  if (!post)   return <div className="pt-20 text-center">Post not found</div>;

  return (
    <div className={`${theme === "dark" ? "bg-gray-900 text-white" : ""} pt-20`}>
      {/* Delete Post Modal */}
      {showPostModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-lg w-80">
            <h2 className="text-lg font-semibold mb-4 text-gray-800 dark:text-gray-200">
              Delete Post?
            </h2>
            <p className="mb-6 text-gray-600 dark:text-gray-400">
              This action cannot be undone.
            </p>
            <div className="flex justify-end space-x-4">
              <button
                onClick={() => setShowPostModal(false)}
                className="px-4 py-2 bg-gray-200 dark:bg-gray-700 rounded hover:bg-gray-300 dark:hover:bg-gray-600"
              >
                Cancel
              </button>
              <button
                onClick={handleDeletePost}
                className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Delete Comment Modal */}
      {showCommentModal && commentToDelete && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-lg w-80">
            <h2 className="text-lg font-semibold mb-4 text-gray-800 dark:text-gray-200">
              Delete Comment?
            </h2>
            <p className="mb-6 text-gray-600 dark:text-gray-400">
              Are you sure you want to delete the comment by{" "}
              <strong>{commentToDelete.author_name}</strong>?
            </p>
            <div className="flex justify-end space-x-4">
              <button
                onClick={() => setShowCommentModal(false)}
                className="px-4 py-2 bg-gray-200 dark:bg-gray-700 rounded hover:bg-gray-300 dark:hover:bg-gray-600"
              >
                Cancel
              </button>
              <button
                onClick={() => handleDeleteComment(commentToDelete.id)}
                className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}

      <ToastContainer position="bottom-left" autoClose={3000} />

      {/* Header */}
      <div className="flex flex-col items-center w-full pt-24">
        <h1 className="text-2xl">{post[titleKey]}</h1>
        <time className="mt-2 text-sm">{post.Date}</time>
        {profile?.role === "admin" && (
          <button
            onClick={() => setShowPostModal(true)}
            className="mt-4 px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700"
          >
            Delete Post
          </button>
        )}
        {post.img && (
          <img
            className="mt-5 rounded-lg"
            src={post.img}
            alt={post[titleKey]}
            style={{ width: "80%", height: 500, objectFit: "cover" }}
          />
        )}
      </div>

      {/* Content & Comments */}
      <main className="l-container mt-8">
        <section>
          {String(post[fullKey] || post[descKey])
            .split("\n\n")
            .map((p, i) => (
              <p key={i} className="mb-4">
                {p}
              </p>
            ))}
        </section>
        <section className="mt-12">
          <h3 className="text-2xl font-bold mb-4">Comments</h3>
          <div className="space-y-2 mb-8">
            <textarea
              rows={3}
              placeholder="Add a comment…"
              value={newCommentText}
              onChange={(e) => setNewCommentText(e.target.value)}
              className={`w-full px-3 py-2 rounded-lg border focus:ring-2 focus:ring-pink-500 ${
                theme === "dark"
                  ? "border-gray-600 bg-gray-800"
                  : "border-gray-300 bg-gray-50"
              }`}
            />
            <button
              onClick={() => handleAddComment(null)}
              className="px-4 py-2 bg-pink-600 text-white rounded-lg hover:bg-pink-700"
            >
              Post Comment
            </button>
          </div>
          {comments.length > 0 ? renderComments() : <p>No comments yet.</p>}
        </section>
      </main>
    </div>
  );
}
