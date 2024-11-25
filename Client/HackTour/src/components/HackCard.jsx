import React from "react";
import { motion } from "framer-motion";

const HackCard = ({ hack, index, toggleDescription }) => {
  return (
    <motion.div
      className="bg-gray-900 p-6 rounded-lg shadow-xl hover:shadow-2xl transform hover:-translate-y-2 transition duration-500"
      whileHover={{ scale: 1.05 }}
    >
      <div className="relative group">
        <img
          src={hack.image}
          alt={hack.title}
          className="w-full h-48 object-cover rounded-lg group-hover:opacity-80 transition duration-500"
        />
        <div className="absolute inset-0 bg-black bg-opacity-50 opacity-0 group-hover:opacity-100 transition duration-500 flex items-center justify-center">
          <p className="text-white text-lg font-semibold">{hack.title}</p>
        </div>
      </div>
      <h2 className="text-2xl text-white font-bold mt-4">{hack.title}</h2>
      <p
        className={`text-gray-400 text-sm mt-2 ${
          hack.isDescriptionVisible ? "" : "line-clamp-3"
        } transition-all duration-300`}
      >
        {hack.description}
      </p>
      <div className="text-yellow-400 mt-3 text-sm">
        <span>❤️ Likes: {hack.likes}</span>
      </div>
      <button
        className={`mt-4 px-5 py-2 rounded-full font-semibold text-white transition duration-300 ${
          hack.isDescriptionVisible
            ? "bg-red-500 hover:bg-red-600"
            : "bg-blue-500 hover:bg-blue-600"
        }`}
        onClick={() => toggleDescription(index)}
      >
        {hack.isDescriptionVisible ? "Hide Description" : "Show Description"}
      </button>
    </motion.div>
  );
};

export default HackCard;
