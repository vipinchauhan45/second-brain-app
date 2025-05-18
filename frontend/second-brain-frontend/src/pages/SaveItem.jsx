import React, { useState } from "react";
import axios from "axios";

const CONTENT_TYPES = ["link", "video", "image", "note"];

export default function SaveItem() {
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    type: "link",
    url: "",
    file: "",
    tags: [],
    tagInput: ""
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleFileChange = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onloadend = () => {
      setFormData((prev) => ({ ...prev, file: reader.result }));
    };
    reader.readAsDataURL(file);
  };

  const addTag = () => {
    const newTag = formData.tagInput.trim();
    if (newTag && !formData.tags.includes(newTag)) {
      setFormData((prev) => ({
        ...prev,
        tags: [...prev.tags, newTag],
        tagInput: ""
      }));
    }
  };

  const removeTag = (index) => {
    setFormData((prev) => ({
      ...prev,
      tags: prev.tags.filter((_, i) => i !== index)
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.title || !formData.description || !formData.type) {
      alert("Please fill all required fields.");
      return;
    }

    if ((formData.type === "link" || formData.type === "video") && !formData.url) {
      alert("Please provide a URL.");
      return;
    }

    if ((formData.type === "image" || formData.type === "note") && !formData.file) {
      alert("Please upload a file.");
      return;
    }

    const payload = {
      title: formData.title,
      description: formData.description,
      type: formData.type,
      url: formData.url || null,
      file: formData.file || null,
      tags: formData.tags,
    };

    try {
      const token = localStorage.getItem("token");
      // console.log(token)
      const response = await axios.post("http://localhost:3000/api/v1/create", payload, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });

      alert("Content saved successfully!");
      console.log("Saved:", response.data);

      setFormData({
        title: "",
        description: "",
        type: "link",
        url: "",
        file: "",
        tags: [],
        tagInput: ""
      });
    } catch (error) {
      console.error("Error saving content:", error.response?.data || error.message);
      alert("Failed to save content. Please try again.");
    }
  };

  return (
    <div className="max-w-md mx-auto p-6 bg-white rounded-2xl shadow-lg text-teal-900 font-sans sm:p-8 sm:mt-10 mt-6 sm:mx-auto">
      <h2 className="text-2xl sm:text-3xl font-semibold mb-5 text-center tracking-wide">
        Save New Content
      </h2>
      <form onSubmit={handleSubmit} className="space-y-5">
        {/* Title */}
        <div>
          <label htmlFor="title" className="block mb-1 font-semibold text-sm sm:text-base">
            Title <span className="text-red-600">*</span>
          </label>
          <input
            id="title"
            name="title"
            type="text"
            required
            value={formData.title}
            onChange={handleChange}
            placeholder="Enter title"
            className="w-full px-3 py-2 border border-teal-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-400 transition"
          />
        </div>

        {/* Description */}
        <div>
          <label htmlFor="description" className="block mb-1 font-semibold text-sm sm:text-base">
            Description <span className="text-red-600">*</span>
          </label>
          <textarea
            id="description"
            name="description"
            required
            value={formData.description}
            onChange={handleChange}
            rows={3}
            placeholder="Enter description"
            className="w-full px-3 py-2 border border-teal-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-400 resize-none transition"
          />
        </div>

        {/* Type */}
        <div>
          <label htmlFor="type" className="block mb-1 font-semibold text-sm sm:text-base">
            Type <span className="text-red-600">*</span>
          </label>
          <select
            id="type"
            name="type"
            value={formData.type}
            onChange={handleChange}
            className="w-full px-3 py-2 border border-teal-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-400 transition"
          >
            {CONTENT_TYPES.map((type) => (
              <option key={type} value={type}>
                {type.charAt(0).toUpperCase() + type.slice(1)}
              </option>
            ))}
          </select>
        </div>

        {/* URL input for link/video */}
        {(formData.type === "link" || formData.type === "video") && (
          <div>
            <label htmlFor="url" className="block mb-1 font-semibold text-sm sm:text-base">
              URL <span className="text-red-600">*</span>
            </label>
            <input
              id="url"
              name="url"
              type="url"
              required
              value={formData.url}
              onChange={handleChange}
              placeholder="https://example.com"
              className="w-full px-3 py-2 border border-teal-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-400 transition"
            />
          </div>
        )}

        {/* File input for image/note */}
        {(formData.type === "image" || formData.type === "note") && (
          <div>
            <label htmlFor="file" className="block mb-1 font-semibold text-sm sm:text-base">
              Upload File <span className="text-red-600">*</span>
            </label>
            <input
              id="file"
              name="file"
              type="file"
              accept={formData.type === "image" ? "image/*" : ".txt,.pdf,.md"}
              onChange={handleFileChange}
              className="w-full border border-teal-300 rounded-lg px-3 py-2 transition bg-white file:mr-4 file:py-2 file:px-4 file:border-0 file:text-sm file:font-semibold file:bg-teal-600 file:text-white hover:file:bg-teal-700"
            />
          </div>
        )}

        {/* Tags */}
        <div>
          <label className="block mb-1 font-semibold text-sm sm:text-base">Tags</label>
          <div className="flex space-x-2 mb-3">
            <input
              type="text"
              name="tagInput"
              value={formData.tagInput}
              onChange={handleChange}
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  e.preventDefault();
                  addTag();
                }
              }}
              placeholder="Add tag and press Enter"
              className="flex-grow px-3 py-2 border border-teal-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-400 transition"
            />
            <button
              type="button"
              onClick={addTag}
              className="px-4 py-2 bg-teal-600 hover:bg-teal-700 text-white rounded-lg transition-shadow shadow-md"
            >
              Add
            </button>
          </div>
          <div className="flex flex-wrap gap-2">
            {formData.tags.map((tag, i) => (
              <span
                key={i}
                className="bg-teal-200 text-teal-900 px-3 py-1 rounded-full flex items-center space-x-1 text-sm"
              >
                <span>{tag}</span>
                <button
                  type="button"
                  onClick={() => removeTag(i)}
                  className="ml-1 text-teal-700 hover:text-teal-900 font-bold"
                  aria-label={`Remove tag ${tag}`}
                >
                  &times;
                </button>
              </span>
            ))}
          </div>
        </div>

        {/* Submit */}
        <button
          type="submit"
          className="w-full bg-teal-600 hover:bg-teal-700 text-white font-semibold py-3 rounded-lg transition-shadow shadow-md"
        >
          Save Content
        </button>
      </form>
    </div>
  );
}
