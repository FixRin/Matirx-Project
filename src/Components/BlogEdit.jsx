// Updated BlogEdit.jsx with dark mode hover effects and fetching all blog post fields

import React, { useState, useEffect, useMemo } from "react";
import { FiEdit2, FiTrash2, FiPlus, FiSearch } from "react-icons/fi";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { useSelector } from "react-redux";
import supabase from "../Utils/Supabase";

export default function BlogEdit() {
  const theme = useSelector((state) => state.theme.mode);
  const [posts, setPosts] = useState([]);
  const [selectedPost, setSelectedPost] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [deleteId, setDeleteId] = useState(null);
  const [deleteSection, setDeleteSection] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [sortField, setSortField] = useState("Date");
  const [sortDirection, setSortDirection] = useState("desc");
  const [loading, setLoading] = useState(false);
  const [blogSections, setBlogSections] = useState([]);

  const [formData, setFormData] = useState({
    TitleEN: "",
    DescEN: "",
    FullBlogEN: "",
    TitleAZ: "",
    DescAZ: "",
    img: "",
    Slug: "",
    AuthorName: "",
    Date: "",
    comments: [],
    status: "published",
  });

  const postsPerPage = 5;

  const fetchPosts = async () => {
    setLoading(true);
    const [{ data: tData }, { data: lData }, { data: fData }] =
      await Promise.all([
        supabase.from("trendingblog").select("*"),
        supabase.from("latestblog").select("*"),
        supabase.from("featuredblog").select("*"),
      ]);
    const t = (tData || []).map((p) => ({ ...p, section: "trendingblog" }));
    const l = (lData || []).map((p) => ({ ...p, section: "latestblog" }));
    const f = (fData || []).map((p) => ({ ...p, section: "featuredblog" }));
    setPosts([...t, ...l, ...f]);
    setLoading(false);
  };

  useEffect(() => {
    fetchPosts();
  }, []);

  const handleSort = (field) => {
    setSortDirection(
      sortField === field ? (sortDirection === "asc" ? "desc" : "asc") : "asc"
    );
    setSortField(field);
  };

  const filteredPosts = useMemo(() => {
    return posts
      .filter((p) => p.TitleEN.toLowerCase().includes(searchTerm.toLowerCase()))
      .sort((a, b) =>
        sortDirection === "asc"
          ? a[sortField] > b[sortField]
            ? 1
            : -1
          : a[sortField] < b[sortField]
          ? 1
          : -1
      );
  }, [posts, searchTerm, sortField, sortDirection]);

  const totalPages = Math.ceil(filteredPosts.length / postsPerPage);
  const paginatedPosts = filteredPosts.slice(
    (currentPage - 1) * postsPerPage,
    currentPage * postsPerPage
  );

  const resetForm = () => {
    setSelectedPost(null);
    setDeleteSection("");
    setFormData({
      TitleEN: "",
      DescEN: "",
      FullBlogEN: "",
      TitleAZ: "",
      DescAZ: "",
      img: "",
      Slug: "",
      AuthorName: "",
      Date: "",
      comments: [],
      status: "published",
    });
    setBlogSections([]);
  };

  const handleEdit = (post) => {
    setSelectedPost(post);
    setBlogSections([post.section]);
    setFormData({
      TitleEN: post.TitleEN,
      DescEN: post.DescEN,
      FullBlogEN: post.FullBloGEN,
      TitleAZ: post.TitleAZ,
      DescAZ: post.DescAZ,
      img: post.img,
      Slug: post.Slug,
      AuthorName: post.AuthorName,
      Date: post.Date,
      comments: post.comments || [],
      status: post.status || "published",
    });
    console.log(handleEdit)
  };

  const handleDelete = (post) => {
    setDeleteId(post.id);
    setDeleteSection(post.section);
    setShowDeleteModal(true);
  };

  const confirmDelete = async () => {
    setLoading(true);
    await supabase.from(deleteSection).delete().eq("id", deleteId);
    setPosts(
      posts.filter((p) => p.id !== deleteId || p.section !== deleteSection)
    );
    setShowDeleteModal(false);
    resetForm();
    setLoading(false);
  };

  const handleCheckboxChange = (section) => {
    setBlogSections((prev) =>
      prev.includes(section)
        ? prev.filter((s) => s !== section)
        : [...prev, section]
    );
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    if (selectedPost) {
      for (const sec of blogSections) {
        const { data, error } = await supabase
          .from(sec)
          .update(formData)
          .eq("id", selectedPost.id);
        if (!error)
          setPosts(
            posts.map((p) =>
              p.id === selectedPost.id && p.section === sec
                ? { ...data[0], section: sec }
                : p
            )
          );
      }
    } else {
      for (const sec of blogSections) {
        const { data, error } = await supabase
          .from(sec)
          .insert([formData])
          .select();
        if (!error) setPosts([{ ...data[0], section: sec }, ...posts]);
      }
    }
    resetForm();
    setLoading(false);
  };

  const baseBg =
    theme === "dark"
      ? "bg-gray-900 text-white"
      : "bg-gradient-to-br from-gray-50 to-gray-100 text-gray-900";
  const cardBg =
    theme === "dark" ? "bg-gray-800 text-white" : "bg-white text-gray-900";
  const inputBg =
    theme === "dark"
      ? "bg-gray-700 border-gray-600 text-white"
      : "bg-white border-gray-300 text-gray-900";
  const hoverRow = theme === "dark" ? "hover:bg-gray-700" : "hover:bg-gray-50";

  return (
    <div className={`${baseBg} min-h-screen p-6`}>
      <div className="max-w-7xl mx-auto space-y-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Posts List */}
          <div className={`${cardBg} rounded-xl shadow-lg p-8 lg:col-span-2`}>
            <div className="flex flex-col md:flex-row justify-between items-center mb-8 gap-4">
              <h2 className="text-3xl font-bold">Blog Posts</h2>
              <div className="flex items-center gap-4">
                <div className="relative">
                  <FiSearch className="absolute left-3 top-3 text-gray-400" />
                  <input
                    type="text"
                    placeholder="Search posts..."
                    className={`pl-10 pr-4 py-2 rounded-lg focus:ring-2 focus:ring-blue-500 border ${inputBg}`}
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
                </div>
                <button
                  onClick={resetForm}
                  className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                >
                  <FiPlus className="mr-2" /> New Post
                </button>
              </div>
            </div>
            {loading ? (
              <p>Loading posts…</p>
            ) : paginatedPosts.length === 0 ? (
              <p>No blog posts found.</p>
            ) : (
              <>
                <table className="w-full">
                  <thead className={`${theme=='dark'?"bg-gray-900":"bg-gray-50"}`}>
                    <tr>
                      <th
                        onClick={() => handleSort("TitleEN")}
                        className="px-4 py-2 cursor-pointer"
                      >
                        Title
                      </th>
                      <th
                        onClick={() => handleSort("Date")}
                        className="px-4 py-2 cursor-pointer"
                      >
                        Date
                      </th>
                      <th
                        onClick={() => handleSort("status")}
                        className="px-4 py-2 cursor-pointer"
                      >
                        Status
                      </th>
                      <th className="px-4 py-2 text-right">Actions</th>
                    </tr>
                  </thead>
                  <tbody >
                    {paginatedPosts.map((p) => (
                      <tr
                        key={`${p.section}-${p.id}`}
                        className={`${hoverRow} border-t `}
                      >
                        <td className="px-4 py-2">{p.TitleEN}</td>
                        <td className="px-4 py-2">
                          {new Date(p.Date).toLocaleDateString()}
                        </td>
                        <td className="px-4 py-2">
                          <span
                            className={`px-2 py-1 rounded-full text-sm ${
                              p.status === "published"
                                ? "bg-green-100 text-green-800"
                                : "bg-yellow-100 text-yellow-800"
                            }`}
                          >
                            {p.status}
                          </span>
                        </td>
                        <td className="px-4 py-2 text-right space-x-2">
                          <button
                            onClick={() => handleEdit(p)}
                            className="text-blue-600 hover:text-blue-800"
                          >
                            <FiEdit2 />
                          </button>
                          <button
                            onClick={() => handleDelete(p)}
                            className="text-red-600 hover:text-red-800"
                          >
                            <FiTrash2 />
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
                <div className={` flex justify-center py-4 `}>
                  {Array.from({ length: totalPages }, (_, i) => (
                    <button
                      key={i}
                      onClick={() => setCurrentPage(i + 1)}
                      className={`px-4 py-2 mx-1 rounded-md ${
                        currentPage === i + 1
                          ? "bg-blue-500 text-white"
                          : "bg-white border text-black"
                      }`}
                    >
                      {i + 1}
                    </button>
                  ))}
                </div>
              </>
            )}
          </div>

          {/* Form */}
          <div className={`${cardBg} rounded-xl shadow-lg p-8`}>
            <h3 className="text-xl font-semibold mb-6">
              {selectedPost ? "Edit Post" : "Create New Post"}
            </h3>
            <form onSubmit={handleSubmit} className="space-y-4">
              {/* Title EN */}
              <div className="flex flex-col">
                <label>Title (EN)</label>
                
                <input
                  type="text"
                  className={`px-4 py-2 rounded-md focus:ring-2 focus:ring-blue-500 border ${inputBg}`}
                  value={formData.TitleEN}
                  onChange={(e) =>
                    setFormData({ ...formData, TitleEN: e.target.value })
                  }
                  required
                />
              </div>
              {/* Desc EN */}
              <div className="flex flex-col">
                <label>Description (EN)</label>
                <textarea
                  rows={3}
                  className={`px-4 py-2 rounded-md focus:ring-2 focus:ring-blue-500 border ${inputBg}`}
                  value={formData.DescEN}
                  onChange={(e) =>
                    setFormData({ ...formData, DescEN: e.target.value })
                  }
                  required
                />
              </div>
              {/* FullBlog EN */}
              <div className="flex flex-col">
                <label>Full Blog (EN)</label>
                <ReactQuill
                  theme="snow"
                  value={formData.FullBlogEN}
                  onChange={(content) =>
                    setFormData({ ...formData, FullBlogEN: content })
                  }
                />
              </div>
              {/* Title AZ */}
              <div className="flex flex-col">
                <label>Title (AZ)</label>
                <input
                  type="text"
                  className={`px-4 py-2 rounded-md focus:ring-2 focus:ring-blue-500 border ${inputBg}`}
                  value={formData.TitleAZ}
                  onChange={(e) =>
                    setFormData({ ...formData, TitleAZ: e.target.value })
                  }
                  required
                />
              </div>
              {/* Desc AZ */}
              <div className="flex flex-col">
                <label>Description (AZ)</label>
                <textarea
                  rows={3}
                  className={`px-4 py-2 rounded-md focus:ring-2 focus:ring-blue-500 border ${inputBg}`}
                  value={formData.DescAZ}
                  onChange={(e) =>
                    setFormData({ ...formData, DescAZ: e.target.value })
                  }
                  required
                />
              </div>
              {/* Image URL */}
              <div className="flex flex-col">
                <label>Image URL</label>
                <input
                  type="text"
                  className={`px-4 py-2 rounded-md focus:ring-2 focus:ring-blue-500 border ${inputBg}`}
                  value={formData.img}
                  onChange={(e) =>
                    setFormData({ ...formData, img: e.target.value })
                  }
                  required
                />
              </div>
              {/* Slug */}
              <div className="flex flex-col">
                <label>Slug</label>
                <input
                  type="text"
                  className={`px-4 py-2 rounded-md focus:ring-2 focus:ring-blue-500 border ${inputBg}`}
                  value={formData.Slug}
                  onChange={(e) =>
                    setFormData({ ...formData, Slug: e.target.value })
                  }
                  required
                />
              </div>
              {/* Author */}
              <div className="flex flex-col">
                <label>Author</label>
                <input
                  type="text"
                  className={`px-4 py-2 rounded-md focus:ring-2 focus:ring-blue-500 border ${inputBg}`}
                  value={formData.AuthorName}
                  onChange={(e) =>
                    setFormData({ ...formData, AuthorName: e.target.value })
                  }
                  required
                />
              </div>
              {/* Date */}
              <div className="flex flex-col">
                <label>Date</label>
                <input
                  type="date"
                  className={`px-4 py-2 rounded-md focus:ring-2 focus:ring-blue-500 border ${inputBg}`}
                  value={formData.Date}
                  onChange={(e) =>
                    setFormData({ ...formData, Date: e.target.value })
                  }
                  required
                />
              </div>
              {/* Status */}
              <div className="flex flex-col">
                <label>Status</label>
                <select
                  className={`px-4 py-2 rounded-md focus:ring-2 focus:ring-blue-500 border ${inputBg}`}
                  value={formData.status}
                  onChange={(e) =>
                    setFormData({ ...formData, status: e.target.value })
                  }
                  required
                >
                  <option value="published">Published</option>
                  <option value="draft">Draft</option>
                </select>
              </div>
              {/* Sections */}
              <div className="flex flex-col">
                <label>Blog Sections</label>
                <div className="space-x-4">
                  {["trendingblog", "latestblog", "featuredblog"].map((sec) => (
                    <label key={sec} className="inline-flex items-center">
                      <input
                        type="checkbox"
                        checked={blogSections.includes(sec)}
                        onChange={() => handleCheckboxChange(sec)}
                      />
                      <span className="ml-2 capitalize">
                        {sec.replace("blog", " Blog")}
                      </span>
                    </label>
                  ))}
                </div>
              </div>
              {/* Actions */}
              <div className="flex justify-between mt-6">
                <button
                  type="submit"
                  className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                >
                  {selectedPost ? "Update" : "Create"} Post
                </button>
                <button
                  type="button"
                  onClick={resetForm}
                  className="px-6 py-2 bg-gray-300 rounded-lg hover:bg-gray-400"
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
        {/* Delete Modal */}
        {showDeleteModal && (
          <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
            <div className={`${cardBg} p-6 rounded-lg w-80`}>
              <h3 className="text-xl font-semibold mb-4">Confirm Delete</h3>
              <p className="mb-6">Are you sure you want to delete this post?</p>
              <div className="flex justify-end space-x-4">
                <button
                  onClick={() => setShowDeleteModal(false)}
                  className="px-4 py-2 bg-gray-200 rounded hover:bg-gray-300"
                >
                  Cancel
                </button>
                <button
                  onClick={confirmDelete}
                  className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700"
                >
                  Delete
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
