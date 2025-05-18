import React, { useState, useEffect } from "react";
import axios from "axios";
import {
  CalendarDays,
  FileText,
  ImageIcon,
  LinkIcon,
  Tag,
  Video,
  Pencil,
  Trash2,
} from "lucide-react";

const API_BASE = "http://localhost:3000/api/v1"; // Replace with your backend API URL

const ContentPage = () => {
  const [filter, setFilter] = useState("all");
  const [contents, setContents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const token = localStorage.getItem("token");

  // Fetch all content items on mount
  useEffect(() => {
    const fetchContents = async () => {
      try {
        setLoading(true);
        setError(null);
        const response = await axios.get(`${API_BASE}/allContent`, {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        });
        setContents(response.data);
      } catch (err) {
        setError("Failed to load contents.");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchContents();
  }, [token]);

  // Delete content by ID
  const handleDelete = async (contentToDelete) => {
    if (
      !window.confirm(
        `Are you sure you want to delete "${contentToDelete.title}"?`
      )
    )
      return;

    try {
      await axios.delete(`${API_BASE}/${contentToDelete._id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setContents((prev) =>
        prev.filter((content) => content._id !== contentToDelete._id)
      );
    } catch (err) {
      alert("Failed to delete content.");
      console.error(err);
    }
  };

  // Update content (simple prompt for new title)
  const handleUpdate = async (contentToUpdate) => {
    const newTitle = window.prompt(
      "Enter new title:",
      contentToUpdate.title || ""
    );
    if (!newTitle || newTitle.trim() === "") {
      alert("Title cannot be empty.");
      return;
    }

    try {
      const updatedContentData = {
        ...contentToUpdate,
        title: newTitle.trim(),
      };

      const response = await axios.put(
        `${API_BASE}/${contentToUpdate._id}`,
        updatedContentData,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      setContents((prev) =>
        prev.map((c) => (c._id === contentToUpdate._id ? response.data.content : c))
      );
    } catch (err) {
      alert("Failed to update content.");
      console.error(err);
    }
  };

  // Filter contents based on type
  const filteredContents =
    filter === "all" ? contents : contents.filter((c) => c.type === filter);

  return (
    <div className="max-w-6xl mx-auto px-4 py-8 space-y-6">
      {/* Filter Buttons */}
      <div className="flex flex-wrap gap-3 justify-center sm:justify-start">
        {["all", "video", "link", "image", "note"].map((type) => (
          <button
            key={type}
            className={`px-4 py-1.5 rounded-full text-sm font-medium border transition duration-200 ${
              filter === type
                ? "bg-blue-600 text-white border-blue-600"
                : "bg-white text-gray-700 border-gray-300 hover:bg-gray-100"
            }`}
            onClick={() => setFilter(type)}
          >
            {type.charAt(0).toUpperCase() + type.slice(1)}
          </button>
        ))}
      </div>

      {/* Loading & Error States */}
      {loading && (
        <p className="text-center text-gray-500">Loading contents...</p>
      )}
      {error && <p className="text-center text-red-500">{error}</p>}

      {/* Content Grid */}
      {!loading && !error && (
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredContents.length > 0 ? (
            filteredContents.map((content, index) => (
              <ContentCard
                key={index}
                content={content}
                onDelete={handleDelete}
                onUpdate={handleUpdate}
              />
            ))
          ) : (
            <p className="text-gray-500 text-center col-span-full">
              No content found.
            </p>
          )}
        </div>
      )}
    </div>
  );
};

// Content card UI component
const ContentCard = ({ content, onDelete, onUpdate }) => {
  if (
    !content ||
    Object.keys(content).length === 0 ||
    (!content.title && !content.description && !content.url && !content.file)
  ) {
    return (
      <div className="bg-white shadow-md border border-gray-100 rounded-2xl p-4 text-center text-gray-500">
        No content available
      </div>
    );
  }

  const { title, description, type, url, file, tags, createdAt } = content;

  const renderMedia = () => {
    switch (type) {
      case "image":
        return (
          <img
            src={file || url}
            alt={title}
            className="w-full h-52 object-cover rounded-xl"
          />
        );
      case "video":
        return (
          <iframe
            src={url}
            className="w-full h-52 rounded-xl"
            allowFullScreen
            title={title}
          />
        );
      case "link":
        return (
          <a
            href={url}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center text-blue-600 hover:underline gap-1 text-sm"
          >
            <LinkIcon size={16} />
            {url.length > 40 ? url.slice(0, 40) + "..." : url}
          </a>
        );
      case "note":
        return (
          <div className="text-sm bg-gray-50 text-gray-700 p-3 rounded-md">
            {description}
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="bg-white shadow-md border border-gray-100 rounded-2xl overflow-hidden transition-transform hover:scale-[1.01] hover:shadow-lg duration-200 p-4 space-y-4">
      {/* Title */}
      <div className="flex justify-between items-start">
        <h2 className="text-lg font-semibold text-gray-900">
          {type === "link" ? (
            <a
              href={url}
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-blue-600"
            >
              {title}
            </a>
          ) : (
            title
          )}
        </h2>
        <span className="text-xs text-gray-500 capitalize flex items-center gap-1">
          {type === "image" && <ImageIcon size={14} />}
          {type === "video" && <Video size={14} />}
          {type === "link" && <LinkIcon size={14} />}
          {type === "note" && <FileText size={14} />}
          {type}
        </span>
      </div>

      {/* Media */}
      {renderMedia()}

      {/* Description */}
      {type !== "note" && (
        <p className="text-gray-700 text-sm line-clamp-3">{description}</p>
      )}

      {/* Tags */}
      {tags?.length > 0 && (
        <div className="flex flex-wrap items-center gap-2 mt-2">
          {tags.map((tag, index) => (
            <span
              key={index}
              className="bg-blue-50 text-blue-700 text-xs px-2 py-1 rounded-full flex items-center gap-1"
            >
              <Tag size={12} />
              {tag}
            </span>
          ))}
        </div>
      )}

      {/* Footer */}
      <div className="flex justify-between items-center text-xs text-gray-500 pt-2 border-t mt-2">
        <div className="flex items-center gap-1">
          <CalendarDays size={14} />
          {new Date(createdAt).toLocaleDateString("en-US", {
            year: "numeric",
            month: "short",
            day: "numeric",
          })}
        </div>
        <div className="flex items-center gap-2">
          <button
            onClick={() => onUpdate?.(content)}
            className="text-blue-600 hover:text-blue-800 p-1 rounded-full"
            title="Update"
          >
            <Pencil size={16} />
          </button>
          <button
            onClick={() => onDelete?.(content)}
            className="text-red-600 hover:text-red-800 p-1 rounded-full"
            title="Delete"
          >
            <Trash2 size={16} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default ContentPage;
