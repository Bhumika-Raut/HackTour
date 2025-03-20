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
      className="px-4 py-2 text-white rounded-lg bg-gradient-to-r from-green-700 to-gray-900">
      Add Hack
    </button>
    </motion.form>
  );
};

export default HackForm;
