import React, { useState, useEffect } from 'react';
import { IoIosMenu } from "react-icons/io";
import Input from '../components/Input';
import CenterBox from '../components/CenterBox';
import MasonryMemories from '../components/MasonryMemories';
import { useLocation, useNavigate } from 'react-router-dom';
import Cookies from 'js-cookie';
import API from '../api';

function HomePage() {
  const [left, setLeft] = useState(() => window.innerWidth < 1024 ? 80 : 26);
  const [showCenterBox, setShowCenterBox] = useState(true);
  const [showInputBox, setShowInputBox] = useState(false);
  const [username, setUsername] = useState("Guest");
  const [memories, setMemories] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const location = useLocation();
  const navigate = useNavigate();

  const handleLogout = () => {
    Cookies.remove("token");
    localStorage.removeItem("user");
    navigate("/");
  };

  const fetchMemories = async () => {
    try {
      const res = await API.get('/api/memory/all');
      setMemories(res.data.memories);
    } catch (err) {
      console.error("Error fetching memories", err);
    }
  };

  useEffect(() => {
    const init = async () => {
      let user = null;

      if (location?.state?.user) {
        user = location.state.user;
        localStorage.setItem("user", JSON.stringify(user));
        setUsername(user.username || "Guest");

        // ✅ Set token globally for axios
        if (user?.token) {
          API.defaults.headers.common['Authorization'] = `Bearer ${user.token}`;
        }
      } else {
        const stored = localStorage.getItem("user");
        if (stored && stored !== "undefined") {
          try {
            user = JSON.parse(stored);
            setUsername(user.username || "Guest");

            // ✅ Set token globally for axios
            if (user?.token) {
              API.defaults.headers.common['Authorization'] = `Bearer ${user.token}`;
            }
          } catch (e) {
            localStorage.removeItem("user");
          }
        }
      }

      if (!user) {
        try {
          const res = await API.get("/auth/me");
          const fullUser = {
            ...res.data.user,
            token: res.data.token
          };
          localStorage.setItem("user", JSON.stringify(fullUser));
          setUsername(fullUser.username || "Guest");

          // ✅ Set token globally for axios
          API.defaults.headers.common['Authorization'] = `Bearer ${fullUser.token}`;
          user = fullUser;
        } catch (err) {
          return navigate("/login");
        }
      }

      await fetchMemories();
      setIsLoading(false);
    };

    init();
  }, [location.key]);

  useEffect(() => {
    if (memories.length === 0) {
      setShowCenterBox(true);
      setShowInputBox(false);
    }
  }, [memories]);

  const handleUpload = () => {
    setShowCenterBox(false);
    setShowInputBox(true);
  };

  const handleLeft = () => {
    const isMobile = window.innerWidth < 1024;
    const width = isMobile ? 80 : 26;
    setLeft(left === width ? 0.5 : width);
  };

  const handleLeft2 = () => {
    const isMobile = window.innerWidth < 1024;
    setLeft(isMobile ? 80 : 26);
  };

  if (isLoading) return null;

  return (
    <div className="relative h-[100dvh] w-screen overflow-hidden">
      <style>
        {`
          @keyframes spinPause {
            0% { transform: rotate(0deg); }
            80% { transform: rotate(360deg); }
            100% { transform: rotate(360deg); }
          }
          .spin-pause {
            animation: spinPause 5s ease-in-out infinite;
          }
        `}
      </style>

      {/* Background Image */}
      <div
        className="absolute top-[-10px] left-[-10px] right-[-10px] bottom-[-10px] bg-cover bg-center z-0"
        style={{
          backgroundImage: "url('./Homepage.jpg')",
          filter: 'blur(2px) brightness(0.8)',
        }}
      ></div>

      {/* Foreground Content */}
      <div className="relative z-10 flex flex-col items-start justify-center w-full h-full px-3 sm:px-6 md:px-12 lg:px-24 gap-10">
        <IoIosMenu
          className='absolute text-white text-4xl top-3 left-3 cursor-pointer z-40'
          onClick={handleLeft}
        />

        {/* Sidebar */}
        <div
          style={{ left: `-${left}vw`, transition: "0.5s ease" }}
          className='w-[80vw] lg:w-[26vw] h-full bg-white/10 backdrop-blur-md border border-white/10 shadow-lg absolute pt-7 px-4 flex flex-col justify-center gap-10 pb-11 z-30'
        >
          <div>
            <div className='w-full h-[30%] flex flex-col items-center justify-center gap-3'>
              <div className='md:w-[8vw] md:h-[8vw] w-[25vw] h-[25vw] overflow-hidden rounded-full object-cover border border-white/20 p-4'>
                <img src="./user.png" alt="user" className='w-full h-full' />
              </div>
              <h1 style={{ fontFamily: "Mochiy Pop One" }} className='text-white text-xl'>{username}</h1>
            </div>

            <div className='w-full flex flex-col justify-center items-center md:gap-9 py-6'>
              <h2 style={{ fontFamily: "Moon Dance" }} className='text-white text-2xl'>Total Memoire : {memories.length}</h2>
              <h2
                style={{ fontFamily: "Moon Dance" }}
                className="text-white text-2xl w-[80%] truncate text-center"
                title={memories[0]?.title || "None"}
              >
                Last Memory: “{memories[0]?.title || "None"}”
              </h2>
              <h2 style={{ fontFamily: "Moon Dance" }} className='text-white text-2xl'>Last Logged In: 4 Days Ago</h2>
            </div>

            <div className='w-full flex flex-col justify-center items-center gap-2 pt-10'>
              <h1 style={{ fontFamily: "Montserrat", fontWeight: "bold" }} className='text-white text-xl pb-4'>Note</h1>
              <h2 style={{ fontFamily: "Montserrat", fontWeight: "bold" }} className='text-white md:text-[1.1vw]'>🔐 Forgot Password?</h2>
              <h2 className='text-white text-sm md:text-[.8vw] text-center' style={{ fontFamily: "Amita", fontWeight: "lighter" }}>
                Feature coming very soon! And hey — <br />
                your memories aren’t going anywhere.<br />
                They're safe with us. ❤️
              </h2>
            </div>
          </div>

          <div className='w-full flex mt-[15vw] md:mt-0 justify-center pb-6'>
            <button
              onClick={handleLogout}
              className='shine-button text-white/65 text-sm px-6 py-3 rounded-3xl backdrop-blur-md bg-white/20 border-2 cursor-pointer hover:border-white/40 shadow-md border-none outline-none'
              style={{ fontFamily: "Helvetica" }}
            >
              Logout
            </button>
          </div>
        </div>

        {/* Overlay for sidebar */}
        {left === 0.5 && (
          <div
            className="absolute w-full h-full top-0 left-0 z-20"
            onClick={handleLeft2}
          />
        )}

        {/* CenterBox if no memories */}
        {memories.length === 0 && showCenterBox && (
          <CenterBox onClick={handleUpload} />
        )}

        {/* Memory grid */}
        {memories.length > 0 && !showInputBox && (
          <MasonryMemories memories={memories} setMemories={setMemories} />
        )}

        {/* Floating + button */}
        {memories.length > 0 && !showInputBox && (
          <button
            onClick={() => setShowInputBox(true)}
            className="fixed bottom-5 right-5 bg-black text-white text-3xl w-14 h-14 rounded-full flex items-center justify-center shadow-xl hover:scale-110 transition-all z-50"
          >
            +
          </button>
        )}

        {/* Input form */}
        {showInputBox && (
          <Input
            onClick={() => setShowInputBox(false)}
            onSuccess={(newMemory) => {
              setMemories((prev) => [newMemory, ...prev]);
              setShowInputBox(false);
              setShowCenterBox(false);
            }}
          />
        )}
      </div>
    </div>
  );
}

export default HomePage;
