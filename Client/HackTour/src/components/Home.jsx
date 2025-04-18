import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import InfiniteScroll from "react-infinite-scroll-component";
import Masonry from "react-masonry-css";

const Home = ({ theme }) => {
  const [hackData, setHackData] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [formVisible, setFormVisible] = useState(false);
  const [newHack, setNewHack] = useState({
    title: "",
    description: "",
    image: "",
    likes: 0,
  });
  const [currentPage, setCurrentPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const hacksPerPage = 6;
  const navigate = useNavigate();
  const userId = "USER_ID";

  useEffect(() => {
    fetchHacks();
  }, []);
  useEffect(() => {
    if (searchTerm.trim() === "") {
      fetchHacks(1); 
    }
  }, [searchTerm]);
  

  const fetchHacks = (page = 1, search = "") => {
    fetch(`https://hacktour.onrender.com/home?page=${page}&limit=${hacksPerPage}&search=${search}`)
      .then((res) => res.json())
      .then((data) => {
        if (page === 1) {
          setHackData(data); 
        } else {
          setHackData((prev) => [...prev, ...data]);
        }
        setHasMore(data.length > 0);
      })
      .catch((err) => console.error(err));
  };
  

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

  const toggleDescription = (id) => {
    setHackData((prev) =>
      prev.map((item) =>
        item._id === id
          ? { ...item, isDescriptionVisible: !item.isDescriptionVisible }
          : item
      )
    );
  };
  

  const handleLike = (id) => {
    fetch(`https://hacktour.onrender.com/like/${id}`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ userId }),
    })
      .then((res) => {
        if (!res.ok) {
          throw new Error('You have already liked this hack!');
        }
        return res.json();
      })
      .then((updatedHack) => {
        setHackData((prev) =>
          prev.map((item) =>
            item._id === id ? { ...item, likes: updatedHack.likes } : item
          )
        );
      })
      .catch((err) => console.error(err.message));
  };

  const loadMoreHacks = () => {
    const nextPage = currentPage + 1;
    fetchHacks(nextPage);
    setCurrentPage(nextPage);
  };

  const breakpointColumnsObj = {
    default: 3,
    1100: 2,
    700: 1
  };

  return (
    <div className={`min-h-screen transition duration-500 ${theme === "dark" ? "bg-gray-900 text-white" : "bg-white text-white"}`}>
      <Header searchTerm={searchTerm} setSearchTerm={setSearchTerm} theme={theme} />
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
            className="px-4 py-2 text-white rounded-lg bg-gradient-to-r from-green-700 to-gray-900"
          >
            {formVisible ? "Cancel" : "Add Hack"}
          </button>
        </div>
        {formVisible && (
          <Form
            newHack={newHack}
            handleInputChange={handleInputChange}
            handleSubmit={handleSubmit}
            theme={theme}
          />
        )}
        <InfiniteScroll
          dataLength={filteredHacks.length}
          next={loadMoreHacks}
          hasMore={hasMore}
          loader={<h4>Loading more hacks...</h4>}
          endMessage={<p>No more hacks to show.</p>}
        >
          <Masonry
            breakpointCols={breakpointColumnsObj}
            className="my-masonry-grid"
            columnClassName="my-masonry-grid_column"
          >
            {filteredHacks.map((hack, index) => (
              <HackCard
              key={hack._id}
              hack={hack}
              toggleDescription={() => toggleDescription(hack._id)}
              handleLike={handleLike}
              theme={theme}
            />
            
            ))}
          </Masonry>
        </InfiniteScroll>
      </motion.div>
    </div>
  );
};

const Header = ({ searchTerm, setSearchTerm, theme }) => (
  <motion.div
    className={`py-4 px-6 sticky top-0 z-10 shadow-md ${theme === "dark" ? "bg-gray-800" : "bg-gray-200"}`}
    initial={{ y: -50, opacity: 0 }}
    animate={{ y: 0, opacity: 1 }}
    transition={{ duration: 0.5 }}
  >
    <input
      type="text"
      placeholder="Search hacks..."
      value={searchTerm}
      onChange={(e) => setSearchTerm(e.target.value)}
      className="w-full p-2 mb-6 rounded-md border border-gray-300 focus:ring-2 focus:ring-indigo-500"
    />
  </motion.div>
);

const Form = ({ newHack, handleInputChange, handleSubmit, theme }) => (
  <motion.form
    onSubmit={handleSubmit}
    className={`p-6 rounded-lg mb-6 ${theme === "dark" ? "bg-gray-700" : "bg-gray-100"}`}
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
      className="px-4 py-2 text-white rounded-lg bg-gradient-to-r from-green-700 to-gray-900">
      Add Hack
    </button>
  </motion.form>
);

const HackCard = ({ hack, toggleDescription }) => (
  <motion.div
    className="rounded-lg shadow-md p-4 bg-gray-800"
    whileHover={{ scale: 1.05 }}
  >
    <img src={hack.image} alt={hack.title} className="w-full rounded-lg mb-4" />
    <h2 className="text-xl font-semibold">{hack.title}</h2>
    {hack.isDescriptionVisible && <p className="text-sm">{hack.description}</p>}
    <button
      onClick={() => toggleDescription(hack._id)}
      className="text-indigo-400 hover:text-indigo-300 mt-2"
    >
      {hack.isDescriptionVisible ? "Hide Description" : "Show Description"}
    </button>
  </motion.div>
);

export default Home;
