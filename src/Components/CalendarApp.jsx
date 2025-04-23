import React, { useState, useEffect } from "react";
import ReactDOM from "react-dom";
import { Calendar as BigCalendar, momentLocalizer } from "react-big-calendar";
import moment from "moment";
import "react-big-calendar/lib/css/react-big-calendar.css";
import { useSelector } from "react-redux";
import supabase from "../Utils/Supabase";
import Loader from "./Loader";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { motion, AnimatePresence } from "framer-motion";

const localizer = momentLocalizer(moment);

// Reusable Modal for creating/editing events via portal
const EventModal = ({ isOpen, onClose, onSave, eventData, theme }) => {
  if (!isOpen) return null;

  const [title, setTitle] = useState(eventData?.title || "");
  const [description, setDescription] = useState(eventData?.description || "");
  const [start, setStart] = useState(
    (eventData?.start || new Date()).toISOString().slice(0, 16)
  );
  const [end, setEnd] = useState(
    (eventData?.end || new Date()).toISOString().slice(0, 16)
  );

  useEffect(() => {
    if (eventData) {
      setTitle(eventData.title || "");
      setDescription(eventData.description || "");
      setStart(eventData.start.toISOString().slice(0, 16));
      setEnd(eventData.end.toISOString().slice(0, 16));
    }
  }, [eventData]);

  const bgClass = theme === 'dark' ? 'bg-gray-900 text-white' : 'bg-white text-black';
  const inputBorder = theme === 'dark' ? 'border border-gray-600' : 'border border-gray-300';

  const modalContent = (
    <AnimatePresence>
      <motion.div
        className="fixed inset-0 z-[9999] flex items-center justify-center"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        style={{ backgroundColor: 'rgba(0, 0, 0, 0.6)', backdropFilter: 'blur(6px)' }}
        onClick={onClose}
      >
        <motion.div
          className={`${bgClass} rounded-2xl shadow-xl p-6 w-full max-w-md`}
          initial={{ scale: 0.8 }}
          animate={{ scale: 1 }}
          exit={{ scale: 0.8 }}
          onClick={(e) => e.stopPropagation()}
        >
          <h3 className="text-2xl font-semibold mb-4">
            {eventData?.id ? "Edit Event" : "New Event"}
          </h3>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium">Title</label>
              <input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className={`${theme=='dark'?'bg-gray-700':''} mt-1 w-full rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-blue-500 ${inputBorder}`}
              />
            </div>
            <div>
              <label className="block text-sm font-medium">Start</label>
              <input
                type="datetime-local"
                value={start}
                onChange={(e) => setStart(e.target.value)}
                className={` ${theme=='dark'?'bg-gray-700':''} mt-1 w-full rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-blue-500 ${inputBorder}`}
              />
            </div>
            <div>
              <label className="block text-sm font-medium">End</label>
              <input
                type="datetime-local"
                value={end}
                onChange={(e) => setEnd(e.target.value)}
                className={` ${theme=='dark'?'bg-gray-700':''} mt-1 w-full rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-blue-500 ${inputBorder}`}
              />
            </div>
            <div>
              <label className="block text-sm font-medium">Description</label>
              <textarea
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                className={`${theme=='dark'?'bg-gray-700':''} mt-1 w-full rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-blue-500 ${inputBorder}`}
                rows={3}
              />
            </div>
          </div>
          <div className="mt-6 flex justify-end space-x-3">
            <button
              onClick={onClose}
              className="px-4 py-2 bg-gray-200 hover:bg-gray-300 rounded-lg"
            >
              Cancel
            </button>
            <button
              onClick={() => onSave({
                ...eventData,
                title,
                description,
                start: new Date(start),
                end: new Date(end),
              })}
              className="px-4 py-2 bg-blue-600 text-white hover:bg-blue-700 rounded-lg"
            >
              Save
            </button>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );

  return ReactDOM.createPortal(modalContent, document.body);
};

const CalendarApp = () => {
  const theme = useSelector((state) => state.theme.mode);
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [modalOpen, setModalOpen] = useState(false);
  const [activeEvent, setActiveEvent] = useState(null);

  const fetchEvents = async () => {
    setLoading(true);
    const { data, error } = await supabase
      .from("events")
      .select("id, title, description, start_time, end_time");
    if (error) toast.error(error.message);
    else {
      setEvents(
        data.map((e) => ({
          id: e.id,
          title: e.title,
          start: new Date(e.start_time),
          end: new Date(e.end_time),
          description: e.description,
        }))
      );
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchEvents();
  }, []);

  const handleSelectSlot = ({ start, end }) => {
    setActiveEvent({ start, end });
    setModalOpen(true);
  };

  const handleSelectEvent = (event) => {
    setActiveEvent(event);
    setModalOpen(true);
  };

  const handleSave = async (evt) => {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      const payload = {
        title: evt.title,
        description: evt.description,
        start_time: evt.start.toISOString(),
        end_time: evt.end.toISOString(),
        owner_id: user.id,
      };
      if (evt.id) await supabase.from("events").update(payload).eq("id", evt.id);
      else await supabase.from("events").insert(payload);
      setModalOpen(false);
      fetchEvents();
      toast.success("Event saved");
    } catch (err) {
      toast.error(err.message);
    }
  };

  if (loading) return <Loader />;

  const containerBg = theme === 'dark' ? 'bg-gray-800 text-white' : 'bg-white text-black';

  return (
    <div className={`max-w-5xl mx-auto mt-8 p-4 shadow-lg rounded-xl ${containerBg}`}>
      <ToastContainer />
      <BigCalendar
        localizer={localizer}
        events={events}
        startAccessor="start"
        endAccessor="end"
        style={{ height: "70vh" }}
        selectable
        onSelectSlot={handleSelectSlot}
        onSelectEvent={handleSelectEvent}
        views={{ month: true, week: true, day: true, agenda: true }}
        toolbar
        popup
        className="rounded-lg overflow-hidden"
      />
      <EventModal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        onSave={handleSave}
        eventData={activeEvent}
        theme={theme}
      />
    </div>
  );
};

export default CalendarApp;
