import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import API from "../api";
import { FaArrowLeft, FaDownload } from "react-icons/fa";

function MemoryDetails() {
  const { id } = useParams();
  const [memory, setMemory] = useState(null);
  const navigate = useNavigate();
  const [isPreviewOpen, setIsPreviewOpen] = useState(false);
  const [fadeIn, setFadeIn] = useState(false);

  useEffect(() => {
    const fetchMemory = async () => {
      try {
        const token = JSON.parse(localStorage.getItem("user"))?.token;
        const res = await API.get(`/api/memory/${id}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setMemory(res.data);
        setTimeout(() => setFadeIn(true), 10); // trigger fade-in after render
      } catch (err) {
        console.error("❌ Failed to fetch memory", err);
      }
    };

    fetchMemory();
  }, [id]);

  const handleDownload = (url) => {
    const link = document.createElement("a");
    link.href = url;
    link.download = "memory-image";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handlePreview = () => {
    setIsPreviewOpen(true);
  };

  const closePreview = () => {
    setIsPreviewOpen(false);
  };

  if (!memory) {
    return <div className="text-white text-center mt-10">Loading...</div>;
  }

  const renderMedia = () => {
    if (memory.image || memory.imageUrl) {
      const imageSrc = memory.image || memory.imageUrl;
      return (
        <div className="relative group">
          <img
            src={imageSrc}
            alt="Memory"
            onClick={handlePreview}
            className="w-full max-h-[300px] object-contain rounded-lg cursor-pointer"
          />
          <button
            onClick={() => handleDownload(imageSrc)}
            className="absolute top-2 right-2 cursor-pointer p-2 rounded-full bg-black/60 text-white hover:bg-black/80 transition"
          >
            <FaDownload />
          </button>
        </div>
      );
    }

    if (memory.audio || memory.audioUrl) {
      return (
        <audio
          controls
          className="w-full mt-4 rounded-lg"
          src={memory.audio || memory.audioUrl}
        />
      );
    }

    if (memory.video || memory.videoUrl) {
      return (
        <video
          controls
          className="w-full mt-4 max-h-[300px] object-cover rounded-lg"
          src={memory.video || memory.videoUrl}
        />
      );
    }

    return <p className="text-white">No media found</p>;
  };

  return (
    <div
      className={`min-h-screen p-4 text-white relative transition-opacity duration-500 ${
        fadeIn ? "opacity-100" : "opacity-0"
      }`}
    >
      <div className="max-w-2xl mx-auto">
        <button
          onClick={() => navigate(-1)}
          className="text-white bg-white/20 backdrop-blur-md p-2 cursor-pointer rounded-full mb-4"
        >
          <FaArrowLeft />
        </button>

        {renderMedia()}

        <h1 className="text-2xl sm:text-3xl font-bold mt-4">{memory.title}</h1>

        <p className="mt-3 text-white/80 whitespace-pre-line">
          {memory.description || "No description provided."}
        </p>

        <p className="mt-4 text-sm text-white/50">
          Created At: {new Date(memory.createdAt).toLocaleString()}
        </p>
      </div>

      {/* Full Screen Preview */}
      {isPreviewOpen && (
        <div
          onClick={closePreview}
          className="fixed inset-0 bg-black/90 flex items-center justify-center z-50 cursor-zoom-out"
        >
          <img
            src={memory.image || memory.imageUrl}
            alt="Full Preview"
            className="max-h-[90vh] max-w-[90vw] object-contain rounded-lg"
          />
        </div>
      )}
    </div>
  );
}

export default MemoryDetails;
