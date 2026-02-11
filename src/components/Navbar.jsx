import React, { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { useDispatch, useSelector } from "react-redux";
import { FaPlus } from "react-icons/fa";
import axios from "axios";
import { serverUrl } from "../App";
import { useNavigate } from "react-router-dom";
import { setCurrentUser } from "../redux/userSlice";


function Navbar() {
  const { currentUser } = useSelector((state) => state.user);
  const credits = currentUser?.credits || 0;
  const [showCredits, setShowCredits] = useState(false);
  const[showProfile, setShowProfile] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const handleSignOut = async () => {
    try {
     await axios.post(serverUrl+`/api/auth/logout`, {}, {
        withCredentials: true,
      });
      dispatch(setCurrentUser(null)); // Clear user data from Redux store
        navigate("/auth"); // Redirect to login page
    } catch (error) {
      console.error("Error logging out:", error);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: -15 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="relative z-20 mx-6 mt-6
        flex items-center justify-between
        px-8 py-4
        rounded-2xl
        bg-gradient-to-br from-black/90 via-black/80 to-black/90
        backdrop-blur-2xl
        border border-white/10
        shadow-[0_22px_55px_rgba(0,0,0,0.75)]"
    >
      {/* Left - Logo */}
      <div className="flex items-center gap-3">
        <img src="/logo.png" alt="Logo" className="w-8 h-8" />
        <span className="text-lg hidden md:block font-semibold text-white">
          PU ExamNotes <span className="text-gray-400">AI</span>
        </span>
      </div>

      {/* Right Section */}
      <div className="flex items-center gap-6 relative">
        
        {/* Credits Button */}
        <div className="relative">
          <motion.div
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.97 }}
            className="flex items-center gap-2
              px-4 py-2
              rounded-full
              bg-white/10
              border border-white/20
              text-white text-sm
              shadow-md"
          >
            <span className="text-lg">💎</span>
            <span>{credits}</span>

            <motion.span
              onClick={() => {setShowCredits(!showCredits); setShowProfile(false)}}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              className="ml-2 flex h-5 w-5 items-center justify-center
                rounded-full bg-white cursor-pointer"
            >
              <FaPlus className="text-black text-[10px]" />
            </motion.span>
          </motion.div>

          {/* Credits Dropdown */}
          <AnimatePresence>
            {showCredits && (
              <motion.div
                initial={{ opacity: 0, y: -10, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: -10, scale: 0.95 }}
                transition={{ duration: 0.3 }}
                className="absolute top-16 right-0 mt-3 w-64
                  rounded-2xl
                  bg-black/90 backdrop-blur-xl
                  border border-white/10
                  shadow-[0_25px_60px_rgba(0,0,0,0.7)]
                  p-4 text-white"
              >
                <h4 className="font-semibold mb-2">Buy Credits</h4>

                <p className="text-sm text-gray-300 mb-4">
                  Use credits to generate AI notes, diagrams & PDFs.
                </p>

                <button
                  onClick={() => setShowCredits(false)}
                  className="w-full py-2 rounded-lg
                    bg-gradient-to-br from-white to-gray-200
                    text-black font-semibold
                    hover:opacity-90 transition"
                >
                  Buy More Credits
                </button>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* User Avatar */}
        <motion.div
          onClick={() => {setShowProfile(!showProfile); setShowCredits(false)}}

          className="flex items-center justify-center
            h-10 w-10
            rounded-full
            bg-white/10
            border border-white/20
            text-white font-semibold
            shadow-md"
        >
          {currentUser?.name?.slice(0, 1).toUpperCase()}
          <AnimatePresence>
  {showProfile && (
    <motion.div
      initial={{ opacity: 0, y: -10, scale: 0.95 }}
      animate={{ opacity: 1, y: 10, scale: 1 }}
      exit={{ opacity: 0, y: -10, scale: 0.95 }}
      transition={{ duration: 0.2 }}
      className="absolute top-13 right-0 mt-3 w-64
                  rounded-2xl
                  bg-black/90 backdrop-blur-xl
                  border border-white/10
                  shadow-[0_25px_60px_rgba(0,0,0,0.7)]
                  p-4 text-white"
    >
        <MenuItem text="History" onClick={() => setShowProfile(false)} />
        <div className="h-px bg-white/10 mx-3" />
        {/* <MenuItem text="Settings" onClick={() => setShowProfile(false)} />
        <div className="h-px bg-white/10 mx-3" /> */}
        <MenuItem text="Logout" red onClick={handleSignOut} />

    </motion.div>
  )}
</AnimatePresence>

        </motion.div>
        

      </div>
    </motion.div>
  );
}

function MenuItem({ onClick, text, red }) {
  return (
    <div
      onClick={onClick}
      className={`
        w-full text-left px-5 py-3 text-sm
        transition-colors rounded-lg 
        ${
          red
            ? "text-red-400 hover:bg-red-500/10"
            : "text-gray-200 hover:bg-white/10"
        }
      `}
    >
      {text}
    </div>
  );
}


export default Navbar;
