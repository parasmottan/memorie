import React, { useEffect, useState } from "react";
import Masonry from "react-masonry-css";
import API from "../api";
import MemoryCard from "./MemoryCard";

function MemoriesMasonry({ onMemoryExists, refreshTrigger }) {
  const [memories, setMemories] = useState([]);

  useEffect(() => {
    const fetchMemories = async () => {
      try {
        const token = JSON.parse(localStorage.getItem("user"))?.token;
        const res = await API.get("/api/memory/all", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setMemories(res.data.memories);
        if (typeof onMemoryExists === "function") {
          onMemoryExists(res.data.memories.length > 0);
        }
      } catch (err) {
        console.error("Failed to fetch memories:", err);
      }
    };

    fetchMemories();
  }, [onMemoryExists, refreshTrigger]);

  const handleDeleteMemory = (id) => {
    setMemories((prev) => prev.filter((m) => m._id !== id));
  };

  // 👉 Set 2 cols for mobile, 3 for tablet, 4 for large screen
  const breakpointColumnsObj = {
    default: 4,
    1280: 3,
    1024: 2,
    768: 2,
    0: 2,
  };

  return (
    <div className="w-full max-h-[80dvh] overflow-y-auto scrollbar-hide">
      <Masonry
        breakpointCols={breakpointColumnsObj}
        className="flex gap-0"
        columnClassName="flex flex-col gap-2"
      >
        {memories.map((memory) => (
          <div key={memory._id} className="w-full px-1 sm:px-2">
            <MemoryCard memory={memory} onDelete={handleDeleteMemory} />
          </div>
        ))}
      </Masonry>
    </div>
  );
}

export default MemoriesMasonry;
