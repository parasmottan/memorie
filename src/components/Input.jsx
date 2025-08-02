import React, { useRef, useState, useEffect } from 'react';
import { IoMdAdd, IoMdClose } from "react-icons/io";
import { toast } from 'react-toastify';
import API from '../api';

function Input(props) {
  const fileInputRef = useRef();

  const [file, setFile] = useState(null);
  const [audio, setAudio] = useState(null);
  const [video, setVideo] = useState(null);

  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [uploading, setUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);

  const handleFileChange = (e) => {
    const selected = e.target.files[0];
    if (!selected) return;

    const type = selected.type;

    setFile(null);
    setAudio(null);
    setVideo(null);

    if (type.startsWith("image/")) {
      setFile(selected);
    } else if (type.startsWith("audio/")) {
      setAudio(selected);
    } else if (type.startsWith("video/")) {
      setVideo(selected);
    } else {
      toast.error("Unsupported file type");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const selectedMedia = file || audio || video;

    if (!selectedMedia || !title || !description) {
      return toast.error("All fields are required.");
    }

    if (title.length < 7) {
      return toast.error("Title must be at least 7 characters.");
    }

    if (description.length < 30) {
      return toast.error("Summary must be at least 30 characters.");
    }

    try {
      setUploading(true);
      setUploadProgress(0);

      const formData = new FormData();
      if (file) formData.append('image', file);
      if (audio) formData.append('audio', audio);
      if (video) formData.append('video', video);
      formData.append('title', title);
      formData.append('description', description);

      const res = await API.post('/api/memory/create', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
        onUploadProgress: (progressEvent) => {
          const percent = Math.round((progressEvent.loaded * 100) / progressEvent.total);
          setUploadProgress(percent);
        },
      });

      toast.success("Memory created!");

      // ✅ Reset fields
      setTitle('');
      setDescription('');
      setFile(null);
      setAudio(null);
      setVideo(null);
      fileInputRef.current.value = '';

      props.onSuccess?.(res.data.memory);
    } catch (err) {
      toast.error(err.response?.data?.message || "Upload failed");
    } finally {
      setUploading(false);
      setUploadProgress(0);
    }
  };

  useEffect(() => {
    return () => {
      if (file) URL.revokeObjectURL(file);
    };
  }, [file]);

  return (
    <div
      style={props.style}
      className='lg:w-[80%] lg:h-[87%] w-[90%] h-[60%] left-4.5 transition-0.3s-linear absolute lg:left-[10%] lg:bottom-[7%] z-20 flex flex-col items-center justify-center backdrop-blur-md bg-white/20 border-2 border-white/10 rounded-[20px]'
    >
      <IoMdClose
        onClick={props.onClick}
        className='absolute top-4 right-4 text-white text-4xl md:text-3xl cursor-pointer hover:scale-110 transition-transform z-30'
      />

      <form
        onSubmit={handleSubmit}
        onClick={(e) => e.stopPropagation()}
        className='w-full flex flex-col justify-center items-center gap-4 md:gap-8 relative'
      >
        <input
          type="file"
          accept="image/*,audio/*,video/*"
          ref={fileInputRef}
          onChange={handleFileChange}
          className="hidden"
          id="fileUpload"
        />
        <label
          htmlFor="fileUpload"
          className='md:w-[12vw] md:h-[12vw] w-[25vw] h-[25vw] mb-3 md:mb-8 rounded-full flex items-center justify-center bg-white/10 border-2 border-white/10 text-white cursor-pointer backdrop-blur-md hover:bg-white/20 transition-all duration-300 overflow-hidden'
        >
          {file ? (
            <img src={URL.createObjectURL(file)} alt="Selected" className='w-full h-full object-cover rounded-full' />
          ) : audio ? (
            <span className="text-sm text-center px-4">{audio.name}</span>
          ) : video ? (
            <span className="text-sm text-center px-4">{video.name}</span>
          ) : (
            <IoMdAdd className='text-[4vw]' />
          )}
        </label>

        <input
          type="text"
          placeholder='Title of your memorie'
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className='w-[85%] md:py-3 py-1 outline-none backdrop-blur-md bg-white/8 border-2 border-white/10 rounded-full px-8 text-white font-light'
        />
        <p className="text-white/60 text-xs md:-mt-5 mb-2">
          {title.length} / 7 characters required
        </p>

        <input
          type="text"
          placeholder='Summary of your special moment'
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className='w-[85%] py-9 md:py-15 outline-none backdrop-blur-md bg-white/8 border-2 border-white/10 rounded-full px-8 text-white font-light'
        />
        <p className="text-white/60 text-xs md:-mt-5 mb-2">
          {description.length} / 30 characters required
        </p>

        <button
          type='submit'
          disabled={uploading}
          className='backdrop-blur-md bg-black/70 p-3 rounded-full absolute bottom-[-16%] left-1/2 transform -translate-x-1/2 cursor-pointer px-5 border-2 border-white/30 text-white disabled:opacity-60'
        >
          {uploading ? "Uploading..." : "Create Memorie"}
        </button>
      </form>

      {uploading && (
        <div className='w-[80%] h-[8px] bg-white/20 mb-10 rounded-full overflow-hidden'>
          <div
            className='h-full bg-green-400 transition-all duration-300 ease-in-out'
            style={{ width: `${uploadProgress}%` }}
          />
        </div>
      )}
    </div>
  );
}

export default Input;
