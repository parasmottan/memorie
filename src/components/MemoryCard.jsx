import React, { useRef, useState, useEffect } from "react";
import { FaPlay, FaPause, FaTimes } from "react-icons/fa";
import API from "../api";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

function CustomAudioPlayer({ src, title }) {
  const audioRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    const updateProgress = () => {
      const percent = (audio.currentTime / audio.duration) * 100;
      setProgress(percent);
    };

    audio.addEventListener("timeupdate", updateProgress);
    return () => {
      audio.removeEventListener("timeupdate", updateProgress);
    };
  }, []);

  const togglePlay = () => {
    const audio = audioRef.current;
    if (!audio) return;
    if (isPlaying) {
      audio.pause();
    } else {
      audio.play();
    }
    setIsPlaying(!isPlaying);
  };

  return (
    <div className="relative w-full bg-white/10 rounded-2xl overflow-hidden backdrop-blur-md p-4 flex flex-col items-center">
      <img
        src="https://cdn.dribbble.com/userupload/18448628/file/original-03dedccdb27569db83fa04049d1991e9.png?crop=0x0-4800x3600&format=webp&resize=400x300&vertical=center"
        alt="Audio Cover"
        className="w-full h-[200px] object-cover rounded-xl"
      />
      <button
        onClick={togglePlay}
        className="absolute cursor-pointer top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-black/60 p-4 rounded-full text-white shadow-md"
      >
        {isPlaying ? <FaPause size={20} /> : <FaPlay size={20} />}
      </button>
      <div className="w-full mt-3">
        <div className="text-white text-center text-sm mb-2">{title}</div>
        <div className="w-full h-[6px] bg-white/30 rounded-full overflow-hidden">
          <div
            className="h-full bg-pink-400 transition-all"
            style={{ width: `${progress}%` }}
          ></div>
        </div>
      </div>
      <audio ref={audioRef} src={src} preload="metadata" />
    </div>
  );
}

function MemoryCard({ memory, onDelete }) {
  const [falling, setFalling] = useState(false);
  const [showOverlay, setShowOverlay] = useState(false);
  const navigate = useNavigate();

  const imageUrl = memory.image || memory.imageUrl;
  const audioUrl = memory.audio || memory.audioUrl;
  const videoUrl = memory.video || memory.videoUrl;

  const handleDelete = async () => {
    try {
      const token = JSON.parse(localStorage.getItem("user"))?.token;
      await API.delete(`/api/memory/${memory._id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      toast.success("Memory deleted!");
      onDelete(memory._id);
    } catch (err) {
      console.error("❌ Delete failed:", err.response?.data || err.message);
      toast.error("Failed to delete memory.");
    }
  };

  const renderMedia = () => {
    if (imageUrl) {
      return (
        <img
          src={imageUrl}
          alt={memory.title}
          className="w-full rounded-lg object-cover max-h-[250px]"
        />
      );
    }

    if (audioUrl) {
      return <CustomAudioPlayer src={audioUrl} title={memory.title} />;
    }

    if (videoUrl) {
      return (
        <video
          controls
          controlsList="nodownload nofullscreen noremoteplayback"
          disablePictureInPicture
          className="mt-2 w-full max-h-[250px] rounded-lg object-cover"
          onContextMenu={(e) => e.preventDefault()}
        >
          <source src={videoUrl} type="video/mp4" />
          Your browser does not support the video tag.
        </video>
      );
    }

    return <p className="text-white text-sm">No media found</p>;
  };

  const handleCardClick = () => {
    setFalling(true);
    setShowOverlay(true);
    setTimeout(() => {
      navigate(`/memory/${memory._id}`);
    }, 400); // enough time for animation
  };

  return (
    <>
      <div
        className={`w-full bg-white/20 backdrop-blur-lg rounded-xl shadow-lg p-3 break-inside-avoid relative cursor-pointer transform transition-all duration-500 ease-in-out ${
          falling ? "translate-y-[200vh] opacity-0 rotate-6" : ""
        }`}
        onClick={handleCardClick}
      >
        <button
          onClick={(e) => {
            e.stopPropagation();
            handleDelete();
          }}
          className="absolute top-2 right-2 cursor-pointer bg-red-500 text-white p-2 rounded-full hover:bg-red-600 transition"
        >
          <FaTimes size={14} />
        </button>

        {renderMedia()}
        <h2 className="text-white text-lg mt-2 font-semibold truncate w-full">
          {memory.title}
        </h2>
      </div>

      {showOverlay && (
        <div className="fixed top-0 left-0 w-full h-full bg-black transition-opacity duration-300 opacity-80 z-[9999]"></div>
      )}
    </>
  );
}

export default MemoryCard;
