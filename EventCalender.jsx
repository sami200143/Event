import React, { useState, useEffect } from 'react';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css'; // Import the calendar styles
import { Link } from "react-router-dom";

export default function CalendarPage() {
  const [events, setEvents] = useState([]);
  const [date, setDate] = useState(new Date());

  // Fetch events from API
  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const response = await fetch('/api/event/event');
        const data = await response.json();
        setEvents(data);
      } catch (error) {
        console.error('Error fetching events:', error);
      }
    };

    fetchEvents();
  }, []);

  // Handle date change
  const handleDateChange = (newDate) => {
    setDate(newDate);
  };

  // Get events for the selected date
  const getEventsForDate = (date) => {
    const selectedDate = new Date(date).toDateString();
    return events
      .filter(event => new Date(event.date).toDateString() === selectedDate)
      .map(event => event.title)
      .join(', ');
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
        <div className="bg-white p-8 rounded-lg shadow-lg max-w-4xl mx-auto">
      <h2 className="text-3xl font-semibold text-purple-600 mb-6">Event Calendar</h2>
      <div className="bg-white shadow-lg rounded-lg p-4 mb-6 flex justify-center">
        <Calendar
          onChange={handleDateChange}
          value={date}
          className="react-calendar"
        />
      </div>
      <div className="bg-white shadow-lg rounded-lg p-4 w-full max-w-md">
        <h3 className="text-xl font-medium text-purple-600 mb-4">
          Events on {date.toDateString()}:
        </h3>
        <p className="text-gray-700">
          {getEventsForDate(date) || 'No events'}
        </p>
      </div>
    </div>
    </div>
    </div>
  );
}
