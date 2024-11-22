import React, { useState, useEffect } from "react";

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
  const [formVisible, setFormVisible] = useState(false); // To toggle the form visibility
  const [searchTerm, setSearchTerm] = useState(""); // State for search term

  const shuffleArray = (array) => {
    return array.sort(() => Math.random() - 0.5);
  };

  // Scroll state on scroll
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 0) {
        setWelcomeAnimation("slide-out"); // slide out
        setHasScrolled(true);
      } else {
        setHasScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Fetch data from the backend and shuffle it
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

  // Toggle description visibility
  const toggleDescription = (index) => {
    const updatedData = [...hackData];
    updatedData[index].isDescriptionVisible = !updatedData[index].isDescriptionVisible;
    setHackData(updatedData);
  };

  // Handle form input change
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewHack((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();

    // Sending POST request to backend
    fetch("https://hacktour.onrender.com/add", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newHack),
    })
      .then((response) => response.json())
      .then((data) => {
        // After successful post, update hack data
        setHackData((prevData) => [data, ...prevData]);
        setNewHack({ title: "", description: "", image: "", likes: 0 }); // Reset form
        setFormVisible(false); // Hide the form after submission
      })
      .catch((error) => {
        console.error("Error adding hack:", error);
      });
  };

  // Filter hack data based on search term
  const filteredHackData = hackData.filter((item) => {
    return (
      item.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.description.toLowerCase().includes(searchTerm.toLowerCase())
    );
  });

  return (
    <div className="max-w-screen-2xl mx-auto pt-8 md:pt-8 p-6 md:p-20">
      {/* Welcome Animation */}
      <div
        className={`fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-80 transition-transform duration-700 ${
          welcomeAnimation === "slide-in" ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <h1 className="text-white text-4xl md:text-6xl font-bold">HackTour!</h1>
      </div>

      {/* Navbar */}
      <div
        className={`fixed top-0 left-0 right-0 z-10 transition-shadow duration-300 ${
          hasScrolled ? "shadow-[1px_4px_20px_rgba(1,1,2,0.9)]" : ""
        }`}
      >
        {/* Navbar content can be added here */}
      </div>

      {/* Search Bar */}
      <div className="mt-6">
        <input
          type="text"
          className="px-4 py-2 w-full bg-gray-800 text-white rounded-full"
          placeholder="Search for a hack..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      {/* Add New Hack Button */}
      <div className="mt-6">
        <button
          onClick={() => setFormVisible(!formVisible)}
          className="px-5 py-2 bg-green-500 text-white rounded-full hover:bg-green-600 transition"
        >
          {formVisible ? "Cancel" : "Add New Hack"}
        </button>
      </div>

      {/* Add Hack Form */}
      {formVisible && (
        <form onSubmit={handleSubmit} className="mt-6 space-y-4">
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
        </form>
      )}

      {/* Hack Data Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mt-12">
        {filteredHackData.map((item, index) => (
          <div
            key={item._id}
            className="bg-gray-900 p-6 rounded-lg shadow-xl hover:shadow-2xl transform hover:-translate-y-2 transition duration-500"
          >
            <div className="relative group">
              <img
                src={item.image}
                alt={item.title}
                className="w-full h-48 object-cover rounded-lg group-hover:opacity-80 transition duration-500"
              />
              <div className="absolute inset-0 bg-black bg-opacity-50 opacity-0 group-hover:opacity-100 transition duration-500 flex items-center justify-center">
                <p className="text-white">{item.title}</p>
              </div>
            </div>
            {item.isDescriptionVisible && (
              <p className="text-white mt-4">{item.description}</p>
            )}
            <div className="mt-4 flex items-center justify-between">
              <span className="text-white">{item.likes} Likes</span>
              <button
                onClick={() => toggleDescription(index)}
                className="text-blue-500 hover:underline"
              >
                {item.isDescriptionVisible ? "Hide Description" : "Show Description"}
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Home;
