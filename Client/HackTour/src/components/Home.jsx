import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

function Home() {
  const [hackData, setHackData] = useState([]);
  const [hasScrolled, setHasScrolled] = useState(false);
  const [welcomeAnimation, setWelcomeAnimation] = useState("slide-in");
  const [newHack, setNewHack] = useState({
    title: "",
    description: "",
    image: "",
    likes: 0,
  });
  const [formVisible, setFormVisible] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const navigate = useNavigate();

  const shuffleArray = (array) => {
    return array.sort(() => Math.random() - 0.5);
  };

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 0) {
        setWelcomeAnimation("slide-out");
        setHasScrolled(true);
      } else {
        setHasScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    fetch("https://hacktour.onrender.com/home")
      .then((response) => {
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        return response.json();
      })
      .then((data) => {
        setHackData(shuffleArray(data));
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
        setHackData([]);
      });
  }, []);

  const toggleDescription = (index) => {
    const updatedData = [...hackData];
    updatedData[index].isDescriptionVisible = !updatedData[index].isDescriptionVisible;
    setHackData(updatedData);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewHack((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    fetch("https://hacktour.onrender.com/add", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newHack),
    })
      .then((response) => response.json())
      .then((data) => {
        setHackData((prevData) => [data, ...prevData]);
        setNewHack({ title: "", description: "", image: "", likes: 0 });
        setFormVisible(false);
        navigate("/");
      })
      .catch((error) => {
        console.error("Error adding hack:", error);
      });
  };

  const filteredHackData = hackData.filter((item) => {
    return (
      item.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.description.toLowerCase().includes(searchTerm.toLowerCase())
    );
  });

  const handleCardClick = (id) => {
    navigate(`/hack/${id}`);
  };

  return (
    <motion.div
      className="max-w-screen-2xl mx-auto pt-8 md:pt-8 p-6 md:p-20"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1 }}
    >
      {/* Welcome Animation */}
      <motion.div
        className={`fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-80`}
        initial={{ x: welcomeAnimation === "slide-in" ? "-100vw" : "0" }}
        animate={{ x: welcomeAnimation === "slide-in" ? "0" : "100vw" }}
        transition={{ duration: 1 }}
      >
        <h1 className="text-white text-4xl md:text-6xl font-bold">HackTour!</h1>
      </motion.div>

      {/* Search Bar */}
      <motion.div
        className="mt-6"
        initial={{ y: -50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.3 }}
      >
        <input
          type="text"
          className="px-4 py-2 w-full bg-gray-800 text-white rounded-full"
          placeholder="Search for a hack..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </motion.div>

      <motion.div
        className="mt-6"
        initial={{ scale: 0.8 }}
        animate={{ scale: 1 }}
        transition={{ duration: 0.5 }}
      >
        <button
          onClick={() => setFormVisible(!formVisible)}
          className="px-5 py-2 bg-green-500 text-white rounded-full hover:bg-green-600 transition"
        >
          {formVisible ? "Cancel" : "Add New Hack"}
        </button>
      </motion.div>

      {formVisible && (
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
      )}

      {/* Hack Data Grid */}
      <motion.div
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mt-12"
        initial="hidden"
        animate="visible"
        variants={{
          hidden: { opacity: 0 },
          visible: { opacity: 1, transition: { staggerChildren: 0.2 } },
        }}
      >
        {filteredHackData.map((item, index) => (
          <motion.div
            key={item._id}
            className="bg-gray-900 p-6 rounded-lg shadow-xl hover:shadow-2xl transform hover:-translate-y-2 transition duration-500"
            whileHover={{ scale: 1.05 }}
            onClick={() => handleCardClick(item._id)} // Navigate to a new page on card click
          >
            <div className="relative group">
              <img
                src={item.image}
                alt={item.title}
                className="w-full h-48 object-cover rounded-lg group-hover:opacity-80 transition duration-500"
              />
              <div className="absolute inset-0 bg-black bg-opacity-50 opacity-0 group-hover:opacity-100 transition duration-500 flex items-center justify-center">
                <p className="text-white text-lg font-semibold">{item.title}</p>
              </div>
            </div>
            <h2 className="text-2xl text-white font-bold mt-4">{item.title}</h2>
            <p
              className={`text-gray-400 text-sm mt-2 ${item.isDescriptionVisible ? "" : "line-clamp-3"} transition-all duration-300`}
            >
              {item.description}
            </p>
            <div className="text-yellow-400 mt-3 text-sm">
              <span>❤️ Likes: {item.likes}</span>
            </div>
            <button
              className={`mt-4 px-5 py-2 rounded-full font-semibold text-white transition duration-300 ${
                item.isDescriptionVisible ? "bg-red-500 hover:bg-red-600" : "bg-blue-500 hover:bg-blue-600"
              }`}
              onClick={() => toggleDescription(index)}
            >
              {item.isDescriptionVisible ? "Show Less" : "Read More"}
            </button>
          </motion.div>
        ))}
      </motion.div>
    </motion.div>
  );
}

export default Home;
