import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const [hackData, setHackData] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [formVisible, setFormVisible] = useState(false);
  const [newHack, setNewHack] = useState({
    title: "",
    description: "",
    image: "",
    likes: 0,
  });
  const navigate = useNavigate();

  useEffect(() => {
    fetch("https://hacktour.onrender.com/home")
      .then((res) => res.json())
      .then((data) => setHackData(data.sort(() => Math.random() - 0.5)))
      .catch((err) => console.error(err));
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewHack((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    fetch("https://hacktour.onrender.com/add", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(newHack),
    })
      .then((res) => res.json())
      .then((newItem) => {
        setHackData((prev) => [newItem, ...prev]);
        setNewHack({ title: "", description: "", image: "", likes: 0 });
        setFormVisible(false);
        navigate("/");
      })
      .catch((err) => console.error(err));
  };

  const filteredHacks = hackData.filter((item) =>
    item.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const toggleDescription = (index) => {
    setHackData((prev) =>
      prev.map((item, i) =>
        i === index
          ? { ...item, isDescriptionVisible: !item.isDescriptionVisible }
          : item
      )
    );
  };

  return (
    <motion.div
      className="min-h-screen bg-gradient-to-br from-gray-900 via-black to-gray-800 text-white"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1 }}
    >
      <Header searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
      <motion.div
        className="max-w-6xl mx-auto p-6"
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.2 }}
      >
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-4xl font-bold">HackTour</h1>
          <button
            onClick={() => setFormVisible(!formVisible)}
            className="px-4 py-2 bg-green-600 hover:bg-green-500 rounded-lg"
          >
            {formVisible ? "Cancel" : "Add Hack"}
          </button>
        </div>
        {formVisible && (
          <Form
            newHack={newHack}
            handleInputChange={handleInputChange}
            handleSubmit={handleSubmit}
          />
        )}
        <HackGrid hacks={filteredHacks} toggleDescription={toggleDescription} />
      </motion.div>
    </motion.div>
  );
};

const Header = ({ searchTerm, setSearchTerm }) => (
  <motion.div
    className="bg-gray-800 py-4 px-6 sticky top-0 z-10 shadow-md"
    initial={{ y: -50, opacity: 0 }}
    animate={{ y: 0, opacity: 1 }}
    transition={{ duration: 0.5 }}
  >
    <input
      type="text"
      placeholder="Search hacks..."
      className="w-full p-3 rounded-lg bg-gray-700 text-white"
      value={searchTerm}
      onChange={(e) => setSearchTerm(e.target.value)}
    />
  </motion.div>
);

const Form = ({ newHack, handleInputChange, handleSubmit }) => (
  <motion.form
    onSubmit={handleSubmit}
    className="bg-gray-700 p-6 rounded-lg mb-6"
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    transition={{ duration: 0.5 }}
  >
    <div className="space-y-4">
      <input
        type="text"
        name="title"
        placeholder="Hack Title"
        className="w-full p-3 rounded-lg bg-gray-800 text-white"
        value={newHack.title}
        onChange={handleInputChange}
      />
      <textarea
        name="description"
        placeholder="Hack Description"
        className="w-full p-3 rounded-lg bg-gray-800 text-white"
        value={newHack.description}
        onChange={handleInputChange}
      />
      <input
        type="text"
        name="image"
        placeholder="Image URL"
        className="w-full p-3 rounded-lg bg-gray-800 text-white"
        value={newHack.image}
        onChange={handleInputChange}
      />
      <button
        type="submit"
        className="px-4 py-2 bg-blue-600 hover:bg-blue-500 rounded-lg"
      >
        Add Hack
      </button>
    </div>
  </motion.form>
);

const HackGrid = ({ hacks, toggleDescription }) => (
  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
    {hacks.map((item, index) => (
      <motion.div
        key={item._id}
        className="bg-gray-900 p-6 rounded-lg shadow-md hover:shadow-lg"
        whileHover={{ scale: 1.05 }}
      >
        <div className="relative">
          <img
            src={item.image}
            alt={item.title}
            className="w-full h-48 object-cover rounded-lg"
          />
          <div className="absolute top-2 right-2 bg-black bg-opacity-60 text-white px-2 py-1 rounded">
            {item.likes} ❤️
          </div>
        </div>
        <h2 className="text-xl font-semibold mt-4">{item.title}</h2>
        <p
          className={`mt-2 text-gray-400 ${
            item.isDescriptionVisible ? "" : "line-clamp-3"
          }`}
        >
          {item.description}
        </p>
        <button
          className="mt-4 px-4 py-2 bg-red-600 hover:bg-red-500 rounded-lg"
          onClick={() => toggleDescription(index)}
        >
          {item.isDescriptionVisible ? "Hide" : "Show"} Description
        </button>
      </motion.div>
    ))}
  </div>
);

export default Home;
