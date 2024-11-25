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
  const userId = "USER_ID"; // Replace this with actual user ID from authentication

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

  const handleLike = async (id) => {
    try {
      const response = await fetch(`https://hacktour.onrender.com/like/${id}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ userId }), // Pass userId in request body
      });

      if (response.ok) {
        const { likes } = await response.json();
        setHackData((prev) =>
          prev.map((item) =>
            item._id === id ? { ...item, likes } : item
          )
        );
      } else {
        alert("You already liked this entity!");
      }
    } catch (error) {
      console.error("Error liking entity:", error);
    }
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
        <HackGrid
          hacks={filteredHacks}
          toggleDescription={toggleDescription}
          handleLike={handleLike}
        />
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
    <div className="mb-4">
      <input
        type="text"
        name="title"
        placeholder="Title"
        className="w-full p-3 rounded-lg"
        value={newHack.title}
        onChange={handleInputChange}
      />
    </div>
    <div className="mb-4">
      <input
        type="text"
        name="image"
        placeholder="Image URL"
        className="w-full p-3 rounded-lg"
        value={newHack.image}
        onChange={handleInputChange}
      />
    </div>
    <div className="mb-4">
      <textarea
        name="description"
        placeholder="Description"
        className="w-full p-3 rounded-lg"
        value={newHack.description}
        onChange={handleInputChange}
      />
    </div>
    <button
      type="submit"
      className="px-4 py-2 bg-green-600 hover:bg-green-500 rounded-lg"
    >
      Add Hack
    </button>
  </motion.form>
);

const HackGrid = ({ hacks, toggleDescription, handleLike }) => (
  <motion.div
    className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6"
    initial={{ y: 20, opacity: 0 }}
    animate={{ y: 0, opacity: 1 }}
    transition={{ delay: 0.2 }}
  >
    {hacks.map((hack, index) => (
      <motion.div
        key={hack._id}
        className="bg-gray-700 rounded-lg p-4 shadow-lg"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.3 }}
      >
        <img src={hack.image} alt={hack.title} className="w-full h-48 object-cover rounded-lg" />
        <h2 className="text-xl font-bold mt-2">{hack.title}</h2>
        {hack.isDescriptionVisible && (
          <p className="text-sm mt-2">{hack.description}</p>
        )}
        <div className="flex justify-between items-center mt-4">
          <button
            onClick={() => toggleDescription(index)}
            className="text-blue-500"
          >
            {hack.isDescriptionVisible ? "Hide" : "Show"} Description
          </button>
          <button
            onClick={() => handleLike(hack._id)}
            className="text-red-500"
          >
            Like ({hack.likes})
          </button>
        </div>
      </motion.div>
    ))}
  </motion.div>
);

export default Home;
