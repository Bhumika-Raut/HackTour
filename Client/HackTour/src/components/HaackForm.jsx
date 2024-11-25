import React from "react";
import { motion } from "framer-motion";

const HackForm = ({ newHack, handleInputChange, handleSubmit }) => {
  return (
    <motion.form
      onSubmit={handleSubmit}
      className="mt-6 space-y-4"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <input
        type="text"
        name="title"
        value={newHack.title}
        onChange={handleInputChange}
        placeholder="Hack Title"
        className="w-full p-3 bg-gray-800 text-white rounded-lg"
        required
      />
      <textarea
        name="description"
        value={newHack.description}
        onChange={handleInputChange}
        placeholder="Hack Description"
        className="w-full p-3 bg-gray-800 text-white rounded-lg"
        required
      />
      <input
        type="text"
        name="image"
        value={newHack.image}
        onChange={handleInputChange}
        placeholder="Image URL"
        className="w-full p-3 bg-gray-800 text-white rounded-lg"
        required
      />
      <input
        type="number"
        name="likes"
        value={newHack.likes}
        onChange={handleInputChange}
        placeholder="Likes"
        className="w-full p-3 bg-gray-800 text-white rounded-lg"
        required
      />
      <button
        type="submit"
        className="px-6 py-2 bg-blue-500 text-white rounded-full hover:bg-blue-600 transition"
      >
        Add Hack
      </button>
    </motion.form>
  );
};

export default HackForm;
