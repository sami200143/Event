import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';

export default function UpdateEvent() {
  const { id } = useParams(); // Get event ID from the URL
  const navigate = useNavigate();

  const [eventData, setEventData] = useState({
    title: '',
    date: '',
    time: '',
    location: '',
    description: '',
    category: '',
    packageId: ''
  });

  const [categories, setCategories] = useState([
    'Weddings','Engagement','Birthdays', 'Home Decor'
  ]);
  const [packages, setPackages] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('');

  // Fetch event details based on the ID
  useEffect(() => {
    const fetchEvent = async () => {
      try {
        const response = await fetch(`/api/event/event/${id}`);
        const data = await response.json();
        setEventData({
          title: data.title,
          date: new Date(data.date).toISOString().split('T')[0],  // Format date to YYYY-MM-DD
          time: data.time,
          location: data.location,
          description: data.description,
          category: data.category,
          packageId: data.packageId
        });
        setSelectedCategory(data.category); // Set the initial category
      } catch (error) {
        console.error('Error fetching event:', error);
      }
    };

    fetchEvent();
  }, [id]);

  // Fetch packages based on the selected category
  useEffect(() => {
    const fetchPackages = async () => {
      if (selectedCategory) {
        try {
          const response = await fetch(`/api/package?category=${selectedCategory}`);
          const data = await response.json();
          setPackages(data);
        } catch (error) {
          console.error('Error fetching packages:', error);
        }
      } else {
        setPackages([]); // Clear packages if no category is selected
      }
    };

    fetchPackages();
  }, [selectedCategory]);

  // Handle input change
  const handleChange = (e) => {
    const { name, value } = e.target;
    setEventData({ ...eventData, [name]: value });
  };

  // Handle category change
  const handleCategoryChange = (e) => {
    const category = e.target.value;
    setSelectedCategory(category);
    setEventData({ ...eventData, category: category });
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch(`/api/event/event/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(eventData),
      });

      if (response.ok) {
        alert('Event updated successfully');
        navigate('/event-manage'); // Redirect to the events page
      } else {
        const errorData = await response.json();
        alert(`Error: ${errorData.message}`);
      }
    } catch (error) {
      alert('An error occurred while updating the event');
    }
  };

  return (
    <div className="flex min-h-screen bg-purple-100">
      {/* Sidebar */}
      <nav className="w-64 bg-purple-300 text-white h-screen p-6">
        <h1 className="text-3xl font-semibold mb-6">Admin Panel</h1>
        <ul>
          <li className="mb-4">
            <Link
              to="/"
              className="block py-2 px-4 rounded-lg hover:bg-purple-400"
            >
              Main Dashboard
            </Link>
          </li>
          <li className="mb-4">
            <Link
              to="/event-manage"
              className="block py-2 px-4 rounded-lg hover:bg-purple-400"
            >
              Manage Events
            </Link>
          </li>
          <li className="mb-4">
            <Link
              to="/add-event"
              className="block py-2 px-4 rounded-lg hover:bg-purple-400"
            >
              Add Event
            </Link>
          </li>
          <li className="mb-4">
            <Link
              to="/event-calendar"
              className="block py-2 px-4 rounded-lg hover:bg-purple-400"
            >
              Event Calendar
            </Link>
          </li>
        </ul>
      </nav>
      {/* Main Content */}
      <div className="flex-1 pt-20">
        <div className="bg-white p-8 rounded-lg shadow-lg max-w-6xl mx-auto">
          <h2 className="text-3xl font-semibold text-purple-600 mb-6">
            Update Event
          </h2>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {/* Left Side - First 4 Inputs */}
              <div className="space-y-6">
                <div>
                  <label
                    htmlFor="title"
                    className="block text-sm font-medium text-purple-600"
                  >
                    Title:
                  </label>
                  <input
                    type="text"
                    id="title"
                    name="title"
                    value={eventData.title}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-2 border border-purple-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                  />
                </div>
                <div>
                  <label
                    htmlFor="date"
                    className="block text-sm font-medium text-purple-600"
                  >
                    Date:
                  </label>
                  <input
                    type="date"
                    id="date"
                    name="date"
                    value={eventData.date}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-2 border border-purple-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                  />
                </div>
                <div>
                  <label
                    htmlFor="time"
                    className="block text-sm font-medium text-purple-600"
                  >
                    Time:
                  </label>
                  <input
                    type="time"
                    id="time"
                    name="time"
                    value={eventData.time}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-2 border border-purple-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                  />
                </div>
                <div>
                  <label
                    htmlFor="location"
                    className="block text-sm font-medium text-purple-600"
                  >
                    Location:
                  </label>
                  <input
                    type="text"
                    id="location"
                    name="location"
                    value={eventData.location}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-2 border border-purple-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                  />
                </div>
              </div>

              {/* Right Side - Remaining Inputs and Button */}
              <div className="space-y-6">
                <div>
                  <label
                    htmlFor="description"
                    className="block text-sm font-medium text-purple-600"
                  >
                    Description:
                  </label>
                  <textarea
                    id="description"
                    name="description"
                    value={eventData.description}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-2 border border-purple-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                  ></textarea>
                </div>

                <div>
                  <label
                    htmlFor="category"
                    className="block text-sm font-medium text-purple-600"
                  >
                    Category:
                  </label>
                  <select
                    id="category"
                    name="category"
                    value={eventData.category}
                    onChange={handleCategoryChange}
                    required
                    className="w-full px-4 py-2 border border-purple-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                  >
                    <option value="">Select a category</option>
                    {categories.map(category => (
                      <option key={category} value={category}>
                        {category}
                      </option>
                    ))}
                  </select>
                </div>

                {packages.length > 0 && (
                  <div>
                    <label
                      htmlFor="package"
                      className="block text-sm font-medium text-purple-600"
                    >
                      Package:
                    </label>
                    <select
                      id="package"
                      name="packageId"
                      value={eventData.packageId}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-2 border border-purple-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                    >
                      <option value="">Select a package</option>
                      {packages.map(pkg => (
                        <option key={pkg._id} value={pkg._id}>
                          {pkg.name}
                        </option>
                      ))}
                    </select>
                  </div>
                )}
              </div>
            </div>

            <div className="flex justify-center">
              <button
                type="submit"
                className="bg-purple-400 w-1/3 text-white px-4 py-2 mt-5 rounded-lg hover:bg-purple-500 transition duration-300 focus:outline-none focus:ring-2 focus:ring-purple-500"
              >
                Update Event
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
