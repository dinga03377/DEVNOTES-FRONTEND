import React, { useState, useEffect } from "react";
import {
  Menu,
  X,
  Search,
  Plus,
  Trash2,
  Pencil,
  LogOut,
  Upload,
  Pin,
  StickyNote,
  Moon,
  NotebookPen,
  Sun,
  Loader2,
  FileDown,
  GripVertical,
} from "lucide-react";
import toast from "react-hot-toast";

import {
  getNotes,
  createNotes,
  delateNotes,
  updateNotes,
  uploadProfileImage,
  getProfile,
  pinNote,
} from "../api/api";

import { useNavigate } from "react-router-dom";
import { useContext, useRef } from "react";
import { ThemeContext } from "../context/ThemeContext";
import ReactQuill from "react-quill-new";
import { motion, AnimatePresence } from "framer-motion";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";
import { DragDropContext, Droppable, Draggable,} from "@hello-pangea/dnd";

// Category → visual language. Purely presentational: keys match the same
// category strings already used by the create/edit form and API payloads.
const CATEGORY_STYLES = {
  Personal: {
    dot: "bg-violet-500",
    chip: "bg-violet-50 dark:bg-violet-900/30 text-violet-700 dark:text-violet-300",
    ring: "border-violet-500",
    solid: "bg-violet-600 text-white",
  },
  Work: {
    dot: "bg-rose-500",
    chip: "bg-rose-50 dark:bg-rose-900/30 text-rose-700 dark:text-rose-300",
    ring: "border-rose-500",
    solid: "bg-rose-600 text-white",
  },
  Ideas: {
    dot: "bg-amber-500",
    chip: "bg-amber-50 dark:bg-amber-900/30 text-amber-700 dark:text-amber-300",
    ring: "border-amber-500",
    solid: "bg-amber-500 text-white",
  },
  School: {
    dot: "bg-sky-500",
    chip: "bg-sky-50 dark:bg-sky-900/30 text-sky-700 dark:text-sky-300",
    ring: "border-sky-500",
    solid: "bg-sky-600 text-white",
  },
};

const getCategoryStyle = (cat) => CATEGORY_STYLES[cat] || CATEGORY_STYLES.Personal;

const CATEGORY_OPTIONS = ["Personal", "Work", "Ideas", "School"];

const Dashboard = () => {

  const [editId, setEditId] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [category, setCategory] = useState("Personal");
  const [notes, setNotes] = useState([]);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState("");
  const [search, setSearch] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [user, setUser] = useState(null);
  const { theme, toggleTheme } = useContext(ThemeContext);

const sidebarRef = useRef();
const searchRef = useRef();

  const navigate = useNavigate();

  const handleExportPDF = () => {

  const doc = new jsPDF();

  doc.setFontSize(20);

  doc.text("DevNotes Export", 14, 20);

  const tableData = filteredNotes.map((note) => [

    note.title,

    note.category || "Personal",

    note.content
  .replace(/<[^>]*>/g, "")
  .replace(/&nbsp;/g, " ")
  .slice(0, 120),

    note.createdAt
      ? new Date(note.createdAt).toLocaleDateString()
      : "",

  ]);

  autoTable(doc, {

    head: [["Title", "Category", "Content", "Date"]],

    body: tableData,

    startY: 30,

    styles: {
      fontSize: 10,
      cellPadding: 3,
    },

    headStyles: {
      fillColor: [37, 99, 235],
    },

  });

  doc.save("DevNotes.pdf");
};

  // Logout
  const handleLogout = () => {
    localStorage.removeItem("token");
    sessionStorage.removeItem("token");

    navigate("/login");
  };

  // Edit
  const handleEdit = (note) => {
    setTitle(note.title);
    setContent(note.content);
    setCategory(note.category || "Personal");
    setEditId(note._id);
    setShowModal(true);
  };

  // Delete
  const handleDelete = async (id) => {

    const confirmDelete = window.confirm(
      "Delete this note?"
    );

    if (!confirmDelete) return;

    try {
      await delateNotes(id);

      setNotes((prev) =>
        prev.filter((note) => note._id !== id)
      );

      toast.success("Note deleted successfully");

    } catch (error) {
      console.log(error);
    }
  };

  // Create / Update
  const handleCreateNote = async () => {

    if (!title || !content) {
      toast.error("Please fill all fields");
      return;
    }

    try {

      if (editId) {

        await updateNotes(editId, {
          title,
          content,
          category,
        });

        fetchNotes();

        toast.success("Note updated successfully");

      } else {

        const newNote = await createNotes({
          title,
          content,
          category,
        });

        setNotes((prev) => [newNote, ...prev]);

        toast.success("Note created successfully");
      }

      setTitle("");
      setContent("");
      setCategory("Personal");
      setEditId(null);
      setShowModal(false);

    } catch (error) {
      console.log(error);
    }
  };

  // Upload Image
  const handleImageUpload = async (e) => {

    const file = e.target.files[0];

    if (!file) return;

    if (!file.type.startsWith("image/")) {
      toast.error("Please upload image file");
      return;
    }

    const formData = new FormData();

    formData.append("profileImage", file);

    try {

      await uploadProfileImage(formData);

      const updatedUser = await getProfile();

      setUser(updatedUser);

      toast.success("Profile updated");

    } catch (error) {
      console.log(error);
    }
  };

  // Fetch Notes
  const fetchNotes = async () => {

    setLoading(true);

    try {

      const data = await getNotes();

      setNotes(data);

    } catch (error) {

      console.log(error);

    } finally {

      setLoading(false);
    }
  };

  // Initial Notes
  useEffect(() => {
    fetchNotes();
  }, []);

  // Fetch User
  useEffect(() => {

    const fetchUser = async () => {

      try {

        const data = await getProfile();

        setUser(data);

      } catch (error) {

        console.log(error);
      }
    };

    fetchUser();

  }, []);

  // Success Message Timeout
  useEffect(() => {

    if (success) {

      const timer = setTimeout(() => {
        setSuccess("");
      }, 3000);

      return () => clearTimeout(timer);
    }

  }, [success]);

  useEffect(() => {

  const handleClickOutside = (e) => {

    if (
      sidebarRef.current &&
      !sidebarRef.current.contains(e.target)
    ) {
      setSidebarOpen(false);
    }
  };

  if (sidebarOpen) {
    document.addEventListener(
      "mousedown",
      handleClickOutside
    );
  }

  return () => {
    document.removeEventListener(
      "mousedown",
      handleClickOutside
    );
  };

}, [sidebarOpen]);

// Toggle Pin
const handlePin = async (id) => {

  try {

    const updatedNote = await pinNote(id);

    setNotes((prev) =>
      prev.map((note) =>
        note._id === id ? updatedNote : note
      )
    );

    toast.success(
      updatedNote.pinned
        ? "Note pinned 📌"
        : "Note unpinned"
    );

  } catch (error) {

    console.log(error);

    toast.error("Failed to pin note");
  }
};

const handleDragEnd = (result) => {

  if (!result.destination) return;

  const items = Array.from(filteredNotes);

  const [reorderedItem] = items.splice(
    result.source.index,
    1
  );

  items.splice(
    result.destination.index,
    0,
    reorderedItem
  );

  setNotes(items);
};

  // ⌘K / Ctrl+K focuses search — purely additive convenience, doesn't
  // touch any existing state or handlers.
  useEffect(() => {

    const handleShortcut = (e) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        searchRef.current?.focus();
      }
    };

    document.addEventListener("keydown", handleShortcut);

    return () => document.removeEventListener("keydown", handleShortcut);

  }, []);

  // Filter Notes
  const filteredNotes =
  notes
    ?.filter((note) => {

      const matchesSearch =
        note.title
          ?.toLowerCase()
          .includes(search.toLowerCase()) ||
        note.content
          ?.toLowerCase()
          .includes(search.toLowerCase());

      const matchesCategory =
        selectedCategory === "All" ||
        note.category === selectedCategory;

      return matchesSearch && matchesCategory;
    })

    ?.sort((a, b) => b.pinned - a.pinned) || [];

  return (
    <div className="flex min-h-screen bg-paper dark:bg-ink transition">

      {/* Sidebar */}
      <aside
        ref={sidebarRef}
        className={`fixed md:relative z-50 top-0 left-0 h-screen w-72
        bg-stone-900 dark:bg-stone-950
        border-r border-stone-800
        p-6 flex flex-col transition-all duration-300
        ${sidebarOpen ? "translate-x-0" : "-translate-x-full"}
        md:translate-x-0`}
      >
        <div className="absolute inset-0 bg-grain opacity-[0.05] pointer-events-none" />

        {/* Logo */}
        <div className="relative flex items-center gap-3 mb-10">

          <div className="w-10 h-10 rounded-xl bg-teal-600 flex items-center justify-center shrink-0">
            <NotebookPen className="text-white" size={19} />
          </div>

          <div>
            <h2 className="font-display text-lg font-bold text-white">
              DevNotes
            </h2>

            <p className="text-[11px] font-mono text-stone-500">
              notes dashboard
            </p>
          </div>

        </div>

        <button
          onClick={() => setSidebarOpen(false)}
          className="absolute top-4 right-4 md:hidden p-2 rounded-lg bg-stone-800"
        >
         <X className="text-white" size={18} />
        </button>

        {/* User */}
        <div className="relative flex items-center gap-3 mb-8 p-3 rounded-2xl bg-stone-800/50 border border-stone-800">

          <label className="relative cursor-pointer group shrink-0">

            {user?.profileImage ? (

                 <img
                   src={user.profileImage}
                   alt="profile"
                   className="w-12 h-12 rounded-full object-cover border-2 border-teal-500"
                 />
               
               ) : (
               
                 <div
                   className="w-12 h-12 rounded-full bg-teal-600 text-white
                   flex items-center justify-center text-lg font-display font-bold border-2 border-teal-500"
                 >
                   {user?.name?.charAt(0)?.toUpperCase() || "U"}
                 </div>

               )}

            <div
              className="absolute inset-0 rounded-full bg-black/50 opacity-0 
              group-hover:opacity-100 transition flex items-center justify-center"
            >
              <Upload
                size={14}
                className="text-white"
              />
            </div>

            <input
              type="file"
              className="hidden"
              onChange={handleImageUpload}
            />
          </label>

          <div className="min-w-0">
            <h3 className="font-semibold text-white truncate">
              {user?.name || "User"}
            </h3>

            <p className="text-xs text-stone-400">
              Welcome back 👋
            </p>
          </div>

        </div>

        {/* Category quick reference */}
        <div className="relative mb-8">
          <p className="text-[11px] font-mono uppercase tracking-wide text-stone-500 mb-3 px-1">
            Categories
          </p>
          <div className="space-y-1">
            {CATEGORY_OPTIONS.map((cat) => {
              const count = notes.filter((n) => n.category === cat).length;
              const style = getCategoryStyle(cat);
              return (
                <button
                  key={cat}
                  onClick={() => setSelectedCategory(cat)}
                  className={`w-full flex items-center justify-between px-3 py-2 rounded-xl text-sm transition ${
                    selectedCategory === cat
                      ? "bg-stone-800 text-white"
                      : "text-stone-400 hover:bg-stone-800/60 hover:text-white"
                  }`}
                >
                  <span className="flex items-center gap-2">
                    <span className={`w-2 h-2 rounded-full ${style.dot}`} />
                    {cat}
                  </span>
                  <span className="text-xs font-mono text-stone-500">{count}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Logout */}
        <button
          onClick={handleLogout}
          className="relative mt-auto w-full flex items-center justify-center gap-2 
          bg-rose-600/90 hover:bg-rose-600 text-white py-3 rounded-xl transition font-medium"
        >
          <LogOut size={18} />
          Logout
        </button>

      </aside>

      {sidebarOpen && (
       <div
        className="fixed inset-0 bg-black/40 z-40 md:hidden"
        onClick={() => setSidebarOpen(false)}
       />
      )}

      {/* Main */}
      <main className="flex-1 min-w-0">

        {/* Topbar */}
        <div
          className="sticky top-0 z-40 backdrop-blur-xl bg-paper/80 dark:bg-ink/80
          border-b border-stone-200 dark:border-stone-800 px-4 md:px-8 py-4 flex flex-wrap items-center gap-3 justify-between"
        >

          <div className="flex items-center gap-3">

            <button
              onClick={() =>
                setSidebarOpen(!sidebarOpen)
              }
              className="md:hidden p-2 rounded-lg bg-stone-100 dark:bg-stone-800"
            >
              {sidebarOpen ? (
                <X className="text-stone-700 dark:text-white" size={18} />
              ) : (
                <Menu className="text-stone-700 dark:text-white" size={18} />
              )}
            </button>

            <h1 className="font-display text-xl font-bold text-stone-900 dark:text-white hidden sm:block">
              My Notes
            </h1>

            <button
                onClick={toggleTheme}
                className="p-2 rounded-xl bg-stone-100 dark:bg-stone-800
                hover:scale-110 transition"
              >
                {theme === "dark" ? (
                  <Sun
                    size={18}
                    className="text-amber-400"
                  />
                ) : (
                  <Moon
                    size={18}
                    className="text-stone-700"
                  />
                )}
              </button>

          </div>

          {/* Search */}
          <div className="relative flex-1 max-w-md min-w-[180px]">

            <Search
              size={17}
              className="absolute left-3.5 top-1/2 -translate-y-1/2 text-stone-400"
            />

            <input
              ref={searchRef}
              type="text"
              placeholder="Search notes..."
              value={search}
              onChange={(e) =>
                setSearch(e.target.value)
              }
              className="pl-10 pr-14 w-full p-2.5 rounded-xl bg-stone-100 dark:bg-stone-800 border border-transparent
              focus:border-teal-500 outline-none text-stone-800 dark:text-white transition"
            />

            <kbd className="hidden md:flex absolute right-2.5 top-1/2 -translate-y-1/2 items-center gap-0.5 text-[10px] font-mono text-stone-400 bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-700 px-1.5 py-0.5 rounded-md">
              ⌘K
            </kbd>

          </div>

          {/* Category filter — pill buttons, same setSelectedCategory setter */}
          <div className="hidden lg:flex items-center gap-1.5 p-1 rounded-xl bg-stone-100 dark:bg-stone-800">
            {["All", ...CATEGORY_OPTIONS].map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-3 py-1.5 rounded-lg text-xs font-medium transition ${
                  selectedCategory === cat
                    ? "bg-white dark:bg-stone-950 text-stone-900 dark:text-white shadow-sm"
                    : "text-stone-500 dark:text-stone-400 hover:text-stone-800 dark:hover:text-white"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Mobile-only fallback select, same state */}
          <select
           value={selectedCategory}
           onChange={(e) =>
             setSelectedCategory(e.target.value)
           }
           className="lg:hidden p-2.5 rounded-xl bg-stone-100 dark:bg-stone-800 border border-transparent
           text-stone-800 dark:text-white outline-none text-sm"
         >
         
           <option value="All">All</option>
         
           {CATEGORY_OPTIONS.map((cat) => (
             <option key={cat} value={cat}>{cat}</option>
           ))}
         
         </select>

        </div>

        {/* Success */}
        {success && (
          <div
            className="mx-6 mt-4 bg-teal-50 dark:bg-teal-900/20 text-teal-700 dark:text-teal-400
            p-3 rounded-xl animate-pulse border border-teal-200 dark:border-teal-900/40"
          >
            {success}
          </div>
        )}

        {/* Content */}
        <div className="p-6">

          {/* Header */}
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">

            <div>
              <h2 className="font-display text-3xl font-bold text-stone-900 dark:text-white">
                Welcome, {user?.name || "User"} 👋
              </h2>

              <p className="text-stone-500 dark:text-stone-400">
                Organize your thoughts beautifully
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-3">

               <button
                 onClick={handleExportPDF}
                 className="flex items-center justify-center gap-2
                 bg-white dark:bg-stone-900 hover:bg-stone-100 dark:hover:bg-stone-800
                 text-stone-800 dark:text-white border border-stone-200 dark:border-stone-700
                 px-5 py-3 rounded-xl transition shadow-sm font-medium"
               >
                 <FileDown size={17} />
                 Export PDF
               </button>
             
               <button
                 onClick={() => setShowModal(true)}
                 className="flex items-center justify-center gap-2
                 bg-stone-900 hover:bg-teal-700 dark:bg-teal-600 dark:hover:bg-teal-500 text-white
                 px-5 py-3 rounded-xl transition shadow-lg shadow-stone-900/10 font-medium"
               >
                 <Plus size={18} />
                 Create Note
               </button>
             
             </div>

          </div>

          {/* Notes */}
          {loading ? (

          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">

           {[1,2,3,4,5,6].map((item) => (

             <div
               key={item}
               className="animate-pulse rounded-2xl p-5
               bg-white dark:bg-stone-900
               border border-stone-200 dark:border-stone-800"
             >
         
                  <div className="h-6 w-40 rounded bg-stone-200 dark:bg-stone-700 mb-4" />
            
                  <div className="space-y-3 mb-6">
            
                    <div className="h-4 rounded bg-stone-100 dark:bg-stone-800" />
            
                    <div className="h-4 rounded bg-stone-100 dark:bg-stone-800" />
            
                    <div className="h-4 w-3/4 rounded bg-stone-100 dark:bg-stone-800" />
            
                  </div>

                  <div className="flex justify-between items-center">
            
                    <div className="h-3 w-24 rounded bg-stone-100 dark:bg-stone-800" />
            
                    <div className="flex gap-2">
            
                      <div className="w-8 h-8 rounded bg-stone-100 dark:bg-stone-800" />
            
                      <div className="w-8 h-8 rounded bg-stone-100 dark:bg-stone-800" />
            
                    </div>
            
                  </div>
            
                </div>
              ))}
            </div>

          ) : filteredNotes.length === 0 ? (

             <div
               className="relative overflow-hidden bg-white dark:bg-stone-900 border border-stone-200
               dark:border-stone-800 rounded-2xl p-10 text-center shadow-sm"
             >
               <div className="absolute inset-0 bg-grain opacity-[0.02] dark:opacity-[0.04] pointer-events-none" />

               <StickyNote
                 size={44}
                 className="relative mx-auto text-teal-600 dark:text-teal-400 mb-4"
               />
           
               {search ? (
                 <>
                   <h3 className="relative font-display text-xl font-semibold text-stone-800 dark:text-white mb-2">
                     No matching notes
                   </h3>
           
                   <p className="relative text-stone-500 dark:text-stone-400">
                     Try searching with another keyword 🔍
                   </p>
                 </>
               ) : (
                 <>
                   <h3 className="relative font-display text-xl font-semibold text-stone-800 dark:text-white mb-2">
                     No notes yet
                   </h3>
           
                   <p className="relative text-stone-500 dark:text-stone-400">
                     Start creating beautiful notes 🚀
                   </p>
                 </>
               )}
           
           </div>
          ) : (

            <DragDropContext onDragEnd={handleDragEnd}>

  <Droppable droppableId="notes">

    {(provided) => (

      <div
        {...provided.droppableProps}
        ref={provided.innerRef}
        className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6"
      >

        {filteredNotes.map((note, index) => {

          const style = getCategoryStyle(note.category || "Personal");

          return (

          <Draggable
            key={note._id}
            draggableId={note._id}
            index={index}
          >

            {(provided) => (

              <motion.div
                ref={provided.innerRef}
                {...provided.draggableProps}
                key={note._id}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{
                  duration: 0.4,
                  delay: index * 0.06,
                }}
                whileHover={{
                  y: -5,
                  scale: 1.015,
                }}
                className={`group relative bg-white dark:bg-stone-900 border-l-4 ${style.ring} border-t border-r border-b border-stone-200 dark:border-stone-800
                rounded-2xl p-5 shadow-sm hover:shadow-xl transition-shadow duration-300`}
              >

                <div className="flex items-start justify-between mb-3">

                  <span className={`inline-flex items-center gap-1.5 text-xs font-mono px-2.5 py-1 rounded-full ${style.chip}`}>
                    <span className={`w-1.5 h-1.5 rounded-full ${style.dot}`} />
                    {note.category || "Personal"}
                  </span>

                  <div
                    {...provided.dragHandleProps}
                    className="p-1 rounded text-stone-300 dark:text-stone-700 opacity-0 group-hover:opacity-100 transition cursor-grab active:cursor-grabbing"
                    title="Drag to reorder"
                  >
                    <GripVertical size={16} />
                  </div>

                </div>

                {note.pinned && (
                  <div
                    className="inline-flex items-center gap-1 text-xs font-medium mb-3
                    px-2 py-1 rounded-full bg-amber-100 dark:bg-amber-900/30 text-amber-700 dark:text-amber-400"
                  >
                    <Pin size={11} className="fill-amber-600 dark:fill-amber-400" />
                    Pinned
                  </div>
                )}

                <h3 className="font-display text-xl font-semibold text-stone-800 dark:text-white mb-3">
                  {note.title}
                </h3>

                <div
                  className="text-stone-600 dark:text-stone-300 mb-5 line-clamp-4 prose dark:prose-invert max-w-none prose-sm"
                  dangerouslySetInnerHTML={{
                    __html: note.content,
                  }}
                />

                <div className="flex items-center justify-between pt-3 border-t border-stone-100 dark:border-stone-800">

                  <p className="text-xs font-mono text-stone-400">
                    {note.createdAt
                      ? new Date(
                          note.createdAt
                        ).toLocaleString()
                      : ""}
                  </p>

                  <div className="flex gap-1.5">

                    <button
                      onClick={() => handlePin(note._id)}
                      className={`p-2 rounded-lg transition
                      ${
                        note.pinned
                          ? "bg-amber-100 dark:bg-amber-900/30"
                          : "bg-stone-100 dark:bg-stone-800 hover:bg-amber-50 dark:hover:bg-amber-900/20"
                      }`}
                    >
                      <Pin
                        size={15}
                        className={
                          note.pinned
                            ? "text-amber-500 fill-amber-500"
                            : "text-stone-500"
                        }
                      />
                    </button>

                    <button
                      onClick={() =>
                        handleEdit(note)
                      }
                      className="p-2 rounded-lg bg-stone-100 dark:bg-stone-800 hover:bg-teal-50 dark:hover:bg-teal-900/20 transition"
                    >
                      <Pencil
                        size={15}
                        className="text-teal-700 dark:text-teal-400"
                      />
                    </button>

                    <button
                      onClick={() =>
                        handleDelete(note._id)
                      }
                      className="p-2 rounded-lg bg-stone-100 dark:bg-stone-800 hover:bg-rose-50 dark:hover:bg-rose-900/20 transition"
                    >
                      <Trash2
                        size={15}
                        className="text-rose-500"
                      />
                    </button>

                  </div>

                </div>

              </motion.div>
            )}

          </Draggable>
          );
        })}

        {provided.placeholder}

      </div>
    )}

  </Droppable>

</DragDropContext>
          )}
        </div>
      </main>

      {/* Modal */}
      <AnimatePresence>
      {showModal && (

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4"
        >

          <motion.div
            initial={{ scale: 0.8, opacity: 0, y: 40 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.8, opacity: 0, y: 40 }}
            transition={{ duration: 0.3 }}
            className="w-full max-w-lg rounded-3xl p-6 bg-white dark:bg-stone-900
            border border-stone-200 dark:border-stone-800 max-h-[90vh] overflow-y-auto"
          >

            <div className="flex items-center gap-2 mb-6">
              <span className="w-2.5 h-2.5 rounded-full bg-rose-400" />
              <span className="w-2.5 h-2.5 rounded-full bg-amber-400" />
              <span className="w-2.5 h-2.5 rounded-full bg-teal-500" />
              <h2 className="font-display text-xl font-bold text-stone-800 dark:text-white ml-2">
                {editId ? "Edit Note" : "Create Note"}
              </h2>
            </div>

            <input
              type="text"
              placeholder="Note title..."
              value={title}
              onChange={(e) =>
                setTitle(e.target.value)
              }
              className="w-full p-4 rounded-xl mb-4 bg-stone-100 dark:bg-stone-800
              border border-stone-200 dark:border-stone-700 outline-none text-stone-800 dark:text-white
              font-display text-lg focus:border-teal-500 transition"
            />

            {/* Category — pill buttons, same setCategory setter */}
            <div className="flex flex-wrap gap-2 mb-4">
              {CATEGORY_OPTIONS.map((cat) => {
                const style = getCategoryStyle(cat);
                const active = category === cat;
                return (
                  <button
                    key={cat}
                    type="button"
                    onClick={() => setCategory(cat)}
                    className={`flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-sm font-medium border transition ${
                      active
                        ? `${style.solid} border-transparent`
                        : "bg-transparent border-stone-200 dark:border-stone-700 text-stone-600 dark:text-stone-300 hover:border-stone-300 dark:hover:border-stone-600"
                    }`}
                  >
                    <span className={`w-1.5 h-1.5 rounded-full ${active ? "bg-white" : style.dot}`} />
                    {cat}
                  </button>
                );
              })}
            </div>

            <div className="mb-5">

               <ReactQuill
                 theme="snow"
                 value={content}
                 onChange={setContent}
                 className="bg-white dark:bg-stone-800 rounded-xl text-black dark:text-white"
               />
             
             </div>

            <div className="flex justify-end mt-2 mb-2">
              <p className="text-xs font-mono text-stone-400 dark:text-stone-500">
                 {
                    content
                      .replace(/<[^>]*>/g, "")
                      .replace(/&nbsp;/g, " ")
                      .trim().length
                  } characters
              </p>
            </div>

            <div className="flex justify-end gap-3">

              <button
                onClick={() => setShowModal(false)}
                className="px-5 py-2.5 rounded-xl bg-stone-100 dark:bg-stone-800
                text-stone-800 dark:text-white font-medium hover:bg-stone-200 dark:hover:bg-stone-700 transition"
              >
                Cancel
              </button>

              <button
                onClick={handleCreateNote}
                className="px-5 py-2.5 rounded-xl bg-stone-900 hover:bg-teal-700 dark:bg-teal-600 dark:hover:bg-teal-500 text-white font-medium transition shadow-lg shadow-stone-900/10"
              >
                {editId ? "Update" : "Save"}
              </button>

            </div>

          </motion.div>
        </motion.div>
      )}
      </AnimatePresence>
    </div>
  );
};

export default Dashboard;
